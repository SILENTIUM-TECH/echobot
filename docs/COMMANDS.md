# ⚡ Echo Oblivion — Command Reference

All commands use the bot prefix (default **`.`** — customizable per session). Replace `[text]` with your own input; `@user` means tag or reply to someone. Commands marked 💎 require Premium. Commands marked 👑 require Owner/Sudo access. Commands marked 🆕 are part of the Phase 2 expansion — see **[FEATURES.md](FEATURES.md)** for full technical detail on each.

> Send `.menu` in WhatsApp at any time to browse all commands live with sub-menus.

← [Back to README](../README.md)

---

## 📥 Downloads & Media

### Audio / Video

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.tiktok` | `.tiktok [url]` | Download TikTok video without watermark | All |
| `.tiktokmp3` / `.ttmp3` | `.tiktokmp3 [url]` | Download TikTok audio only | All |
| `.ig` / `.instagram` | `.ig [url]` | Download Instagram reel, post, or story | All |
| `.fb` / `.facebook` | `.fb [url]` | Download Facebook video | All |
| `.twitter` / `.xdl` 🆕 | `.xdl [url]` | Download a Twitter/X video or clip | All |
| `.play` / `.song` | `.play [song name or url]` | Download audio by song name with cover art and ID3 tags | All |
| `.video` | `.video [song name or url]` | Download YouTube video | All |
| `.spotify` / `.spdl` | `.spotify [url]` | Download Spotify track | All |
| `.shazam` 🆕 | Reply to audio/video clip | Identify a song from a short clip | All |
| `.gdrive` | `.gdrive [url]` | Download public Google Drive file | All |
| `.mediafire` | `.mediafire [url]` | Download Mediafire file | All |
| `.apk` / `.app` | `.apk [app name]` | Download Android APK from APKPure | All |
| `.drive` | `.drive [url]` | Alternative Google Drive downloader | All |

### Images & Stickers

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.pinterest` | `.pinterest [query]` | Search and download Pinterest images | All |
| `.pinterest2` | `.pinterest2 [query]` | Alternative Pinterest image search | All |
| `.tgstickers` 🆕 | `.tgstickers [link]` | Download an entire Telegram sticker pack | All |
| `.sticker` / `.s` | Reply to image/video | Convert image or video clip to WhatsApp sticker | All |
| `.toimg` / `.toimage` | Reply to sticker | Convert sticker back to image | All |
| `.emojimix` | `.emojimix 😀+😎` | Blend two emoji into a unique sticker | All |
| `.ssweb` | `.ssweb [url]` | Screenshot a website as sticker | All |

---

## 🤖 AI Chat & Generation

### AI Chat

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.gpt4o` | `.gpt4o [question]` | Ask GPT-4o — the most capable model | All |
| `.gemini` | `.gemini [question]` | Ask Gemini 2.5 Flash | All |
| `.venice` | `.venice [question]` | Uncensored AI chat via Venice AI | All |
| `.chatgpt` | `.chatgpt [question]` | Alternative GPT endpoint | All |
| *(no command)* | Just message it normally | Echo chats naturally, remembers context, and can pull in live weather/news/price/date info when relevant | All |

### Image Generation 💎

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.flux` | `.flux [prompt]` | Generate image with Flux — photorealistic | 💎 Premium |
| `.sora` | `.sora [prompt]` | Generate image with Sora model | 💎 Premium |
| `.nano` 🆕 | `.nano [prompt]` | Generate image with the Nano model | 💎 Premium |
| `.magicstudio` | `.magicstudio [prompt]` | Generate image with MagicStudio AI | 💎 Premium |
| `.deepimg` | `.deepimg [prompt]` | Generate image with DeepImage | 💎 Premium |
| `.boost` / `.freeboost` | `.boost [prompt]` | Quick AI image — free tier | All |

### Video Generation 💎

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.luma` | `.luma [prompt]` | Generate short AI video with Luma | 💎 Premium |
| `.genvid` | `.genvid [prompt]` | Generate AI video — alternative model | 💎 Premium |

### Image Enhancement

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.remini` | Reply to image | AI photo enhancement — Remini | All |
| `.tohd` | Reply to image | Upscale image to HD quality | All |
| `.faceswap` | Reply to image (with 2nd image quoted) | Face swap between two photos | All |
| `.removebg` / `.delbg` | Reply to image | Remove image background — transparent PNG | All |
| `.reconstruct` | Reply to image | AI image reconstruction/repair | All |

### AI Creative 🆕

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.song` | `.song [genre] [theme] [mood]` | AI songwriter — generates a complete song: verse 1, chorus, verse 2, bridge, outro | All |
| `.horoscope` | `.horoscope` | Group-calibrated horoscope based on the group's own activity and sentiment data — entertainment | All |

---

## 🧠 AI Analysis 🆕

Send anything — a photo, PDF, voice note, or message — for Echo to analyse in depth. Full technical breakdown of each in **[FEATURES.md](FEATURES.md)**.

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.readimg` | Reply to image | Full AI vision analysis — description, OCR text extraction, object/scene identification, colour palette | All |
| `.reverseimg` | Reply to image | Reverse image search (SauceNAO, with Google Lens fallback) — returns source links and similarity scores | All |
| `.voiceemo` | Reply to voice note | Transcribes the voice note and detects the speaker's emotional state, confidence score, and tone | 💎 Premium |
| `.docai` | Reply to PDF/document | Extracts and summarises the document — key points, section breakdown, actionable takeaways, follow-up Q&A | 💎 Premium |
| `.pdna` | `.pdna @user` or reply to their messages | Personality DNA — structured profile from message history: communication style, emotional baseline, topic affinities, influence score | 💎 Premium |
| `.debate` | `.debate [motion]` ... `.debate end` | Opens a structured debate; Echo tracks arguments, scores them, flags fallacies, delivers a verdict | 💎 Premium to open / All to participate |
| `.liedetect` | Reply to a message | Satirical linguistic "lie detector" — explicitly labelled as entertainment, not forensic analysis | All |

---

## 👥 Group Control

### Member Management

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.add` | `.add [number]` | Add a member to the group | Admin |
| `.kick` | Reply to or `.kick @user` | Remove a member from the group | Admin |
| `.promote` | Reply to or `.promote @user` | Make a member an admin | Admin |
| `.demote` | Reply to or `.demote @user` | Remove admin status from a member | Admin |
| `.tagall` | `.tagall [message]` | Mention all group members | Admin |
| `.hidetag` | `.hidetag [message]` | Mention all members invisibly | Admin |

### Group Settings

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.mute` | `.mute` | Restrict messaging to admins only | Admin |
| `.unmute` | `.unmute` | Open the group for all members | Admin |
| `.gcname` | `.gcname [new name]` | Change the group name | Admin |
| `.gcdesc` | `.gcdesc [description]` | Update the group description | Admin |
| `.setppgc` | Reply to image | Set the group profile picture | Admin |
| `.delppgc` | `.delppgc` | Remove the group profile picture | Admin |
| `.gclink` / `.getlink` | `.gclink` | Get the group invite link | Admin |
| `.gcinfo` | `.gcinfo` | Show full group information | All |
| `.gcid` | `.gcid` | Show the group JID | All |
| `.poll` | `.poll [question] \| opt1 \| opt2` | Create a native WhatsApp poll | Admin |
| `.slowmode` | `.slowmode [seconds]` | Rate-limit how often members can message | Admin |

### Welcome & Goodbye

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.welcome` | `.welcome on/off` | Toggle welcome messages for new members | Admin |
| `.goodbye` | `.goodbye on/off` | Toggle goodbye messages when members leave | Admin |
| `.setwelcome` | `.setwelcome [text]` | Set a custom welcome message | Admin |
| `.setgoodbye` | `.setgoodbye [text]` | Set a custom goodbye message | Admin |
| `.gcwelcome` | `.gcwelcome` | View current welcome/goodbye settings | Admin |

### Warning System

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.warn` | Reply to or `.warn @user [reason]` | Issue a warning strike (auto-kick at 3) | Admin |
| `.warnings` | `.warnings @user` | Check a member's warning count | Admin |
| `.resetwarns` | `.resetwarns @user` | Clear a member's warning strikes | Admin |
| `.warnlist` | `.warnlist` | List all warned members in the group | Admin |

---

## 🛡️ Protection Systems

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.antilink` | `.antilink set [warn\|kick\|delete]` | Action when someone posts a link | Admin |
| `.antilink` | `.antilink off` | Disable antilink protection | Admin |
| `.antiphish` 🆕 | `.antiphish on\|off` | Scans every posted URL against Google Safe Browsing and VirusTotal in real time; deletes and warns on a match. Degrades gracefully if no API key is configured | Admin |
| `.resurrect` 🆕 | `.resurrect on\|off` | Catches deleted messages (text, captions, quoted replies) and reposts them with a `[RECONSTRUCTED]` header | Admin |
| `.antidelete` | `.antidelete on/off` | Re-send deleted messages before they disappear | Admin |
| `.antigcmention` / `.antimassmention` | `.antigcmention on/off` | Block mass @mention status farming | Admin |
| `.antidemote` | `.antidemote on/off` | Block unauthorized demote actions | Admin |
| `.antipromote` | `.antipromote on/off` | Block unauthorized promote actions | Admin |
| `.antikick` | `.antikick on/off` | Block unauthorized member kicks | Admin |
| `.antibot` | `.antibot on/off` | Block other bots from the group | Admin |
| `.antistatus` | `.antistatus on/off` | Block status mentions in the group | Admin |
| `.autoread` | `.autoread on/off` | Auto-read all incoming messages | Owner |
| `.autotyping` | `.autotyping on/off` | Show typing indicator when processing | Owner |

---

## 🧬 Group Intelligence 🆕

Passive analytics and AI-enforced moderation for the group as a whole. Full mechanics in **[FEATURES.md](FEATURES.md)**.

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.groupmap` | `.groupmap` | Social interaction map — who replies to whom most, conversation clusters, core vs. peripheral members | Admin |
| `.groupdna` | `.groupdna` | Profiles the group's culture: dominant topics, sentiment trend, peak hours, top contributors, communication style | Admin |
| `.temp` | `.temp` | Group sentiment temperature — a single ❄️ Cold → 🔥 Hot score | Admin |
| `.tripwire add` | `.tripwire add [rule in plain English]` | Define a behavioural rule in natural language; Echo's AI parses and enforces it — up to 10 active per group | Admin |
| `.tripwire list` | `.tripwire list` | Show all active tripwires and their trigger counts | Admin |
| `.tripwire clear` | `.tripwire clear` | Remove all tripwires from the group | Admin |
| `.confess` | `.confess [message]` | Post a message to the group anonymously — sender identity is SHA-256 hashed | All (admin must `.confess enable` first) |
| `.trends` | `.trends` / `.trends 7d` | Cross-group keyword trend report — what's rising across all groups Echo is in | Admin (group) |
| `.horoscope` | `.horoscope` | Group horoscope calibrated to the group's own behaviour data | All |

---

## 🔐 Crypto & Privacy 🆕

Real cryptographic primitives, implemented natively — see **[FEATURES.md](FEATURES.md)** for exactly how each one works.

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.stegohide` | `.stegohide [passphrase] [message]` (reply to image) | Hides an AES-256-encrypted message inside the image using LSB steganography | All |
| `.stegoread` | `.stegoread [passphrase]` (reply to the stego image) | Extracts and decrypts the hidden message | All |
| `.tunnel` | `.tunnel @user` | Starts a split-key encrypted channel — Echo never holds a complete key | All |
| `.capsule` | `.capsule [date/time] [message]` | Schedules a message for future delivery; accepts natural-language dates ("next Friday", "in 3 months") | All |
| `.legacy` | `.legacy [days] @recipient [message]` | Digital legacy trigger — delivers your message if you go silent for the configured number of days | All (own trigger) |
| `.legacy cancel` | `.legacy cancel` | Disable your legacy trigger | All |
| `.legacy status` | `.legacy status` | Check your current legacy configuration | All |

---

## 🪙 Coins Economy 🆕

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.coins` | `.coins` | Check your current coin balance and lifetime stats | All |
| `.coinsdaily` | `.coinsdaily` | Claim your daily coin reward — consecutive-day streaks multiply the payout | All |

---

## 🕵️ OSINT & Status Tools 🆕

All of these work only with information already publicly visible on the relevant platform — see **[SECURITY.md](../SECURITY.md)** for responsible-use guidance.

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.footprint` | `.footprint [number or @username]` | OSINT report — carrier, region, line type for numbers; public signal cross-reference for usernames | All |
| `.spy` | `.spy @user` | Begin passive online/offline status monitoring for a contact | All |
| `.spy stop` | `.spy stop @user` | Stop monitoring and purge the collected log | All |
| `.spy report` | `.spy report @user` | Deliver the full activity report — sessions, average duration, last seen, active hours | All |
| `.ghostread` | Reply to a message | Estimates the probability the recipient read the message but hasn't replied | All |
| `.ghostban` | `.ghostban` | Checks whether your own number shows signs of a WhatsApp shadow restriction | All |
| `.brandintel` | `.brandintel [brand or product]` | Deep-dive report — public sentiment, tech stack signals, competitive positioning, SWOT-style output | All |

---

## ⚡ OBLIVION Agent

### Activation

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.oblivion on` | `.oblivion on` | Activate Oblivion in this chat or DM | All |
| `.oblivion off` | `.oblivion off` | Deactivate Oblivion in this chat | All |
| `.oblivion status` | `.oblivion status` | Show Oblivion status and global stats | All |

### Settings

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.oblivion lang` | `.oblivion lang [language]` | Set your response language (e.g. `swahili`, `fr`, `ar`) | All |
| `.oblivion lang auto` | `.oblivion lang auto` | Auto-detect language from each message | All |
| `.oblivion timezone` | `.oblivion timezone [city]` | Set your timezone for scheduling | All |
| `.oblivion mode` | `.oblivion mode [auto\|reply]` | Auto = proactive; Reply = only when addressed | All |
| `.oblivion font` | `.oblivion font [minimal\|rich\|tech\|clean]` | Change reply formatting style | All |
| `.oblivion voice` | `.oblivion voice on/off` | Toggle voice note replies | 💎 Premium |

### Memory & Persona

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.oblivion memory` | `.oblivion memory` | View your saved memory and summary | All |
| `.oblivion forget` | `.oblivion forget` | Clear your personal conversation memory | All |
| `.oblivion forget group` | `.oblivion forget group` | Clear this group's memory (admin only) | Admin |
| `.oblivion remember` | `.oblivion remember [note]` | Tell Oblivion something to always remember | All |
| `.oblivion persona` | `.oblivion persona [instructions]` | Give Oblivion custom permanent instructions | 💎 Premium |
| `.oblivion persona reset` | `.oblivion persona reset` | Remove custom persona | All |
| `.oblivion name` | `.oblivion name [name]` | What you want to call Oblivion | All |
| `.oblivion whoami` | `.oblivion whoami` | What Oblivion knows about you | All |
| `.oblivion history` | `.oblivion history` | View recent conversation history | All |

### Scheduling

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.oblivion schedule list` | `.oblivion schedule list` | List all your pending scheduled actions | All |
| `.oblivion schedule cancel` | `.oblivion schedule cancel [id]` | Cancel a scheduled action by ID | All |
| *(natural language)* | `"close the group at midnight"` | Create a schedule by just telling Oblivion | All |

### Group & Reports

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.oblivion report` | `.oblivion report` | Group activity report — mod events log | Admin |
| `.oblivion capabilities` | `.oblivion capabilities` | Full list of what Oblivion can do | All |

### Owner / Creator

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.oblivion logs` | `.oblivion logs` | View recent Oblivion action log | 👑 Owner |
| `.oblivion broadcast` | `.oblivion broadcast [message]` | Broadcast to all active Oblivion chats | 👑 Creator |

---

## 🛠️ Utility Tools

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.vv` / `.rvo` | Reply to view-once | Recover a view-once photo, video, or voice | All |
| `.translate` | `.translate [lang]` or reply to text/voice | Translate to any language | All |
| `.tomp3` / `.toaudio` | Reply to video | Extract audio from video | All |
| `.tovid` | Reply to animated sticker/GIF | Convert to a playable video | All |
| `.topdf` | Reply to image | Convert image to PDF | All |
| `.tompfour` | Reply to audio | Convert audio to MP4 | All |
| `.shorturl` | `.shorturl [url]` | Shorten a URL | All |
| `.calculate` | `.calculate [expression]` | Calculator — handles complex expressions | All |
| `.timezone` | `.timezone [city]` | Current time in any city worldwide | All |
| `.currency` | `.currency [amount] [FROM] to [TO]` | Live currency conversion | All |
| `.countdown` | `.countdown [YYYY-MM-DD] [label]` | Days remaining until a date | All |
| `.remind` | `.remind [30m\|2h\|1d] [note]` | Set a personal reminder | All |
| `.weather` | `.weather [city]` | Current weather and forecast | All |
| `.repoinfo` | `.repoinfo [owner/repo]` | GitHub repository stats and info | All |
| `.checkid` | `.checkid [number]` | Check WhatsApp registration status | All |
| `.ping` | `.ping` | Bot latency and status check | All |
| `.runtime` | `.runtime` | How long the bot has been online | All |
| `.clearchat` / `.clc` | `.clc` | Clear all messages in a chat (DM only) | All |
| `.iPhonealert` | `.iPhonealert [text]` | Send an iOS-style alert notification sticker | All |
| `.ghostmail` | `.ghostmail [email] [message]` | Send an anonymous email | All |
| `.screenshot` / `.ssweb` | `.ssweb [url]` | Screenshot any website | All |
| `.ocr` | Reply to image | Extract text from an image | All |
| `.imdb` / `.movie` | `.movie [title]` | Movie/TV show info, ratings, cast | All |

---

## [∆] Clan Hub

An optional community/social feature — a roster with roles, separate from the core bot.

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.clantag` | `.clantag` | Show your clan tag | All |
| `.clanlist` | `.clanlist` | View the roster | All |
| `.vow` | `.vow` | Apply for membership | All |

---

## 👑 Owner Commands

These commands are restricted to bot owners and sudo users.

| Command | Usage | Description | Permission |
|---|---|---|---|
| `.mode` | `.mode [public\|self]` | Switch bot between public and self-only mode | 👑 Owner |
| `.addprem` | `.addprem @user [days]` | Grant premium access | 👑 Owner |
| `.delprem` | `.delprem @user` | Remove premium access | 👑 Owner |
| `.listprem` | `.listprem` | List all premium users | 👑 Owner |
| `.checkprem` | `.checkprem @user` | Check a user's premium status | 👑 Owner |
| `.myprem` | `.myprem` | Check your own premium status | All |
| `.addowner` / `.delowner` 🆕 | `.addowner @user` | Grant or revoke owner-level access | 👑 Owner |
| `.addsudo` | `.addsudo @user` | Add a sudo user | 👑 Owner |
| `.delsudo` | `.delsudo @user` | Remove a sudo user | 👑 Owner |
| `.listsudo` | `.listsudo` | List all sudo users | 👑 Owner |
| `.restart` | `.restart` | Restart the bot process | 👑 Owner |
| `.setppbot` | Reply to image | Set the bot's profile picture | 👑 Owner |
| `.delppbot` | `.delppbot` | Remove the bot's profile picture | 👑 Owner |
| `.joingc` | `.joingc [invite link]` | Make the bot join a group via invite | 👑 Owner |
| `.autobio` | `.autobio on/off [template]` | Auto-updating bio with time/date | 👑 Owner |
| `.onlygc` | `.onlygc on/off` | Restrict bot to groups only | 👑 Owner |
| `.autoaigc` | `.autoaigc on/off` | Enable AI auto-response in groups | 👑 Owner |
| `.listpaired` | `.listpaired` | Show all paired phone sessions | 👑 Owner |
| `.pair` 🆕 | `.pair [number]` | Pair a new number directly through a chat with the bot | 👑 Owner |
| `.delbot` / `.rmpair` 🆕 | `.delbot [number]` | Remove a paired bot session | 👑 Owner |
| `.broadcast` / `.broadcastall` | `.broadcast [message]` | Broadcast a message to all active groups | 👑 Owner |
| `.backupdb` 🆕 | `.backupdb` | Trigger a manual database backup | 👑 Owner |
| `.legacy` (config) 🆕 | `.legacy` | Configure the digital legacy trigger defaults | 👑 Owner |
| `.trends` (network) 🆕 | `.trends` | Cross-group keyword trend report — full network-wide version | 👑 Owner |
| `.tripwire` (manage) 🆕 | `.tripwire add\|list\|clear` | Manage AI-parsed behavioural rules for any group | 👑 Owner |
| `.reactch` | `.reactch [link] [emoji]` | React with an emoji in a WhatsApp Channel | 👑 Owner |

---

## 💎 Premium Commands

All premium commands require an active premium subscription.

| Command | Usage | Description |
|---|---|---|
| `.flux` | `.flux [prompt]` | Flux image generation |
| `.sora` | `.sora [prompt]` | Sora image generation |
| `.nano` | `.nano [prompt]` | Nano image generation |
| `.magicstudio` | `.magicstudio [prompt]` | MagicStudio image generation |
| `.luma` | `.luma [prompt]` | Luma AI video generation |
| `.genvid` | `.genvid [prompt]` | AI video generation |
| `.oblivion voice` | `.oblivion voice on` | Voice note AI replies |
| `.oblivion persona` | `.oblivion persona [text]` | Custom persistent AI persona |
| `.pdna` 🆕 | `.pdna @user` | Personality DNA analysis |
| `.voiceemo` 🆕 | Reply to voice note | Voice emotion detection |
| `.docai` 🆕 | Reply to PDF | Document intelligence and Q&A |
| `.debate` 🆕 | `.debate [motion]` | Open an AI-judged debate session |
| *(Unlimited AI)* | All AI commands | Unlimited requests — no cooldowns |
| *(Multi-session)* | Multiple numbers | Pair more than one number |

**Get premium:** Message [@devaura_echobot](https://t.me/devaura_echobot) on Telegram.

---

## Permission levels

| Level | Who | Commands |
|---|---|---|
| **Member** | Anyone | Downloads, AI chat, personal tools, `.coins`, `.confess`, `.capsule`, most OSINT/status tools |
| **Premium** | Paid / gifted tier | Advanced AI features: `.pdna`, `.voiceemo`, `.docai`, `.debate`, image/video generation |
| **Admin** | Group admins | All group protection and settings commands, `.antiphish`, `.resurrect`, `.tripwire`, `.groupdna`, `.temp`, `.groupmap` |
| **Sudo** | Trusted operators | Bot-wide configuration |
| **Owner** | Bot owner | Full panel: `.legacy` (config), `.trends` (network), `.broadcastall`, `.backupdb` |
| **Creator** | Developer | Unrestricted |

---

## A note on the styling

Menus, broadcasts, and many replies arrive in a styled card designed to look clean and consistent — that's Echo's own visual identity, not an official WhatsApp verification badge. It doesn't grant any special account status; it's just how Echo presents itself.

---

<p align="center">
  <sub>⚡ OBLIVION — Echo System Agent · V20|26 · <a href="https://echobot.eu.org">echobot.eu.org</a></sub>
</p>
