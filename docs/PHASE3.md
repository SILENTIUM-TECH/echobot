# Echo Oblivion — Phase 3 Documentation
## 25 New Advanced Features

**Version:** Phase 3  
**Date:** 2026-07-21  
**Prefix:** `.` (default)

---

## Quick Reference

| Command | Description | Permission |
|---------|-------------|------------|
| `.antiviewonce on\|off` | Intercept & save view-once media | Admin |
| `.timemachine [range]` | AI group history summary | Premium |
| `.memo add\|list\|search\|delete` | Personal encrypted notes | Member |
| `.impersonate @member [topic]` | AI style mimicry | Admin |
| `.autopilot on\|off\|set` | AI group assistant | Admin |
| `.autoreply on\|off\|set` | Away DM auto-reply | Member |
| `.factcheck [claim]` | Fact verification | Member |
| `.rep +\|- @member` | Reputation scoring | Member |
| `.bounty post\|list\|claim\|approve` | Coin bounty board | Member |
| `.breachcheck [email]` | Data breach check | Owner/Premium |
| `.coach start\|log\|status\|stop` | 30-day AI coaching | Member |
| `.antiimpersonate on\|off` | Name fuzzy-match guard | Admin |
| `.price [symbol]` | Crypto/stock prices + alerts | Member |
| `.constitution generate\|adopt` | AI group rules | Admin |
| `.negotiate start\|say\|close` | AI dispute mediation | Admin |
| `.silentmode on\|off\|logs` | Invisible group mode | Owner |
| `.narrate [style]` | Cinematic image narration | Member |
| `.summarize [format]` | Multi-format chat summary | Premium |
| `.predict [scenario]` | AI probability analysis | Member |
| `.broadcast groups\|users\|all` | Mass messaging | Creator |
| `.viral [content]` | Virality score analysis | Member |
| `.dream [description]` | Jungian dream analysis | Member |
| `.sync link\|unlink\|status` | Group message mirroring | Owner |
| `.learn start\|status\|stop` | Daily language lessons | Member |
| `.invispost [caption]` | Post to bot's WA status | Owner |

---

## Detailed Feature Documentation

### 1. Anti-View-Once (`.antiviewonce`)
**Permission:** Admin  
**Description:** Automatically intercepts and saves all view-once images and videos sent in the group. Saved privately to the bot owner's DM.

```
.antiviewonce on     — Enable interception in this group
.antiviewonce off    — Disable interception
.antiviewonce        — Show current status
```

**How it works:** A background listener in BENJAMIN.js detects `viewOnceMessage` and `viewOnceMessageV2` message types. When detected in an enabled group, it downloads the media and forwards it to the bot owner's number.

---

### 2. Time Machine (`.timemachine`)
**Permission:** Premium  
**Description:** Uses AI to generate a summary of the group's chat history over a specified time range.

```
.timemachine today          — Summary of today
.timemachine last 2 hours   — Last 2 hours
.timemachine last 3 days    — Last 3 days
.timemachine yesterday      — Yesterday
```

**Requires:** The bot must have been present in the group to build history.

---

### 3. Memory Palace (`.memo`)
**Permission:** Member  
**Description:** Personal encrypted note storage with AI-powered search.

```
.memo add <title> | <content>   — Add a note
.memo list                       — List all your notes
.memo search <query>             — AI-powered search
.memo delete <number>            — Delete note by number
```

---

### 4. Impersonator (`.impersonate`)
**Permission:** Admin  
**Description:** Uses AI to generate text in a group member's writing style. Entertainment only.

```
.impersonate @member              — Impersonate on random topic
.impersonate @member <topic>      — Impersonate on specific topic
```

**Requires:** At least 3 messages from the target in group history.

---

### 5. Autopilot (`.autopilot`)
**Permission:** Admin  
**Description:** Activates an AI assistant that autonomously responds to questions and mentions in the group.

```
.autopilot on                     — Enable (responds to questions)
.autopilot on <instructions>      — Enable with custom persona
.autopilot off                    — Disable
.autopilot set <instructions>     — Update instructions
.autopilot                        — Show status
```

**Rate limited:** Max 1 AI response per 30 seconds per group.

---

### 6. Smart Auto-Reply (`.autoreply`)
**Permission:** Member  
**Description:** Sets up an AI-powered away message for DMs sent to the bot number.

```
.autoreply on                    — Enable (AI generates reply)
.autoreply on <custom message>   — Enable with fixed message
.autoreply off                   — Disable
.autoreply set <message>         — Update the away message
```

**Rate limited:** One reply per sender per 10 minutes.

---

### 7. Fact Checker (`.factcheck`)
**Permission:** Member  
**Description:** Verifies claims using Google Fact Check API, Wikipedia, and AI analysis.

```
.factcheck <claim>               — Check a claim
.factcheck                       — (reply to a message)
```

**API Key needed:** `GOOGLE_FACT_CHECK_KEY` in `.env` (optional — falls back to AI-only if absent).

---

### 8. Reputation Score (`.rep`)
**Permission:** Member  
**Description:** Community-driven reputation system. Members can give +1 or -1 rep per day per group.

```
.rep + @member       — Give +1 reputation
.rep - @member       — Give -1 reputation
.rep top             — Leaderboard
.rep score [@member] — Check a member's score
```

**Limits:** One rep per day per giver per group.

---

### 9. Bounty System (`.bounty`)
**Permission:** Member  
**Description:** Task marketplace with coin escrow. Post bounties, others claim and complete them.

```
.bounty post <coins> <task>   — Post a bounty (coins escrowed)
.bounty list                   — Show open bounties
.bounty claim <id>             — Claim a bounty
.bounty approve <id>           — Approve claim (creator only)
```

---

### 10. Breach Check (`.breachcheck`)
**Permission:** Owner / Premium  
**Description:** Checks an email or phone against the HaveIBeenPwned database.

```
.breachcheck user@email.com    — Check email for breaches
```

**API Key needed:** `HIBP_API_KEY` in `.env`  
Get key: https://haveibeenpwned.com/API/Key

---

### 11. AI Coach (`.coach`)
**Permission:** Member  
**Description:** 30-day personal goal coaching with daily check-ins delivered via DM.

```
.coach start <goal>          — Start coaching session
.coach log <progress>        — Log daily progress
.coach status                — View progress
.coach stop                  — End session
```

**Automatic:** Daily check-in messages sent via the scheduler.

---

### 12. Anti-Impersonation (`.antiimpersonate`)
**Permission:** Admin  
**Description:** Uses Levenshtein distance algorithm to detect members whose display name is suspiciously similar to admin names.

```
.antiimpersonate on    — Enable protection
.antiimpersonate off   — Disable protection
.antiimpersonate       — Show status
```

**Threshold:** Alerts when similarity ≥75%. Requires `fast-levenshtein` package.

---

### 13. Price Ticker (`.price`)
**Permission:** Member  
**Description:** Real-time crypto and stock prices with price alert notifications.

```
.price bitcoin,ethereum          — Get crypto prices
.price AAPL                      — Get stock price (needs ALPHA_VANTAGE_KEY)
.price alert bitcoin above 70000 — Set a price alert
```

**APIs:** CoinGecko (free, no key), Alpha Vantage for stocks (`ALPHA_VANTAGE_KEY`).

---

### 14. Constitution Builder (`.constitution`)
**Permission:** Admin  
**Description:** AI generates group rules and governance from the group's DNA profile.

```
.constitution generate   — AI-draft rules from group culture
.constitution show       — Show current draft
.constitution adopt      — Post as official group rules
```

---

### 15. Negotiator (`.negotiate`)
**Permission:** Admin  
**Description:** AI-mediated structured dispute resolution between two parties.

```
.negotiate start @p1 @p2 <issue>   — Start session
.negotiate say <statement>          — Party speaks
.negotiate close                    — AI delivers verdict
```

---

### 16. Silent Observer (`.silentmode`)
**Permission:** Owner  
**Description:** Makes the bot completely invisible in the group. All messages are logged to MongoDB but the bot ignores all commands.

```
.silentmode on     — Go silent (log only)
.silentmode off    — Restore normal operation
.silentmode logs   — View captured logs (owner only)
```

---

### 17. Image Narrator (`.narrate`)
**Permission:** Member  
**Description:** AI generates cinematic narration for images in multiple styles.

```
.narrate              — Default cinematic style
.narrate poetic       — Poetic narration
.narrate thriller     — Thriller style
.narrate documentary  — Documentary style
.narrate comedy       — Comedy narration
```

**Best with:** Gemini vision API key (`GEMINI_KEY`).

---

### 18. Quantum Summarizer (`.summarize`)
**Permission:** Premium  
**Description:** Multi-format AI summary of recent group chat history.

```
.summarize bullets     — Bullet-point key topics
.summarize narrative   — Story-like summary
.summarize insights    — Key insights and patterns
.summarize tldr        — One-paragraph summary
```

---

### 19. Echo Predictor (`.predict`)
**Permission:** Member  
**Description:** AI probability analysis for any scenario.

```
.predict Will Arsenal win the Champions League?
.predict Should I invest in crypto right now?
```

⚠️ Entertainment only — not financial or professional advice.

---

### 20. Broadcast System (`.broadcast`)
**Permission:** Creator  
**Description:** Send a mass message to all groups, users, or both. Rate limited to 600ms between sends.

```
.broadcast groups <message>   — Send to all groups
.broadcast users <message>    — Send to recent DM contacts
.broadcast all <message>      — Send to both
```

**Limit:** 50 groups, 30 users max per broadcast.

---

### 21. Viral Predictor (`.viral`)
**Permission:** Member  
**Description:** AI analysis of content's virality potential with improvement suggestions.

```
.viral <content>    — Analyze content
.viral              — (reply to a message)
```

---

### 22. Dream Interpreter (`.dream`)
**Permission:** Member  
**Description:** Jungian psychoanalytic dream interpretation using AI.

```
.dream I was flying over dark water then suddenly fell
```

---

### 23. Multi-Group Sync (`.sync`)
**Permission:** Owner  
**Description:** Mirror messages from one group to another in real-time.

```
.sync link <groupJID@g.us>     — Link target group
.sync unlink [groupJID@g.us]   — Remove link(s)
.sync status                    — Show current links
```

**Note:** Get group JIDs with `.gcid` in the target group.

---

### 24. Language Teacher (`.learn`)
**Permission:** Member  
**Description:** Daily AI language lessons delivered via DM with automatic scheduling.

```
.learn start Spanish              — Start beginner course
.learn start French intermediate  — Start at specific level
.learn status                     — Show progress
.learn stop                       — End course
```

**Levels:** `beginner`, `intermediate`, `advanced`  
**Automatic:** One lesson per day, sent automatically.

---

### 25. Stealth Status Broadcaster (`.invispost`)
**Permission:** Owner  
**Description:** Post text, images, or videos to the bot's WhatsApp status remotely from any chat.

```
.invispost <text>                           — Text status
(reply to image) .invispost [caption]       — Image status
(reply to video) .invispost [caption]       — Video status
```

---

## Required Environment Variables

```env
HIBP_API_KEY=           # Feature 10 — Breach Check
ALPHA_VANTAGE_KEY=      # Feature 13 — Stock prices
GOOGLE_FACT_CHECK_KEY=  # Feature 7  — Fact Checker (optional)
```

---

## Architecture Notes

- All new Mongoose schemas are in `lib/EchoExpansion.js` (Phase 3 section)
- Background listeners are in `lib/EchoExpansionBenjamin.js` (Phase 3 section)  
- All 25 command cases are in `Echo.js` before the Phase 2 expansion block
- `lib/CommandRegistry.js` is updated with all Phase 3 permissions and descriptions
- `package.json` includes `fast-levenshtein` for Feature 12

---

*⚡ OBLIVION — Echo System Phase 3 | By Silentium Techies*
