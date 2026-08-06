# 🔒 Security Policy

← [Back to README](README.md)

---

## Supported Versions

| Version | Supported |
|---|---|
| V20\|26 (current) | ✅ Active |
| Previous versions | ❌ No longer maintained |

Echo Oblivion is a hosted service — all users are always on the current version. There is no action required on your part to receive security updates.

---

## Reporting a Vulnerability

If you've found a security issue, please report it privately before disclosing it publicly. This gives us time to fix it before anyone else can exploit it.

**Primary contact:**  
Telegram: [@devaura_echobot](https://t.me/devaura_echobot)  
Subject line / first message: `[SECURITY]` followed by a brief description

**What to include:**
- A description of the vulnerability — what it is and where it exists
- Steps to reproduce it (or a proof of concept if you have one)
- The potential impact — who is affected and how
- Your contact information so we can follow up

We prefer direct Telegram messages for security reports. Do not open a public GitHub issue for a vulnerability — that exposes it to everyone before it's fixed.

If you can't reach the primary contact, [@silentium_01](https://t.me/silentium_01) or the [community group](https://t.me/silentiumXgroup) are fallback channels — flag that it's a security matter and ask for a private follow-up rather than posting details in the open.

---

## Response Commitment

| Stage | Timeline |
|---|---|
| Acknowledgment | Within 48 hours of receiving your report |
| Initial assessment | Within 5 business days |
| Fix deployment | Depends on severity — critical issues are prioritized immediately |
| Disclosure | Coordinated with the reporter after the fix is live |

We will keep you informed at each stage and work with you on the appropriate time to disclose publicly.

---

## What Counts as a Vulnerability

These are things we want to know about:

- **Session hijacking** — any way to access or steal another user's WhatsApp session
- **Authorization bypass** — accessing owner or admin commands without the required permission rank
- **Data exposure** — any way to read another user's stored AI memory, warnings, or session data
- **Remote code execution** — any input that causes unintended code execution on our infrastructure
- **Injection attacks** — command injection, database injection, or similar via bot inputs
- **Privacy violations** — accessing message content or metadata that a user has not consented to share

---

## What We Do NOT Consider Vulnerabilities

These are either intended behavior or known limitations that are out of scope:

- **View-once recovery** — this is a documented feature, not a bypass
- **WhatsApp platform limitations** — issues inherent to WhatsApp's API or policies are outside our control
- **Rate limits being reached** — these are intentional protections, not bugs
- **Bot appearing online when phone is off** — this is the intended behavior of linked devices
- **Group admins being able to kick members** — this is expected admin-level access
- **Social engineering** — tricking a human admin into running a command is not a technical vulnerability in our system
- **Vulnerabilities in third-party services** (Groq, Pollinations, Google TTS, etc.) — report those to the respective services directly

---

## Responsible Use

A few Echo features are powerful enough to deserve a note.

### Core features

- **Profile and account lookup commands** return information that is already publicly visible — they don't bypass privacy settings. Use them accordingly.
- **View-once recovery** circumvents the sender's expectation. Use it on your own messages or with the sender's knowledge — not to secretly archive other people's disappearing content.
- **Group moderation tools** (kick, anti-link, warnings, etc.) are for admins managing communities they're responsible for — not for targeting people outside them.

### Phase 2 features

**`.footprint` — OSINT Scanner**
Footprint uses open-source intelligence: public APIs, public directories, and publicly indexed data. It does not access private records, bypass WhatsApp's privacy settings, or perform any form of unauthorised access. Even so:
- Don't use it to investigate people without their consent in contexts where that would be intrusive or illegal.
- Phone number lookups in many jurisdictions are covered by data protection law — know your local rules.
- OSINT reports are for legitimate research, security verification, and administrative purposes. Using them to harass, stalk, or intimidate someone is abuse.

**`.spy` — Status Monitoring**
Status spy tracks online/offline presence signals that WhatsApp already exposes to your contacts (unless the target has disabled last-seen in their privacy settings). It is not intercepting messages or bypassing any technical control.
- Monitoring a partner, employee, or acquaintance without their knowledge may be a privacy violation or illegal depending on your jurisdiction.
- Use it for your own accounts (confirming your bot is active), or in contexts where monitoring is openly agreed to.

**`.ghostread` — Read Probability**
A probabilistic estimate, not a surveillance tool. It works from signals already visible to you as the sender. Present results as estimates — they are not certainties and should not be used as evidence of anything.

**`.stegohide` / `.stegoread` — Steganography**
Steganography hides information inside images using AES-256 encryption. This is a legitimate privacy and security tool.
- Don't use it to smuggle illegal content inside images.
- Don't use it to hide information in images you send to people who haven't consented to receiving hidden messages — the encryption is real and the hidden content is real.
- The passphrase is the only thing protecting the hidden content. Use a strong one.

**`.tunnel` — Encrypted Tunnel**
Provides genuine cryptographic privacy for communications. The split-key design means even the bot operator cannot read tunnel messages.
- Tunnels are not a substitute for end-to-end encrypted messaging apps for genuinely sensitive communications.
- Don't use tunnels to coordinate illegal activity.

**`.antiphish` — Phishing Scanner**
When enabled, URLs posted in the group are submitted to Google Safe Browsing and VirusTotal for classification. Both services are third-party providers with their own privacy policies. Group admins enabling this feature should be aware that all URLs posted by all members will be submitted for scanning.

**`.debate` — AI Debate Judge**
Debate sessions record message content classified as arguments. Members participating in an active debate should be aware their messages are being analysed and scored. Close the debate session when it's done with `.debate end` to clear the session data.

**`.trends` — Cross-Group Trend Reporter**
The trends engine processes message metadata across all groups Echo participates in. It surfaces aggregate keyword trends — not who said them. Group admins should be aware that message metadata from their group contributes to the bot-wide trend aggregation.

**`.brandintel` — Brand Intelligence**
Brand intelligence reports are based on publicly available signals and third-party data sources. Do not present them as primary research or use them as a sole basis for significant business decisions. The reports are analytical summaries, not verified intelligence.

**`.liedetect` — Lie Detector**
This feature is explicitly entertainment. Linguistic pattern analysis cannot reliably detect deception in text. Do not use `.liedetect` output as evidence in disputes, disciplinary actions, or any consequential decision-making.

---

## Hall of Fame

*Recognition for responsible disclosures will be listed here.*

| Researcher | Issue | Date |
|---|---|---|
| *(None yet — be the first)* | — | — |

---

<p align="center">
  <sub>⚡ OBLIVION — Echo System Agent · <a href="https://echowabot.eu.org">echowabot.eu.org</a></sub>
</p>
