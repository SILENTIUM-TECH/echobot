# Echo Oblivion — Changelog

← [Back to README](README.md)

All notable changes to Echo Oblivion are documented here.

---

## V20|26 — Current Release

**Released:** August 2026  
**Phase:** 3 (full)  
**Commands:** 391

### Fixed

- **OBLIVION `reply_after` drop** — When the AI agent returned both a main reply and a follow-up confirmation message, the confirmation was silently discarded. Both now always deliver sequentially.
- **Owner/Sudo/PrimeLord flags missing from `.oblivion` case** — The internal flags object in the OBLIVION command dispatcher was missing three of the six rank flags. Owners could not access `.oblivion logs`, `.oblivion broadcast`, or other owner-gated operations. All six flags now correctly resolved.
- **Pairing session wipe on early socket close** — The session grace window was being set *after* the pairing code request delay, not before. If WhatsApp closed the socket during that window (normal during handshake), the grace check found nothing and wiped the session. Grace is now set before the delay — early disconnects reconnect cleanly instead of aborting.
- **Pairing code request delay** — Reduced from 5 000 ms to 1 500 ms. Gives the socket time to stabilize while requesting the code fast enough to beat WhatsApp's early-close window.
- **`gcinfo` command double-registered** — The command was registered once at Admin permission and immediately overwritten to Creator permission in the same registry pass. Group admins could not use "tell me about this group" via natural language. Duplicate entry removed; Admin permission retained.
- **NL→command pattern `find (.+)` matched `.play`** — A broad regular expression in the natural-language dispatch map was routing "find X" messages to the YouTube download command. Free-text chat like "find the bug in my code" triggered a media search instead of going to the AI. Pattern removed; `.play` continues to match `play (.+)` and `listen to (.+)`.
- **Telegram 409 Conflict log spam** — When another bot instance (e.g. a VPS) holds the Telegram polling token, the error previously logged every polling cycle (several times per second). Now logged once, then suppressed for 5 minutes.
- **`whatsapp-rust-bridge` native module** — Baileys 1.1.9 requires this native module for the Noise protocol handshake and Signal session encryption. It was missing from the environment, causing all connection attempts to fail immediately after the socket opened. Module added to dependencies; connection is now stable.

### Improved

- OBLIVION AI fallback chain hardened: Pollinations.ai (primary, zero-key) → Groq `llama-3.3-70b-versatile` → Gemini 2.5 Flash → OpenRouter. Each provider's failure mode is logged distinctly (rate-limit, 401, 400, network) to make debugging straightforward.
- Gemini model pinned to `gemini-2.5-flash` — `gemini-2.5-flash-lite` was silently 404-ing, exhausting the fallback chain with no response. Fixed to a stable, live model name.
- Groq model pinned to `llama-3.3-70b-versatile` — was using an OpenAI model ID that Groq doesn't recognise, causing silent 404 on every Groq call.
- Session corruption handler now wipes and retries cleanly rather than crashing the startup loop.
- Reconnect backoff capped at 60 seconds with exponential growth — prevents flood reconnects on persistent network issues.
- Keepalive ping added (every 30 s on open WebSocket) — prevents idle disconnects on restrictive hosting environments.

---

## Phase 3 — July 2026

**25 new features** built on the Phase 2 foundation.

### Added

- `.antiviewonce` — intercept and privately save all view-once media in a group
- `.timemachine` — AI-generated chat history summary for any time range (Premium)
- `.memo add|list|search|delete` — personal encrypted notes with AI-powered search
- `.impersonate @member [topic]` — AI writes in a member's style, for entertainment
- `.autopilot on|off|set` — autonomous AI group assistant that handles questions and mentions
- `.autoreply on|off|set` — away-mode DM auto-reply with customizable message
- `.factcheck [claim]` — AI fact verification with source confidence scoring
- `.rep +|- @member` — community reputation scoring system
- `.bounty post|list|claim|approve` — coin-based bounty board for groups
- `.breachcheck [email]` — HaveIBeenPwned data breach check (Owner/Premium)
- `.coach start|log|status|stop` — 30-day AI coaching program, daily lessons via DM
- `.antiimpersonate on|off` — fuzzy-name guard that flags lookalike display names
- `.price [symbol]` — real-time crypto and stock prices with alert subscription
- `.constitution generate|adopt` — AI-generated group rules document
- `.negotiate start|say|close` — AI-mediated dispute resolution with structured verdict
- `.silentmode on|off|logs` — invisible group monitoring mode
- `.narrate [style]` — cinematic AI narration of images (reply to any photo)
- `.summarize [format]` — multi-format chat summaries (bullet / paragraph / timeline)
- `.predict [scenario]` — AI probability analysis for described scenarios
- `.broadcast groups|users|all` — mass messaging system (Creator rank)
- `.viral [content]` — AI virality score and reach prediction
- `.dream [description]` — Jungian symbolic dream analysis
- `.sync link|unlink|status` — real-time message mirroring between groups
- `.learn start|status|stop` — structured daily AI language lessons
- `.invispost [caption]` — post content to the bot's WhatsApp status remotely

---

## Phase 2 — July 2026

**27 new features** across four new layers.

### Intelligence & OSINT

- `.footprint` — OSINT scanner (phone number: carrier, region, line type; username: public signal crossref)
- `.spy / .spy stop / .spy report` — passive WhatsApp presence monitoring with full activity report
- `.ghostread` — probabilistic "left on read" estimator with weighted signal scoring
- `.reverseimg` — reverse image search for source, similar images, and context
- `.brandiq [brand]` — brand intelligence report (sentiment, taglines, public associations)
- `.pdna [target]` — psychological personality analysis from writing samples
- `.trends` — live trend detection from group message patterns

### Cryptography

- `.steg hide|reveal` — steganographic message embedding in images
- `.tunnel @user` — split-key encrypted DM tunnel between two users
- `.capsule [date]` — time-delayed message delivery (exact date/time)
- `.selfdestruct [seconds]` — self-destructing note that deletes after read + timer

### AI Analysis

- `.readimg` — full vision analysis (description, OCR, object identification, color palette)
- `.docai` — PDF/document intelligence (summary, key points, Q&A, language detection)
- `.voiceemo` — voice emotion analysis from audio messages
- `.debate [topic]` — structured AI debate with argument classification and verdict
- `.groupdna` — deep group culture profile (tone, topics, members, sentiment arc)
- `.temp` — group temperature / real-time sentiment score
- `.judge` — AI impartial judge for arguments presented as text

### Expansion

- `.song [genre] [theme] [mood]` — full AI song generation (verse, chorus, bridge, outro)
- `.horoscope` — group-calibrated horoscope from activity and sentiment data
- `.gpt4o / .gemini / .venice / .chatgpt` — direct model-specific AI endpoints
- `.flux / .sora / .nano / .magicstudio / .deepimg` — AI image generation (Premium)
- `.luma / .genvid` — AI video generation (Premium)
- `.shazam` — song identification from audio/video clips
- `.xdl` — Twitter/X video downloader
- `.tgstickers` — full Telegram sticker pack downloader
- `.nano` — Nano AI model image generation

---

## Phase 1 — Original Release (2026)

**Foundation.** The original command set that started everything.

### Core Features

- Multi-device WhatsApp session via Baileys — phone-independent, 24/7
- OBLIVION AI agent — natural language execution, per-user memory, multi-language, voice notes
- Full download suite: TikTok, Instagram, Facebook, YouTube, Spotify, SoundCloud, Pinterest, Mediafire, Google Drive, APK
- Sticker creation (image, video, GIF → animated), sticker pack builder
- Group moderation: anti-link, anti-bot, anti-badword, warning system, bulk kick, auto-welcome
- View-once recovery
- Basic AI chat (Pollinations.ai primary)
- Pairing: Telegram bot, web dashboard, QR code, direct WhatsApp DM
- Telegram management panel (/pair, /status, /broadcast)
- Web dashboard (echowabot.eu.org) — sessions, group controls, premium management

---

<p align="center">
  <sub>⚡ OBLIVION — Echo System Agent · <a href="https://echowabot.eu.org">echowabot.eu.org</a></sub>
</p>
