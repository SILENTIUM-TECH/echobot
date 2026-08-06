# 🔐 Privacy Policy

← [Back to README](../README.md)

*Last updated: July 2026*

---

This is written to be read, not to be survived. No legal jargon. Here is exactly what Echo Oblivion does with your data, what it doesn't do, and what you can control.

---

## What we process

### Session credentials

When you pair your number, WhatsApp generates a session credential — a cryptographic key that lets Echo participate in your linked-device session. This credential is stored on our servers so Echo can stay connected without your phone. It is never transmitted to third parties and is deleted when you unpair.

This is identical in nature to the credential WhatsApp stores when you use WhatsApp Web.

### Message content — for command execution

When you send Echo a command (`.tiktok`, `.kick`, `.weather`, etc.), it reads the message content to execute your request. That's the entire lifecycle of that message — received, processed, response sent. We don't log your commands to a searchable database or build profiles from command usage.

### AI conversation history — OBLIVION only

If you activate OBLIVION (`.oblivion on`), it stores a rolling conversation history — your last 50 exchanges — so it can respond with context instead of treating every message like it's the first. This is stored per your WhatsApp JID (your number's unique identifier).

Older exchanges are periodically summarized (the summary replaces the raw history) so the data footprint doesn't grow indefinitely.

This data is yours. See [Your rights](#your-rights) below.

### Group moderation records

If your group uses the warning system (`.warn @user`), warning counts are stored per member per group so admins can track strikes. This data lives within the group context and is not shared outside it.

### Basic operational metrics

Aggregate data — how many commands ran in a period, error rates, uptime — is used to keep the service running and catch problems. This is not tied to individual message content.

### Phase 2 data — coins, group intelligence, and time-based messages

A few newer features store their own small, narrowly-scoped records:

| Data | Why |
|---|---|
| **Coin balances and streak data** | Required for the coins economy to function across sessions. Stored per-user JID, no personal name attached. |
| **Group aggregate statistics** (for `.groupdna`, `.temp`, `.trends`) | Word frequency counts, sentiment scores, activity timestamps — derived aggregate data, not raw message content. Individual messages are processed in memory only and not written to the database. |
| **Confession hashes** (one per confession, for abuse prevention) | A SHA-256 hash of the sender's JID — mathematically irreversible; used only to rate-limit reporting. Your identity cannot be recovered from it. |
| **Status spy records** (only while `.spy` is actively running on a contact) | Online/offline transition timestamps for the monitored contact. Only visible to the user who activated it. Deleted when `.spy stop` is called. |
| **Time capsule and legacy messages** | Stored until the delivery date or trigger condition is met, then deleted immediately after delivery. |
| **Debate session records** | Active until `.debate end` is called — includes message content classified as pro/con arguments. Deleted after the verdict is delivered. |

See [Phase 2 feature data handling in detail](#phase-2-feature-data-handling-in-detail) below for exactly how the more sensitive ones (steganography, tunnels, OSINT) work.

---

## What we never do

- **Sell your data.** There are no advertisers, no data brokers, no third-party analytics.
- **Read your private conversations.** Echo receives messages directed at it. It does not monitor your chats with other people.
- **Share group moderation data.** Warning records and mod logs stay within that group — they're not shared across groups or exposed to anyone outside the group's admins.
- **Store media you didn't request we process.** Downloaded files are processed in-memory and delivered to you. We don't maintain a cache of content you've downloaded.
- **Use your data to train AI models.** Your conversations with OBLIVION are not used as training data for any model.
- **Retain time-capsule or legacy message content after delivery.**
- **Store passphrase or key material from steganography or tunnel operations.** These exist only in-memory for the duration of the operation.
- **Log the identity of confession senders in any recoverable form.**

---

## Phase 2 feature data handling in detail

### `.confess` — Anonymous Confession
When you run `.confess <message>`, your WhatsApp JID is hashed with SHA-256. The hash — not your number or name — is stored alongside the confession ID for abuse-rate-limiting purposes only. SHA-256 is a one-way function: no algorithm exists to reverse it to your number without exhaustive brute-force search against every possible number, which is computationally impractical. The confession text and the hash are stored in separate fields with no name, profile photo, or display name ever attached.

### `.stegohide` / `.stegoread` — Steganography
The passphrase you supply is used locally (in-process) to derive an encryption key via scrypt and encrypt your message with AES-256-CBC. The key is never stored anywhere. The only output is the modified image, which is sent back to you. Echo does not retain the hidden message, the passphrase, or the encryption key after the image is returned.

### `.tunnel` — Encrypted Tunnel
Split-key design: Echo generates two independent half-keys, delivers one to each party, and immediately discards both from memory. No key material is written to the database. The bot transmits only ciphertext; it cannot reconstruct the plaintext without holding both halves simultaneously, which it never does.

### `.spy` — Status Monitoring
`.spy` records online/offline transitions from WhatsApp's presence API — the same signals visible to anyone in the contact's WhatsApp contacts list (unless the contact has hidden their last-seen in privacy settings). No message content is accessed. The activity log is private to the user who activated it. Running `.spy stop @user` purges the log from the database.

### `.footprint` — OSINT Scan
Footprint queries publicly accessible APIs (Veriphone for phone validation, public signal indexing for usernames). No private WhatsApp data is accessed. Results are based entirely on information already publicly available through the services queried. Scan results are not stored — they are generated on-demand and delivered once.

### `.ghostread` — Read Probability
This feature accesses no private data. It works entirely from signals already visible to the sender (delivery ticks, last-seen timestamps, public activity in shared groups). No data is written to the database for this feature.

### `.antiphish` — Phishing Scanner
URLs are submitted to Google Safe Browsing and VirusTotal for classification. These third-party services have their own privacy policies. URLs are submitted as-is for scanning; no sender identity is included in the API request. If you have concerns about submitting group URLs to external services, the feature can be disabled with `.antiphish off`.

### `.docai` — Document Intelligence
Documents (PDFs) are processed in-memory: text is extracted, sent to the AI inference API, and the response is returned. The raw document content is not stored in the database. The AI provider (Groq/Gemini) processes the text under their own terms of service.

### `.voiceemo` — Voice Emotion
Audio is submitted to AssemblyAI (if configured) for transcription, then the transcript is sent to the AI pipeline for emotion analysis. The raw audio is not stored by Echo. AssemblyAI's own privacy policy governs their handling of the audio during transcription.

---

## Commands that look up public information

A handful of commands (`.footprint`, `.ghostban`, `.spy`, `.reverseimg`) return or use information that is **already publicly visible** on the platform or service being checked — the same thing you'd see by visiting that profile or using that platform's own tools. They don't bypass anyone's privacy settings. See [SECURITY.md](../SECURITY.md) for guidance on using these responsibly.

---

## AI memory — OBLIVION

| What | Detail |
|---|---|
| Stored | Last 50 exchanges per user, plus a periodic summary |
| Scope | Per-user, per-session — isolated to your JID |
| Accessible to | Only accessible via commands sent from your own number |
| Deletable | Yes — instantly, completely |

To delete your OBLIVION memory: `.oblivion forget`  
To delete group memory: `.oblivion forget group` (admin only)  
To view what's stored: `.oblivion memory`

---

## Data retention

| Data type | Retained until |
|---|---|
| Session credentials | You unpair — deleted immediately on disconnect |
| AI conversation memory | You run `.oblivion forget` — deleted immediately |
| Group warning records | Group is disbanded or admin clears them |
| Operational logs | 30 days maximum, then auto-purged |
| Status spy records | Until `.spy stop @user` is run — deleted immediately |
| Time capsule / legacy messages | Until delivered — deleted immediately after |
| Debate session records | Until `.debate end` is run — deleted after the verdict |
| Confession hashes | Retained for abuse-rate-limiting; never linked to an identity |
| Steganography / tunnel key material | Never stored — exists only in-memory for the duration of the operation |

We do not keep data "just in case." If you unpair, your session is gone.

---

## Your rights

You can act on all of these yourself, right now, without contacting anyone:

| Action | How |
|---|---|
| Delete your AI memory | `.oblivion forget` |
| View your stored AI memory | `.oblivion memory` |
| Remove your session entirely | WhatsApp → Settings → Linked Devices → Log Out |
| Delete group moderation records | `.oblivion forget group` (admin) or contact us |
| See what OBLIVION knows about you | `.oblivion whoami` |
| Stop status spy and delete its log | `.spy stop @user` |
| Disable phishing scanning in a group | `.antiphish off` |
| Cancel a digital legacy trigger | `.legacy cancel` |
| Turn off the AI assistant in a chat | `.oblivion off` (or `.chatbot off`) |
| Leave a group | Nothing follows you out — group-scoped data stays with the group |

---

## Contact for privacy issues

If you have a question or concern that the commands above can't address:

**Telegram:** [@loner_01verified](https://t.me/loner_01verified)  
**Channel:** [@silentium_01](https://t.me/silentium_01)  
**Community group:** [t.me/silentiumXgroup](https://t.me/silentiumXgroup)

We'll respond within 48 hours.

---

<p align="center">
  <sub>⚡ OBLIVION — Echo System Agent · <a href="https://echobot.eu.org">echobot.eu.org</a></sub>
</p>
