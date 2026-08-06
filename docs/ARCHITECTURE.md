# 🏗️ Echo Oblivion — System Architecture

← [Back to README](../README.md)

This document describes how Echo Oblivion is designed — what the layers are, how they talk to each other, and why the system works the way it does. No source code is shared here; this is a public architectural reference.

---

## System Overview

```
╔══════════════════════════════════════════════════════════════╗
║                    ECHO OBLIVION SYSTEM                      ║
╠══════════════╦═══════════════════════════╦════════════════════╣
║  WhatsApp    ║      OBLIVION Agent       ║   Web Dashboard    ║
║  Interface   ║                           ║   + REST API       ║
║              ║  ┌─────────────────────┐  ║                    ║
║  Baileys     ║  │  Context Builder    │  ║  Pair · Manage     ║
║  (WebSocket) ║  │  System Prompt Gen  │  ║  Sessions · Stats  ║
║              ║  │  AI Router          │  ║  Push Notifs       ║
║  Multi-device║  │  Intent Engine      │  ║                    ║
║  session via ║  │  TTS Engine         │  ║  Socket.IO         ║
║  Noise proto ║  │  Scheduler          │  ║  (real-time)       ║
║              ║  └─────────────────────┘  ║                    ║
╠══════════════╩═══════════════════════════╩════════════════════╣
║               391 Commands · 3 Phases                         ║
║   Download · AI · Moderation · OSINT · Crypto · Analysis      ║
╠══════════════════════════════════════════════════════════════╣
║                        Data Layer                             ║
║   MongoDB Atlas — sessions · memory · groups · schedules      ║
║   In-memory LRU cache — message dedup · rate limits           ║
║   File system — media temp · session credentials · logs       ║
╠══════════════════════════════════════════════════════════════╣
║                       AI Providers                            ║
║  Pollinations.ai → Groq Llama-3.3-70B → Gemini 2.5 Flash     ║
║  → OpenRouter (final fallback)                                ║
╠══════════════════════════════════════════════════════════════╣
║                    External Services                          ║
║  Telegram Bot API · SMTP (email) · Veriphone · HaveIBeenPwned ║
║  Alpha Vantage · Google Fact Check · Google TTS · FFMPEG      ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Layer Breakdown

### 1. WhatsApp Interface Layer

Echo connects to WhatsApp using [Baileys](https://github.com/WhiskeySockets/Baileys) — the multi-device framework. Baileys implements WhatsApp's WebSocket protocol, including:

- **Noise protocol handshake** — the cryptographic session establishment (requires the `whatsapp-rust-bridge` native module from v1.1.9+)
- **Signal protocol** — end-to-end encryption for message delivery and receipt
- **Multi-device session** — your phone does not need to be on; the session lives on the server

The bot presents itself to WhatsApp as a linked device on your account — identical in kind to WhatsApp Web or the WhatsApp desktop app. This is not a modified or unofficial WhatsApp client; it uses the same protocol as official first-party linked devices.

**Pairing** creates a session credential (a cryptographic key pair) that authenticates subsequent connections. This credential is stored in the `Echo_sessions/session_[number]/` directory and also reflected in MongoDB.

---

### 2. OBLIVION Agent Layer

OBLIVION is the intelligence layer that processes every inbound message before it reaches the command dispatcher. It runs as a pre-processing stage:

```
Inbound message
      │
      ▼
  ┌─────────────────────────────────────┐
  │  1. Build context                   │
  │     - User rank (JID lookup)        │
  │     - Group metadata                │
  │     - Conversation history          │
  │     - Active persona                │
  │     - Current schedules             │
  │     - Group sentiment state         │
  └──────────────────┬──────────────────┘
                     │
      ▼
  ┌─────────────────────────────────────┐
  │  2. Intent resolution               │
  │     - Is this a direct command?     │
  │       → Pass to Command Dispatcher  │
  │     - Is this natural language?     │
  │       → NL pattern match first      │
  │       → AI call if no match         │
  │     - Is it a reply? A mention?     │
  └──────────────────┬──────────────────┘
                     │
      ▼
  ┌─────────────────────────────────────┐
  │  3. AI call (if needed)             │
  │     - Pollinations.ai (primary)     │
  │     - Groq → Gemini → OpenRouter    │
  │     - Parse JSON intents from reply │
  └──────────────────┬──────────────────┘
                     │
      ▼
  ┌─────────────────────────────────────┐
  │  4. Execute intent / send reply     │
  │     - Text reply                    │
  │     - Voice note (TTS)              │
  │     - Command dispatch              │
  │     - Schedule creation             │
  └─────────────────────────────────────┘
```

---

### 3. Command Dispatcher

391 commands organized into a registry. Each command entry declares:

- **Permission level** — which rank can use it
- **NL aliases** — natural-language phrases that OBLIVION maps to this command
- **Description** — shown in `.menu` and `.help`
- **Handler** — the function in `Echo.js` that runs it

The registry is scanned once at startup and cached in memory. Commands are never dynamically loaded at runtime.

---

### 4. Data Layer

#### MongoDB

Primary persistent store. Collections:

| Collection | Purpose |
|---|---|
| `users` | Web dashboard accounts (hashed passwords, JWT, linked WhatsApp number) |
| `oblivion_user_memory` | Per-user AI memory (rolling 50 exchanges + summary) |
| `oblivion_group_memory` | Per-group AI context (culture, sentiment, history) |
| `oblivion_scheduled` | Pending scheduled actions |
| `spy_records` | Active status-spy monitoring sessions |
| `coin_balances` | User coin economy balances |
| `group_configs` | Per-group feature toggles and settings |
| `warnings` | Member warning strike records |
| `memos` | Encrypted personal notes |
| `bot_modes` | Per-chat OBLIVION mode (PUBLIC/PRIVATE/OFF) |

#### In-Memory Cache

NodeCache LRU cache for:

- Message deduplication (prevents double-processing)
- Rate limiting (per-user, per-command)
- Pairing grace windows (active pairing sessions)
- Media rate limits

#### File System

- `Echo_sessions/session_[number]/` — Baileys session credentials (multi-file auth state)
- `temp/` — transient media files (downloaded, processed, then deleted)
- `logs/` — rotating application logs

---

### 5. Web Dashboard & API

The Express.js backend serves:

- **HTML dashboard** — browser-based pairing, session management, group controls, stats
- **REST API** — `/api/pair`, `/api/bot-status`, `/api/me`, `/api/send-message`, `/api/stats`, etc.
- **Socket.IO** — real-time bot status updates pushed to the dashboard
- **Push notifications** — Web Push for mobile dashboard alerts

Authentication uses JWT tokens (7-day expiry). The dashboard account is separate from the WhatsApp session — you can have an account without a paired number and pair later.

---

### 6. Telegram Management Panel

A parallel management interface for:

- `/pair [number]` — trigger pairing from Telegram
- `/status` — check connection status of all active sessions
- `/broadcast [message]` — send a message across all paired sessions
- `/delpair [number]` — unpair a session
- `/listpair` — list all active sessions

Used mainly by the operator for system-level management. Users can also use it for self-service pairing.

---

## Connection Flow — Pairing

```
User sends /pair +256757582170
         │
         ▼
Telegram bot receives command
         │
         ▼
EchoStart(256757582170) called
         │
         ▼
Baileys creates WebSocket to WhatsApp
Noise protocol handshake (rust bridge)
         │
         ▼
pairingGrace set (grace window starts)
         │
   1.5s stabilisation delay
         │
         ▼
Echo.requestPairingCode('256757582170', 'BENJAMIN')
         │
         ▼
8-character code returned
Code printed to logs
Code sent to Telegram chat
         │
         ▼
User enters code in WhatsApp
WhatsApp → Settings → Linked Devices → Link with phone number
         │
         ▼
WhatsApp confirms link
connection.update 'open' fires
Session saved to disk + MongoDB
Bot is live
```

---

## AI Provider Selection Logic

```
Message requires AI response
         │
         ▼
Is Groq in cooldown (rate-limited)?
  Yes → skip to Gemini
  No  → try Pollinations.ai
         │
   Success → reply with result
   Fail    │
         ▼
       Try Groq (llama-3.3-70b-versatile)
         │
   Success → reply
   Fail    │
         ▼
       Try Gemini (gemini-2.5-flash)
         │
   Success → reply
   Fail    │
         ▼
       Try OpenRouter
         │
   Success → reply
   Fail    │
         ▼
"All AI providers exhausted — check API keys"
(logged at error level, user told service is temporarily unavailable)
```

---

## Reconnect Logic

Echo uses exponential backoff for reconnection, with permanent-failure detection:

```
Connection closes
         │
         ▼
Reason = logged out (401) or banned (403)?
  Yes → wipe session, notify user, stop
  No  │
         ▼
Was session unregistered (mid-pairing)?
  Within grace window?
    Yes → reconnect after 2s (normal WA handshake behavior)
    No  → wipe session, notify user, stop
  Registered │
         ▼
attempts < maxReconnectAttempts?
  Yes → reconnect after min(2^attempts * 1000ms, 60000ms)
  No  → give up, notify user
```

---

## Security Boundaries

| Surface | Protection |
|---|---|
| Dashboard login | bcrypt password hashing, JWT auth, rate-limited login |
| Pairing endpoint | Requires valid JWT, rate-limited (pairLimiter middleware) |
| Session credentials | Stored on disk in session directory, never sent to client |
| AI memory | Scoped per JID — users cannot read each other's memory |
| Command execution | Every command rank-checked before execution, no bypass path |
| Media downloads | Temp files deleted after sending |
| MongoDB | TLS connection, credentials in environment variables only |

---

<p align="center">
  <sub>⚡ OBLIVION — Echo System Agent · <a href="https://echowabot.eu.org">echowabot.eu.org</a></sub>
</p>
