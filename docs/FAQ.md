# ❓ Frequently Asked Questions

← [Back to README](../README.md) · [Pairing Guide](PAIRING.md) · [Privacy Policy](PRIVACY.md) · [Feature Deep-Dive](FEATURES.md)

---

## Getting started

### Is this safe to use with my real number?

Echo uses WhatsApp's official Linked Devices protocol — the same system behind WhatsApp Web. There is no password handover because none is involved. That said, linking any bot to WhatsApp through methods like this isn't officially supported by WhatsApp, and heavy automated or spam-like behavior on any linked device can get a number flagged regardless of what tool is causing it. Normal usage — chatting, using commands, group moderation — is how the vast majority of users run it without issue. If you're cautious, pairing a secondary number is a reasonable choice.

---

### Will people know I'm using a bot?

Not automatically. Echo appears as a linked device on your account, which only you can see in Settings → Linked Devices. Your contacts see messages from your number as they normally would. If Echo responds in a group, the message comes from you — though the content might give it away.

---

### Does Echo read my messages?

Echo only processes messages that are sent to it — commands in groups where it's active, or DMs directed at it, plus (if you've enabled the AI assistant in a chat) the context it needs to hold a conversation. It does not read your private conversations with other people.

---

### Is the "verified"-looking style on Echo's messages an actual WhatsApp verification?

No — it's Echo's own visual branding: styled cards and consistent formatting. It doesn't change your account's status or grant any official badge.

---

### What happens if my WhatsApp gets restricted?

Heavy automated behavior — mass messaging, spam, bulk actions — can trigger WhatsApp's detection systems regardless of what tool is causing it. Normal command use, group moderation, and AI chat do not typically cause issues. If you're concerned, pair a secondary number rather than your primary one.

---

### How is Echo different from other WhatsApp bots?

Most bots require you to self-host on a VPS, manage dependencies, deal with crashes, and update code yourself. Echo runs on hosted infrastructure — you pair once and it works. Beyond that, the OBLIVION agent system gives it genuine AI context, memory, and autonomous command execution, and the Phase 2 expansion adds a passive intelligence layer, real cryptographic tools, and deep AI analysis — most bots don't have any of that. It's built as a product, not a script.

---

### What is OBLIVION?

OBLIVION is Echo's AI agent core — the intelligence layer that makes Echo feel alive. It maintains per-user memory, speaks your language automatically, executes commands through natural language, schedules actions, and adapts its personality to each person. Activate it with `.oblivion on` in any chat.

---

### Does it work on WhatsApp Business?

Yes. WhatsApp Business accounts support Linked Devices the same way personal accounts do. Pairing works identically — same steps, same code entry. All standard commands function normally.

---

### Can I use it on multiple numbers?

Free accounts support one paired session at a time. Premium users can pair multiple numbers simultaneously, each running as an independent bot instance. Contact [@devaura_echobot](https://t.me/devaura_echobot) to upgrade.

---

### What's the difference between free and premium?

Free gives you core functionality: downloads, view-once recovery, basic AI, and group moderation. Premium unlocks AI image/video generation, unlimited AI requests without cooldowns, OBLIVION voice note replies, custom AI personas, multi-number pairing, and the deeper Phase 2 AI analysis tools (`.pdna`, `.voiceemo`, `.docai`, `.debate`). See the [premium table in the README](../README.md#-premium-access) for the full breakdown.

---

### How do I set the bot language?

Tell OBLIVION which language to use: `.oblivion lang swahili` or `.oblivion lang fr` or `.oblivion lang auto`. In auto mode (the default), it detects your language from each message and responds in it. You can also set a permanent language that sticks across sessions.

---

### Does it work without internet on my phone?

Yes. Echo runs on its own infrastructure — once your number is paired, Echo operates independently of your phone's network connection. You don't even need your phone turned on. Commands are processed server-side.

---

### Can admins use all commands?

Group admins can use all group management commands (kick, mute, antilink, warnings, `.antiphish`, `.resurrect`, `.tripwire`, `.groupdna`, etc.). Owner-level commands (premium management, bot mode, sudo control) are restricted to whoever registered the bot. OBLIVION admin subcommands in groups also require admin status in that group.

---

### How do I report a bug or issue?

Join the Telegram channel at [@silentium_01](https://t.me/silentium_01) or the [community group](https://t.me/silentiumXgroup) and describe what happened — the command used, the expected behavior, and what actually happened. For security-related issues, report privately to [@loner_01verified](https://t.me/loner_01verified) instead. See [SECURITY.md](../SECURITY.md) for the disclosure policy.

---

### Is my session encrypted?

Yes. WhatsApp uses end-to-end encryption for all messages. The Linked Devices protocol maintains this encryption — the session token stored server-side is a cryptographic credential that lets Echo participate in the encrypted session, not a backdoor to your messages.

---

### Can the developer see my chats?

No. Messages are processed in-memory to handle commands and then discarded. The developer (Dev Aura / Benjamin) does not have access to a log of your private conversations. AI memory (if you've activated OBLIVION) is stored per your JID and is deletable by you with `.oblivion forget`. See [PRIVACY.md](PRIVACY.md) for the complete breakdown.

---

### How do I cancel and remove the bot?

On your phone: WhatsApp → Settings → Linked Devices → tap the Echo session → Log Out. That's it — immediate, no approval needed, no data lingers. You can also disconnect from the dashboard at [echowabot.eu.org](https://echowabot.eu.org).

---

### What happens when I run out of AI credits?

Free-tier AI has usage limits per hour. When the limit is reached, Echo responds with a cooldown message and tells you when it resets. Premium removes these limits. The bot's non-AI features (downloads, group management, utilities) are unaffected by AI credit limits.

---

### Can I give the bot a custom name?

Yes — via OBLIVION. `.oblivion name Aura` (or any name you want) tells OBLIVION what you'd like to call it. The name sticks in its memory for your sessions. It doesn't change the bot's WhatsApp display name, but OBLIVION will refer to itself by the name you give it.

---

### What languages does OBLIVION speak?

50+ languages, including major African languages as first-class citizens: Swahili, Yoruba, Igbo, Hausa, Luganda, Zulu, Xhosa, Amharic, Twi, Kinyarwanda, Somali, Shona, Sotho, Ndebele, Tigrinya, Malagasy, and more. For European, Asian, and Middle Eastern languages — French, Arabic, Hindi, Japanese, Spanish, Portuguese, Russian, Mandarin, Korean, and dozens more. In auto mode it detects your language per message.

---

### How do I get premium?

Message [@devaura_echobot](https://t.me/devaura_echobot) on Telegram. You'll receive pricing options and payment instructions. Premium is activated manually by the team and applied to your paired number.

---

## Phase 2 features

### What is `.antiphish` and how does it actually work?

When enabled, Echo intercepts every URL posted in the group before anyone can tap it. It submits the URL simultaneously to Google Safe Browsing and VirusTotal — both free APIs with generous rate limits. If either flags it as phishing, malware, or a deceptive site, Echo deletes the message, warns the sender, and posts an alert card explaining what was blocked and why. The check takes under 2 seconds on average. If neither API key is configured, the command accepts the toggle but skips the live scanning step — it will tell you in the activation message if scanning is unavailable.

---

### What is `.resurrect` and does it work on all message types?

Resurrect hooks into WhatsApp's message-delete event. When enabled in a group, every deletion is caught and the original content is posted back with a `[RECONSTRUCTED]` header. It works on plain text, messages with captions (images, videos, documents), and quoted replies. It does not work on view-once messages that were opened before deletion (those are handled separately by `.rvo`), or on messages deleted before Resurrect was enabled.

---

### Is `.confess` actually anonymous?

Your sender JID (WhatsApp's internal identifier for your number) is put through SHA-256 — a one-way cryptographic hash. The hash is stored alongside each confession only to prevent abuse (one report per confession per hash). Because SHA-256 is one-way, neither the bot operator nor any admin can reverse it to find your number. Your name, number, and profile photo are never posted or logged against the confession content.

---

### How does `.stegohide` work technically?

Your message is first encrypted with AES-256-CBC using the passphrase you supply (key derived via scrypt, random IV). The resulting ciphertext is then encoded bit-by-bit into the least significant bit (LSB) of each pixel's colour channels in the image. Changing a single bit in a channel shifts the colour value by 1 out of 255 — invisible to the human eye, lossless on the data. The modified image is sent back; anyone who receives it and runs `.stegoread` with the correct passphrase gets the original message. Anyone without the passphrase sees a completely normal image.

---

### Does `.tunnel` mean Echo can read my encrypted messages?

No — that's the point of the split-key design. When you initiate a tunnel with someone, Echo generates two separate half-keys: one delivered to you, one delivered to the other person. Neither half alone can decrypt anything. Echo never holds or logs both halves simultaneously. Your messages are encrypted on the sending end with your half and decrypted on the receiving end with theirs; the transit path (including the bot) sees only ciphertext.

---

### What does `.footprint` actually search?

For phone numbers: carrier lookup, country/region, line type (mobile/VoIP/landline), and validity via the Veriphone API. For usernames: cross-reference of publicly indexed social signals. This is all open-source intelligence (OSINT) — the same kind of information you could find manually through public directories. It does not access private WhatsApp data, bypass anyone's privacy settings, or access carrier subscriber records. See [SECURITY.md](../SECURITY.md) for responsible use guidance.

---

### What is `.spy` collecting, and is it legal?

`.spy` monitors a contact's WhatsApp "online" and "last seen" status — information WhatsApp already shows to everyone in your contact list (unless the target has hidden it in their privacy settings). Echo records the timestamps of these transitions and builds an activity report from them. It is not accessing private data, intercepting messages, or bypassing any platform control. Whether monitoring someone's activity without their knowledge is ethical depends on context and local law — use it responsibly.

---

### How does `.ghostread` work?

It does not access any private read-receipt data. Instead, it builds a probabilistic estimate using signals available to any sender: whether read receipts are enabled (blue ticks), the gap between message delivery and the last-seen timestamp, the recipient's typical response latency for similar messages (based on their historical patterns in shared groups), and whether they've been active in other groups since the message was sent. The output is a probability estimate, not a certainty — it's explicitly presented as such.

---

### What is `.groupdna` storing?

Group DNA analyses messages already visible to the bot (because it's a group member) and builds aggregate statistics: word frequency distributions, sentiment scores, hourly activity counts, and interaction pairs. No individual message content is permanently stored — only the derived aggregate data, which is refreshed on each `.groupdna` call. Individual message content used for analysis is processed in memory and not written to the database.

---

### What is `.legacy` and when does it trigger?

You configure a number of inactivity days and a message to deliver. Echo's background scheduler checks your last-active timestamp daily. If you haven't sent any message (command or otherwise) for the configured number of consecutive days, your pre-written message is delivered to the configured recipient. This is useful for important information — passwords, instructions, contacts — that should survive extended periods of unexplained inactivity. You can update or cancel it at any time with `.legacy cancel`.

---

### What is `.trends` showing me?

The trends engine processes message metadata across all groups the bot participates in and surfaces the top-rising keyword clusters over the past 24 hours and 7 days. It identifies phrases gaining velocity (mentioned significantly more today than their 7-day baseline) and surfaces them with a momentum score. It shows the topic and its reach (how many groups it appeared in), not which specific people said it.

---

### What does `.debate` actually do?

Running `.debate <motion>` opens a session in the group. Echo watches subsequent messages, classifies each as a pro or con argument, evaluates argument quality (evidence presence, logical structure, fallacy detection), and maintains running scores. When you run `.debate end`, it delivers a structured verdict: strongest argument for/against, detected fallacies, and its conclusion on which side made the better case — with reasoning. Debate sessions don't time out automatically; they stay open until explicitly closed.

---

### Is `.liedetect` real?

No — and Echo says so explicitly in every response. It performs real linguistic analysis (hedge word frequency, certainty markers, passive voice ratio, statement specificity) and returns a structured breakdown, but it's framed and labelled as entertainment. Language pattern analysis cannot reliably detect deception in text; this feature exists as a fun group tool, not an investigative one.

---

## Coins

### What are coins for?

The coin system is an engagement layer — a way to track activity and reward regular users. Coins accumulate through daily claims (`.coinsdaily`) with streak multipliers for consecutive days. Future uses include group leaderboards and potential unlocks (planned).

---

### What happens if I miss a day on `.coinsdaily`?

Your streak resets to 1 and you receive the base daily amount. Consecutive-day streaks multiply the payout progressively — the longer the streak, the higher the daily yield.

---

## Technical

### Which AI model does Echo use?

Echo uses a cascading fallback chain: Groq (primary — fast inference, free tier), Pollinations (secondary — no API key required, always available), and Google Gemini (tertiary). The chain tries each in order until one responds successfully. The model used for a given response depends on which service is available at that moment; for most users this is invisible.

---

### Does Echo work if I don't have all the API keys configured?

Yes. Every Phase 2 feature that depends on an external API key degrades gracefully: it runs whatever it can without the key and skips or explains the parts it can't. For example, `.antiphish` without `GOOGLE_SAFE_BROWSING_KEY` or `VIRUSTOTAL_KEY` will accept the toggle but won't do live scanning. `.voiceemo` without `ASSEMBLYAI_KEY` uses the fallback AI transcription method. No feature will crash or throw an unhandled error due to a missing key. See [FEATURES.md](FEATURES.md#environment-variables-for-phase-2-features) for the full list of optional keys.

---

### Can I self-host Echo?

The bot is currently a hosted service — you pair your number to an existing running instance. Self-hosting is not part of the standard offering. If you have specific hosting requirements, reach out via the support channel.

---

<p align="center">
  <sub>More questions? <a href="https://t.me/silentium_01">t.me/silentium_01</a> · ⚡ OBLIVION — Echo System Agent</sub>
</p>
