# ⚡ Echo Oblivion — Phase 2 Feature Reference

← [Back to README](../README.md) · [Command Reference](COMMANDS.md) · [FAQ](FAQ.md)

This document covers the 27 features added in the Echo Oblivion Phase 2 expansion. Each entry is written for two audiences: **users** who want to know what a feature does and how to use it, and **technical readers** who want to understand how it works under the hood.

For the full command list including the original (pre-Phase 2) feature set, see **[COMMANDS.md](COMMANDS.md)**. For what each feature stores and for how long, see **[PRIVACY.md](PRIVACY.md)**. For responsible-use guidance on the more sensitive features (OSINT, status monitoring, cryptography), see **[SECURITY.md](../SECURITY.md)**.

---

## Intelligence & OSINT

### 1. `.footprint` — OSINT Scanner

**What it does**
Produces a structured open-source intelligence report on a phone number or username. For phone numbers: carrier identification, country/region, line type (mobile, VoIP, landline), number validity, and ported-number signals via the Veriphone API. For usernames: cross-reference of publicly indexed social signals.

**Usage**
```
.footprint +256757123456
.footprint @username
```

**How it works technically**
Phone numbers are submitted to the Veriphone REST API which validates against carrier databases and returns structured JSON (carrier name, country, region, line type, validity, format variants). Username lookups cross-reference public signals. Results are assembled into a structured card and delivered once — not stored. Requires `VERIPHONE_KEY` in environment; without it the command explains what's unavailable and runs what it can.

**Permission level:** Member

---

### 2. `.spy` / `.spy stop` / `.spy report` — Status Spy

**What it does**
Passively monitors a contact's WhatsApp presence: every online/offline transition is silently recorded. On demand, delivers a full activity report: session count, total online time, average session duration, peak active hours, and last-seen timestamp.

**Usage**
```
.spy @contact          — begin monitoring
.spy stop @contact     — stop monitoring and keep log
.spy report @contact   — deliver the activity report
```

**How it works technically**
Hooks into the Baileys `presence.update` event stream, which WhatsApp sends for contacts in your contact list. Each event carries a JID, a status (`available`/`unavailable`/`composing`), and a timestamp. These are written to a `SpyRecord` MongoDB document keyed by `[watcher JID, target JID]`. The report aggregates sessions (consecutive `available` → `unavailable` pairs), computes durations, and builds a histogram of active hours. Data is purged on `.spy stop`.

**Permission level:** Member (monitoring your own contacts)

---

### 3. `.ghostread` — Ghost-Read Probability Estimator

**What it does**
Estimates the probability that the recipient of a message has read it but not replied — the "left on read" signal, quantified.

**Usage**
```
.ghostread          — reply to the message you want to analyse
```

**How it works technically**
Uses a weighted scoring model across four observable signals: (1) whether delivery ticks have advanced to blue (read receipts enabled), (2) the delta between delivery timestamp and the target's last-seen update in any shared group, (3) the target's historical response latency for messages of similar length and type, (4) their activity in other shared groups since the message was delivered. Weights are: read receipt status (35%), last-seen delta (30%), historical latency deviation (25%), shared-group activity (10%). Output is a probability score with a plain-English interpretation.

**Permission level:** Member

---

### 4. `.reverseimg` — Reverse Image Search

**What it does**
Identifies the source, similar images, or original context of any photo.

**Usage**
```
.reverseimg          — reply to any image
```

**How it works technically**
The image is uploaded to catbox.moe (ephemeral public CDN) to obtain a public URL. That URL is submitted to SauceNAO (specialised for anime, artwork, illustrations, and stock photography) which returns ranked matches with similarity percentages and source links. If SauceNAO confidence is below threshold (< 60%) or no matches are found, a Google Lens fallback is attempted via a public endpoint. Results are formatted into a ranked card with similarity scores, source site names, and direct links. Requires `SAUCENAO_KEY` for the primary source; the Lens fallback requires no key.

**Permission level:** Member

---

### 5. `.ghostban` — Ghost-Ban Indicator

**What it does**
Checks whether your number shows signs of a WhatsApp shadow restriction — where your messages are technically delivered but hidden from non-contacts in groups or your visibility in search is suppressed.

**Usage**
```
.ghostban
```

**How it works technically**
Runs a series of behavioural probes: checks whether group messages from your number are appearing in the message list for other members (a known ghost-ban indicator), tests mention (@) tag visibility, and checks profile discoverability signals. Returns a score across these axes with a plain-language verdict (Clean / Soft Restriction / Likely Ghost-Banned) and recommended remediation steps if flagged.

**Permission level:** Member

---

### 6. `.brandintel` — Brand Intelligence Report

**What it does**
Generates a structured competitive intelligence brief on any brand, product, or public entity: public sentiment summary, technology stack signals, competitive positioning indicators, social footprint, and a SWOT-style output.

**Usage**
```
.brandintel Nike
.brandintel "Notion vs Obsidian"
```

**How it works technically**
Uses the AI pipeline (Groq → Pollinations → Gemini) with a structured system prompt that instructs the model to produce a SWOT analysis, sentiment summary, tech stack signals (based on public job postings, open-source repos, and known integrations), competitive landscape positioning, and social presence summary. The AI is explicitly prompted to cite uncertainty and distinguish analysis from verified fact. Output is formatted as a structured card with labelled sections.

**Permission level:** Member

---

## Group Intelligence

### 7. `.groupmap` — Social Network Map

**What it does**
Produces a social interaction map of the group — who engages with whom most, conversation clusters, and peripheral vs. core members.

**Usage**
```
.groupmap
```

**How it works technically**
Processes the group's message history (reply-to relationships and @mention pairs from the recent window). Builds a weighted interaction graph where edge weight = reply count + mention count between any two members. Identifies clusters (densely connected sub-groups), bridge nodes (members who connect otherwise separate clusters), and peripheral nodes (low interaction count). Output is a text-format adjacency summary sorted by interaction weight, with top pairs highlighted.

**Permission level:** Admin

---

### 8. `.groupdna` — Group Culture Profile

**What it does**
A comprehensive snapshot of the group's communication culture: dominant topics, overall sentiment trend, peak activity hours, top contributors, and communication style classification.

**Usage**
```
.groupdna
```

**How it works technically**
Processes the last 7 days of message metadata in-memory. Runs TF-IDF weighted word frequency analysis to identify dominant topics (stopwords removed, phrases preserved). Sentiment is scored per-message using the Oblivion Sentiment module (lexicon + pattern matching) and averaged for a group-level score. Activity is binned by hour into a 24-slot histogram. Communication style is classified (Formal / Casual / Chaotic) based on average message length, punctuation rate, emoji density, and caps ratio. No raw message content is written to the database.

**Permission level:** Admin

---

### 9. `.temp` — Sentiment Temperature

**What it does**
A single-number group mood score, updated in real time. ❄️ Cold (tense, low energy, declining engagement) → 🌡️ Neutral → 🔥 Hot (high engagement, positive tone, active conversation).

**Usage**
```
.temp
```

**How it works technically**
Scores the last 50 messages across three axes: sentiment (positive/negative lexicon ratio), interaction rate (messages per hour vs. 7-day baseline), and emoji density (high emoji = higher temperature). The three scores are weighted (sentiment 50%, rate 30%, emoji 20%) and mapped to a 0–100 scale, then rendered as a temperature reading with an interpretation.

**Permission level:** Admin

---

### 10. `.confess` — Anonymous Confession Box

**What it does**
Posts a message to the group anonymously. Your identity cannot be recovered from what is stored.

**Usage**
```
.confess I've been the one deleting the meeting notes
```

**How it works technically**
Your sender JID is hashed with SHA-256 (using Node's native `crypto.createHash('sha256')`). The hash is stored in a `Confession` MongoDB document alongside the confession text and a timestamp. Only the hash, text, and timestamp are written — no name, number, or profile photo. The confession is posted to the group as an anonymous card. The hash is used only to enforce a rate limit (one active confession per unique hash to prevent spam). SHA-256 is a one-way function; reversal requires exhaustive search across all possible JID values, which is computationally impractical.

**Permission level:** Member (must be enabled by admin first: `.confess enable`)

---

### 11. `.trends` — Cross-Group Keyword Trend Reporter

**What it does**
Surfaces the top rising keywords and phrases across all groups Echo is active in. Shows what's spreading across the bot's group network before it reaches your group.

**Usage**
```
.trends              — top rising topics right now
.trends 7d           — 7-day trend view
```

**How it works technically**
The background scheduler (node-cron, runs hourly) processes message metadata across all active groups and writes keyword frequency counts to the `GroupTrend` collection. The trend score for a keyword at time T is: `(count_in_last_24h - avg_daily_count_over_7d) / avg_daily_count_over_7d`. Keywords with momentum score > 0.5 (50% above their baseline) are flagged as rising. Results are ranked by momentum score and delivered with group reach (how many distinct groups it appeared in).

**Permission level:** Admin (group report) / Owner (network-wide report)

---

### 12. `.horoscope` — Group-Calibrated Horoscope

**What it does**
A horoscope that ignores the stars and reads the group instead. Generated from the group's actual activity patterns, sentiment data, and behavioural history.

**Usage**
```
.horoscope
```

**How it works technically**
Feeds the group's current sentiment score, dominant topics, activity trend (rising/falling), and top-contributor dynamics into the AI pipeline with a system prompt that maps these real signals to a horoscope-format output. The result looks like a horoscope but its "predictions" are actually extrapolations of real group data dressed in thematic language. Clearly labelled as entertainment.

**Permission level:** Member

---

### 13. `.tripwire` — AI-Parsed Behavioural Rules

**What it does**
Define group rules in plain English. Echo's AI parses your intent and enforces it in real time without you writing any regex or logic.

**Usage**
```
.tripwire add Warn anyone who mentions prices without being an admin
.tripwire add Delete any message that contains external links and the sender has been in the group less than 7 days
.tripwire list
.tripwire clear
```

**How it works technically**
Each rule is stored as natural language text in a `GroupTripwire` document. When a message arrives, active tripwires for that group are loaded and evaluated: each rule's text and the incoming message are sent to the AI pipeline, which returns a binary `triggered: true/false` decision plus the action to take (warn/delete/kick). Evaluation uses a lightweight AI call with a structured system prompt; results are cached per-rule-text to avoid re-evaluating identical message patterns. Up to 10 active tripwires per group. Actions are attributed to `[TRIPWIRE]` in the moderation log.

**Permission level:** Admin

---

## Cryptography & Privacy

### 14. `.stegohide` / `.stegoread` — Image Steganography

**What it does**
Hide an AES-256 encrypted message inside any image. The image is visually indistinguishable from the original. Only someone with the passphrase can extract the message.

**Usage**
```
.stegohide mypassphrase My secret message goes here
(reply to any image)

.stegoread mypassphrase
(reply to the steganographic image)
```

**How it works technically**
1. **Key derivation:** The passphrase is run through `crypto.scryptSync(passphrase, salt, 32)` to produce a 256-bit key. The salt is randomly generated per operation.
2. **Encryption:** The message is encrypted with AES-256-CBC (`crypto.createCipheriv('aes-256-cbc', key, iv)`). A random 16-byte IV is generated per operation.
3. **Encoding:** The ciphertext bytes (including salt and IV as a header) are converted to a bit string. Each bit is written into the least significant bit of a pixel colour channel (R, G, or B) in the image buffer, sequentially. Changing one LSB shifts a colour value by ±1 out of 255 — below the threshold of human perception and most image comparison algorithms.
4. **Output:** The modified image buffer is encoded back and sent. The original message is not stored.

For extraction, the process reverses: read LSBs from pixel channels, reconstruct the ciphertext, decrypt with the provided passphrase.

**Permission level:** Member

---

### 15. `.tunnel` — Split-Key Encrypted Tunnel

**What it does**
Creates a cryptographically private communication channel between two users. The bot holds no complete key and cannot read the channel.

**Usage**
```
.tunnel @otheruser     — initiate the tunnel (you both receive your half-keys)
```

**How it works technically**
1. Echo generates a 512-bit random key and splits it at the midpoint: bytes 0–31 go to the initiator, bytes 32–63 go to the target.
2. Both halves are delivered privately and immediately purged from memory — not written to the database.
3. Messages tagged for the tunnel are encrypted by the sender using their half-key and can only be fully decrypted when both halves are combined at the recipient's end.
4. Because Echo never holds both halves simultaneously, it cannot reconstruct the full key and cannot decrypt tunnel messages.

The tunnel record in the database stores only the JIDs of the two parties and a session ID — no key material.

**Permission level:** Member

---

### 16. `.capsule` — Time Capsule Message

**What it does**
Schedule a message to be delivered at a future date and time. Accepts natural language dates.

**Usage**
```
.capsule next Friday at noon Remember to review the contract
.capsule in 3 months This is your 90-day check-in message
.capsule 2027-01-01 09:00 Happy New Year
```

**How it works technically**
The date/time string is parsed using a natural language date library (chrono-node if available, falling back to a built-in pattern matcher for common formats). The parsed timestamp, recipient JID, and message content are stored in a `TimeCapsule` MongoDB document. The background scheduler (node-cron, runs every 5 minutes) queries for capsules where `deliverAt <= now` and sends them, then marks the document as delivered. Delivery happens even if the user is currently offline — the message arrives when they next open WhatsApp.

**Permission level:** Member

---

### 17. `.legacy` — Digital Legacy Trigger

**What it does**
If you go silent for a configured number of consecutive days, Echo automatically delivers a pre-written message to a designated recipient.

**Usage**
```
.legacy 30 @recipient If you're reading this, I've been unreachable for 30 days. [your message]
.legacy cancel         — disable the trigger
.legacy status         — check current configuration
```

**How it works technically**
Stores the inactivity threshold (days), recipient JID, and message content in a `DigitalLegacy` MongoDB document keyed to your JID. Every command you send to Echo (any command, not just `.legacy`) updates your `lastActiveAt` timestamp. The background scheduler (node-cron, runs daily at 02:00) checks all active legacy documents, computes `now - lastActiveAt` in days, and triggers delivery for any where the threshold is exceeded. The document is marked as triggered after delivery and won't fire again.

**Permission level:** Owner (for configuring), any user can set their own

---

## AI Analysis

### 18. `.pdna` — Personality DNA Analysis

**What it does**
Analyses a user's message history to produce a structured personality profile: MBTI tendencies, dominant communication style, emotional baseline, topic affinities, and influence score within the group.

**Usage**
```
.pdna @user
.pdna                  — reply to any of their messages
```

**How it works technically**
Collects the target user's recent messages from shared group history (up to the configured analysis window). The message corpus is sent to the AI pipeline with a structured analysis prompt requesting: extraversion/introversion indicators (message initiation vs. response ratio), thinking/feeling indicators (logical vs. emotional language), topic clusters (TF-IDF on their specific messages), emotional baseline (average sentiment across messages), and group influence score (reply-to rate from others). Output is a structured card. Requires sufficient message history (minimum 20 messages) to be meaningful — Echo will tell you if the sample is too small.

**Permission level:** Premium

---

### 19. `.voiceemo` — Voice Emotion Detector

**What it does**
Transcribes a voice note and analyses the speaker's emotional state: dominant emotion, confidence score, secondary emotions, speech rate, and tone descriptors.

**Usage**
```
.voiceemo              — reply to any voice note
```

**How it works technically**
The audio is submitted to AssemblyAI (if `ASSEMBLYAI_KEY` is configured) for transcription with speaker diarisation and sentiment metadata. The raw transcript plus AssemblyAI's sentiment segments are then sent to the AI pipeline for emotion classification (beyond AssemblyAI's basic positive/negative/neutral into the full emotion taxonomy: joy, sadness, anger, fear, surprise, disgust, contempt, neutral). If AssemblyAI is not available, Echo uses its internal audio→text pipeline and runs emotion classification on the transcript alone. Output includes the transcript, dominant emotion, secondary emotions, confidence score, and tone descriptors.

**Permission level:** Premium

---

### 20. `.docai` — Document Intelligence

**What it does**
Extracts and analyses any PDF or document: summary, key points, section breakdown, actionable takeaways, and follow-up Q&A.

**Usage**
```
.docai                          — reply to a PDF
.docai summarise in 3 points    — specific instruction
```

**How it works technically**
PDF text is extracted using `pdf-parse` (full text with page boundaries preserved). The extracted text is truncated to fit the AI context window if necessary (prioritising first and last sections for very long documents). The text plus any specific instruction is sent to the AI pipeline with a structured analysis prompt. For follow-up Q&A: subsequent messages in the same thread within a 5-minute window are treated as questions against the same document context (held in-memory, not persisted).

**Permission level:** Premium

---

### 21. `.readimg` — Image Vision AI

**What it does**
Full AI vision analysis of any image: plain-language description, OCR text extraction, object and scene identification, dominant colours, and contextual interpretation.

**Usage**
```
.readimg               — reply to any image
.readimg what does the sign say?   — specific question
```

**How it works technically**
The image is sent to the Gemini Vision API (primary) which supports native image input and returns structured analysis. If Gemini is unavailable, the image is submitted to a Pollinations vision endpoint as a fallback. The response is parsed for description, detected text (OCR), identified objects/people/scenes, and colour information, then formatted into a structured reply card. Specific questions are appended to the vision prompt as a user query, allowing directed analysis (e.g. "read the text on the whiteboard").

**Permission level:** Member

---

### 22. `.debate` — AI Debate Judge

**What it does**
Opens a structured debate session in a group. Echo monitors arguments, scores them, flags logical fallacies, and delivers a structured verdict.

**Usage**
```
.debate Should remote work be the default for all office jobs?
— (group members reply with arguments)
.debate end            — close the session and get the verdict
```

**How it works technically**
Creates a `DebateSession` MongoDB document with the motion and start timestamp. All subsequent group messages are evaluated against active debate sessions: each message is classified as a pro argument, con argument, or irrelevant (off-topic/reaction). Argument quality is scored (0–10) based on: evidence presence (cited data, examples), logical structure (premise → reasoning → conclusion), specificity (concrete vs. vague), and fallacy detection (ad hominem, strawman, false dichotomy, appeal to authority identified by the AI). Running scores are maintained per-side. On `.debate end`, Echo delivers a verdict card: winning side, score differential, strongest argument for each side, fallacies detected, and its own reasoned conclusion.

**Permission level:** Premium (open a debate) / Member (participate)

---

### 23. `.song` — AI Songwriter

**What it does**
Generates a complete song with full structure: verse 1, chorus, verse 2, bridge, and outro — written to your specified genre, theme, and mood.

**Usage**
```
.song afrobeats love late at night
.song drill street resilience dark
.song pop heartbreak hopeful
```

**How it works technically**
The genre, theme, and optional mood are sent to the AI pipeline with a structured songwriting system prompt that enforces: a consistent rhyme scheme per section, genre-appropriate vocabulary and imagery, tonal consistency across the mood parameter, and the full five-section structure. The system prompt includes genre-specific guidance (e.g. afrobeats: polyrhythmic phrasing, Yoruba/Swahili word drops, dancehall cadence references; drill: internal rhyme density, minimalist syllable packing; pop: hook-first construction, diatonic melodic language). Output is formatted with section headers and line breaks.

**Permission level:** Member

---

### 24. `.liedetect` — Satirical AI Lie Detector

**What it does**
Analyses linguistic patterns in a message and produces a breakdown of deception indicators — explicitly framed as entertainment, not forensic analysis.

**Usage**
```
.liedetect             — reply to any message
```

**How it works technically**
Runs a linguistic feature extraction pass on the target message: hedge word frequency (maybe, possibly, I think, it's possible that…), certainty marker presence (definitely, absolutely, 100%), passive voice ratio (distance-creating construction), statement specificity score (concrete details vs. vague generalisations), unusual qualification patterns, and narrative consistency. Scores across these axes are combined into a "deception likelihood" percentage. Every response includes a prominent disclaimer: *This is a linguistic analysis tool for entertainment only. It cannot reliably detect deception.*

**Permission level:** Member

---

### 25. `.resurrect` — Deleted Message Reconstructor

**What it does**
When enabled, catches messages as they are deleted and reconstructs them in the group — posting the original content with a header identifying it as a reconstructed message.

**Usage**
```
.resurrect on          — enable for this group
.resurrect off         — disable
```

**How it works technically**
Hooks into the Baileys `messages.update` event. When a message update arrives with a `messageStubType` indicating deletion (`MESSAGE_DELETED` or protocol-level revocation), Echo retrieves the original message from its in-memory message cache (maintained by the Baileys store). If found, it posts the original content to the group with a `🔁 [RECONSTRUCTED]` prefix, the original sender's name, and the original timestamp. Works for: plain text, image/video/audio captions, quoted replies. Does not work for messages deleted before the feature was enabled (not in cache) or view-once messages.

**Permission level:** Admin (enable/disable) / automatic for group members once enabled

---

### 26. `.coins` / `.coinsdaily` — Virtual Coin Economy

**What it does**
An engagement system. Coins accumulate through daily claims with streak multipliers for consecutive days.

**Usage**
```
.coins                 — check your balance and lifetime stats
.coinsdaily            — claim your daily reward
```

**How it works technically**
Each user has a `CoinWallet` MongoDB document storing: balance, lifetime earned, last claim timestamp, and current streak count. `.coinsdaily` checks `lastClaimedAt` against midnight of the current day. If not claimed today: streak increments if `lastClaimedAt` was yesterday, resets to 1 if more than one day has passed. Payout formula: `BASE_AMOUNT * Math.min(streak, MAX_STREAK_MULTIPLIER)` where BASE_AMOUNT = 50 and MAX_STREAK_MULTIPLIER = 7 (i.e. maximum 350 coins/day at a 7-day streak). The node-cron scheduler resets unclaimed streaks nightly.

**Permission level:** Member

---

### 27. `.trends` *(cross-referenced above in Group Intelligence)*

See [Group Intelligence → `.trends`](#11-trends--cross-group-keyword-trend-reporter) for the full technical breakdown.

---

## Environment variables for Phase 2 features

| Variable | Feature | Required? | Where to get it |
|---|---|---|---|
| `GROQ_API_KEY` | All AI features (primary) | Strongly recommended | [console.groq.com](https://console.groq.com/keys) |
| `GEMINI_KEY` | AI fallback + `.readimg` vision | Recommended | [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| `GOOGLE_SAFE_BROWSING_KEY` | `.antiphish` — primary URL scanner | Optional | [Google Cloud Console](https://console.cloud.google.com/apis/library/safebrowsing.googleapis.com) |
| `VIRUSTOTAL_KEY` | `.antiphish` — secondary URL scanner | Optional | [virustotal.com](https://www.virustotal.com/gui/my-apikey) |
| `SAUCENAO_KEY` | `.reverseimg` — anime/art/photo matching | Optional | [saucenao.com](https://saucenao.com/user.php?page=search-api) |
| `ASSEMBLYAI_KEY` | `.voiceemo` — voice transcription | Optional | [assemblyai.com](https://www.assemblyai.com/app/account) |
| `VERIPHONE_KEY` | `.footprint` — phone number intelligence | Optional | [veriphone.io](https://veriphone.io) |

All keys are optional — every feature degrades gracefully when a key is missing. If both `GROQ_API_KEY` and `GEMINI_KEY` are absent, the AI pipeline falls back to Pollinations (free, no key required).

---

<p align="center">
  <sub>Phase 2 — Echo Oblivion · Built by <strong>Silentium Techies™</strong></sub><br>
  <sub>⚡ OBLIVION — Echo System Agent · V20|26 · <a href="https://echobot.eu.org">echobot.eu.org</a></sub>
</p>
