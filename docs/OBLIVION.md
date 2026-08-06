# 🧠 OBLIVION — Echo System Agent

← [Back to README](../README.md) · [Features](FEATURES.md) · [Commands](COMMANDS.md)

---

> *"I am OBLIVION. The intelligence that has always lived inside Echo.*
> *You were using me before you even knew my name."*

OBLIVION is not a chatbot layer bolted onto a command bot. It is the AI core of Echo Oblivion — an autonomous agent that sits above every command the system can run, maintains memory across sessions, speaks any language, and executes actions through natural conversation.

---

## What OBLIVION Is

Most WhatsApp bots work like a lookup table: you type a command, the bot runs a function, you get a result. OBLIVION inverts this. You speak naturally. OBLIVION understands what you want, decides how to get it, and acts — pulling from 391 available commands, your personal memory, group context, live data sources, and a multi-provider AI chain.

The result is a bot that genuinely adapts to you over time, rather than a bot you have to learn.

---

## Core Capabilities

### 🧠 Autonomous Command Execution

You never need to know a command name. OBLIVION reads your intent, identifies the correct command, verifies your permission rank, and executes — all in a single message cycle.

```
You: "make this into a sticker"
OBLIVION: [runs .sticker on your quoted image]

You: "what's the weather in Kampala?"
OBLIVION: [runs .weather Kampala, replies with live data]

You: "close the group at midnight"
OBLIVION: [schedules .close for 00:00 in your timezone]
```

If a command requires a rank you don't hold, OBLIVION tells you why — it never silently fails.

### 🌍 Automatic Multi-Language

OBLIVION detects the language of each incoming message and replies in it — without being told. If you write in Swahili, it replies in Swahili. If you switch mid-conversation to French, it switches with you.

You can also lock a language permanently:

```
.oblivion lang swahili     — lock to Swahili
.oblivion lang fr          — lock to French
.oblivion lang auto        — return to auto-detect (default)
```

Supported across all major languages. Voice note replies also match the detected language.

### 💾 Per-User Memory

OBLIVION maintains a rolling 50-exchange memory per user. It knows:

- Your name and how you prefer to be addressed
- Your language and timezone
- Preferences you've mentioned ("I prefer short answers", "always use bullet points")
- Your permission rank in each group
- Context from your last conversation

Memory is stored per WhatsApp JID (your number's identifier). When the 50-exchange window fills, older exchanges are summarized and the summary is retained — so OBLIVION's memory doesn't fade, it compresses.

You control it:

```
.oblivion memory           — see what OBLIVION remembers about you
.oblivion forget           — clear your memory (starts fresh)
.oblivion note [text]      — explicitly tell OBLIVION something to remember
```

### 🗣️ Voice Note Replies

OBLIVION can speak. Instead of a text reply, it generates a WhatsApp voice note in your language using neural TTS.

```
.oblivion voice on         — enable voice note replies in this chat
.oblivion voice off        — return to text
```

Premium feature. The voice matches your detected language.

### ⏰ Scheduled Actions

Give OBLIVION a time-based instruction and it executes it — without reminders, without you being present.

```
"open the group at 8am"
"remind everyone about the meeting in 2 hours"
"mute @member for 1 hour"
"send .menu to this group every day at 9am"
```

Schedules persist across restarts. You can manage them:

```
.oblivion schedule list    — see all active schedules
.oblivion schedule cancel  — cancel a specific schedule
```

### 🎭 Custom Persona

Tell OBLIVION who to be, and it stays that way until you change it:

```
.oblivion persona You are Aura, a sharp and witty assistant who speaks in short punchy sentences and never uses emoji.
```

The persona applies to all your interactions from that point forward. Reset with:

```
.oblivion persona reset
```

Premium feature.

---

## AI Provider Chain

OBLIVION uses a multi-provider fallback chain. Every message tries the next provider only if the previous one fails.

| Priority | Provider | Model | Notes |
|---|---|---|---|
| 1 | Pollinations.ai | Mistral | Zero-key, unlimited, always available |
| 2 | Groq | Llama 3.3 70B | Fast inference; rate-limited on free tier |
| 3 | Gemini | 2.5 Flash | Google's frontier model |
| 4 | OpenRouter | (varies) | Broad model access, final fallback |

If all four providers fail, OBLIVION says so explicitly — it never silently returns nothing.

---

## Permission Integration

Every command OBLIVION can execute is rank-gated. The rank system:

| Rank | Symbol | Access |
|---|---|---|
| Creator | 🔴 | All commands, system operations |
| PrimeLord | 🟠 | Near-total access |
| Sudo | 🟡 | Most admin functions across groups |
| Owner | 🟢 | Session control, group ownership commands |
| Admin | 🔵 | Group moderation, admin-level commands |
| Member | ⚪ | Downloads, AI, personal tools |

OBLIVION resolves your rank from the current group context and your WhatsApp JID before executing anything. You can ask it what you have access to:

```
.oblivion whoami           — your rank, permissions, and memory summary
```

---

## OBLIVION Sub-Commands

Full `.oblivion` command reference:

| Sub-command | Description | Rank |
|---|---|---|
| `.oblivion on` | Activate OBLIVION in this chat | Member |
| `.oblivion off` | Deactivate in this chat | Member |
| `.oblivion lang [language]` | Set or auto-detect language | Member |
| `.oblivion voice on\|off` | Toggle voice note replies | Premium |
| `.oblivion persona [text]` | Set custom persona | Premium |
| `.oblivion persona reset` | Reset to default | Premium |
| `.oblivion memory` | View your stored memory | Member |
| `.oblivion forget` | Clear your memory | Member |
| `.oblivion note [text]` | Add a note to your memory | Member |
| `.oblivion whoami` | Your rank + memory summary | Member |
| `.oblivion schedule list` | See scheduled actions | Member |
| `.oblivion schedule cancel` | Cancel a schedule | Member |
| `.oblivion stats` | OBLIVION global stats | Member |
| `.oblivion logs` | Recent agent activity log | Owner |
| `.oblivion broadcast [msg]` | Send message to all users | Owner |
| `.oblivion mode [public\|private]` | Set group mode | Admin |

---

## What OBLIVION Does Not Do

OBLIVION is explicitly **not**:

- **A replacement for commands.** Direct commands (`.tiktok`, `.kick`, `.sticker`) still work exactly as documented. OBLIVION is an execution layer above them, not a replacement for them.
- **A sycophant.** It does not agree with everything. It can disagree, push back, and say "I can't do that."
- **Ungated.** It enforces permissions. Telling OBLIVION to kick someone when you're not an admin does nothing — it tells you why.
- **Persistent without consent.** Memory only runs when OBLIVION is activated. If it's off, nothing is recorded.

---

## Activating OBLIVION

In any DM or group chat:

```
.oblivion on
```

From that point: just talk. OBLIVION reads every message in that chat, decides if action is needed, and acts or responds. If a message isn't directed at the bot, it stays quiet.

In groups, it responds to:
- Direct mentions: `@echo …`
- Messages starting with a question word
- Command-intent phrases it can parse
- Replies to its own messages

In DMs: responds to everything.

---

## Technical Notes (Public-Facing)

- OBLIVION builds a rich context object per message: user rank, group metadata, conversation history, group sentiment, recent command usage, active schedules, and persona — all before making a single AI call.
- The system prompt sent to the AI is assembled from this context, not hardcoded. Different users in different groups get meaningfully different prompts.
- Voice note generation uses language-matched neural TTS. The audio is encoded to OGG/Opus before sending (WhatsApp's native voice note format).
- Scheduled actions survive restarts — they are persisted to MongoDB and re-queued on startup.
- All AI calls are logged with provider, latency, and failure reason at the `warn` level — enough to diagnose outages without logging message content.

---

<p align="center">
  <sub>⚡ OBLIVION — Echo System Agent · <a href="https://echowabot.eu.org">echowabot.eu.org</a></sub>
</p>
