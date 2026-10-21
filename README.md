<div align="center">

<img src="assets/banner.svg" alt="Echo, the WhatsApp bot that feels alive" width="100%"/>

**[English](README.md)** · [Kiswahili](docs/i18n/README.sw.md) · [Français](docs/i18n/README.fr.md) · [Español](docs/i18n/README.es.md) · [Português](docs/i18n/README.pt.md) · [العربية](docs/i18n/README.ar.md) · [हिन्दी](docs/i18n/README.hi.md) · [Bahasa Indonesia](docs/i18n/README.id.md) · [Türkçe](docs/i18n/README.tr.md) · [Русский](docs/i18n/README.ru.md) · [中文](docs/i18n/README.zh.md)

<br/>

[![Version](https://img.shields.io/badge/version-10-45dfbd?style=for-the-badge&labelColor=0b1022)](CHANGELOG.md)
[![Commands](https://img.shields.io/badge/commands-600%2B-7c5cff?style=for-the-badge&labelColor=0b1022)](docs/COMMANDS.md)
[![Built on Baileys](https://img.shields.io/badge/built%20on-Baileys-3aa0ff?style=for-the-badge&labelColor=0b1022)](#how-it-works)
[![Online](https://img.shields.io/badge/online-24%2F7-25D366?style=for-the-badge&labelColor=0b1022)](#kept-fresh)

### WhatsApp, minus the busywork.

Echo is a multi-device WhatsApp bot that runs your groups, grabs your downloads, protects your privacy and answers in plain language, all from the chats you already use.

[**Get started in 60 seconds**](#get-started-in-60-seconds) · [Dashboard](https://echowabot.vercel.app) · [Telegram bot](https://t.me/devaura_echobot) · [Commands](docs/COMMANDS.md) · [Live banner with sound](https://silentium-tech.github.io/echobot/)

</div>

---

## Why people switch to Echo

|  |  |  |
|---|---|---|
| **Your phone gets lighter**<br/>Downloads, conversions and AI jobs run on Echo's servers, so your phone keeps its battery, storage and speed. | **Groups run themselves**<br/>Anti-link, welcome cards, warnings, scheduled open and close, join-request approvals. Set it once. | **Links become files**<br/>Drop a TikTok, Reel, YouTube or Spotify link and the media lands in the chat. No ads, no extra apps. |
| **Ask like a human**<br/>Say "Oblivion, summarise the last hour" or "mute this group at 10pm". Echo understands and does it. | **Nothing disappears**<br/>Keep view-once photos, restore deleted and edited messages, reject unwanted calls. | **Always on**<br/>Echo is a linked device on 24/7 infrastructure, so it keeps working while your phone rests. Just open WhatsApp on it now and then, as WhatsApp asks for any linked device. |

---

## Built for busy admins

Managing five groups should not feel like a second job. Echo takes the repetitive part.

- **Tag smarter.** `.tagall` and `.hidetag` for everyone, or `.tagcountry +256` (owner) to reach only the members from one country.
- **Stop trouble before it spreads.** `.antilink`, `.antiphish`, `.antibot`, `.antiword`, `.antispam`, `.antimassmention` and a warning system that escalates on its own.
- **Welcome people properly.** `.welcome on` greets every newcomer with a card. `.setwelcome` makes it yours.
- **Handle join requests in one tap.** `.approve` and `.reject` clear the whole queue at once.
- **Run on a timer.** `.closetime 30 minutes` closes a group after a pause, and Oblivion handles times of day: "close the group at 10pm".
- **Catch up in seconds.** `.summarize` and `.timemachine today` turn a noisy day into a short brief.
- **Clean up fast.** `.purge`, `.kickall`, `.kickadmins`, `.promote`, `.demote`, `.mute`, `.lock`.
- **Mirror groups.** `.sync link` keeps two groups in step, handy for communities with several chats.

[Admin playbooks →](docs/ADMIN-GUIDE.md)

---

## Chats, channels and status

- **Status in one command.** `.mystatus` posts text, photos, video or audio to your own Status with a custom audience label. `.gcstatus` posts to a group's updates feed.
- **Channels with a call-to-action.** `.postupdate` publishes to a WhatsApp Channel you run, with an Open or Copy button. Create, follow, mute and react to channels with the `newsletter` tools.
- **Never miss a status.** `.autostatusview` views and reacts for you. Tap 💚 on any status and Echo saves it to your chat (`.autosave on`).
- **Communities.** Create, link and manage communities and their groups from chat.
- **WhatsApp Business.** Catalog, labels, quick replies, orders and payment requests.
- **Your numbers, your voice.** `.autoreply` sends a smart away message when you can't answer. `.autobio` keeps your About line fresh.

---

## Every kind of message, understood

Echo reads and responds to everything WhatsApp can send.

| You send | Echo can |
|---|---|
| Text, replies, mentions | Run commands, answer questions, translate, summarise |
| Photos and screenshots | Describe, read the text inside, remove the background, sharpen, make stickers |
| Videos and GIFs | Convert to audio or stickers, resend as files |
| Voice notes and audio | Transcribe to text, identify the song, change speed and effects |
| Documents and PDFs | Summarise, answer questions about them, convert formats |
| Stickers | Turn back into images or video |
| View-once media | Open or save it privately |
| Deleted and edited messages | Restore what was removed or changed |
| Links | Download the media, scan for phishing, shorten |
| Polls, locations, contacts | Create polls, share places, work with contact cards |
| Statuses and Channel posts | View, react, save, post |

---

## Downloads that just work

Send a link or just a name. Echo does the rest.

```text
.play band for band          song by name, with cover art and details
.video funny cats            a video by name
.spotify <track link>        a Spotify track as audio
.tiktok <link>               TikTok without the watermark
.ig <link>   .facebook <link>   .twitter <link>   .pinterestdl <link>   .threads <link>
```

Also supported: Snapchat, CapCut, RedNote, Apple Music, Audiomack, Mediafire, Google Drive and APKs. Audio arrives as a tidy card (cover, title, artist, length) followed by the file. Video arrives with its details as the caption. If one source is busy, Echo quietly tries another, so you rarely see an error.

[How downloads work →](docs/FEATURES.md#downloads)

---

## Oblivion, the assistant inside Echo

No command memorising. Talk to it.

```text
Oblivion, what's the time in Nairobi?
Oblivion, translate this to French            (reply to a message)
Oblivion, tell me about this image            (send or reply to a photo)
Oblivion, close the group at 10pm
Oblivion, summarise today's chat
```

It remembers context, replies in your language, reads images, and asks before it does anything big like removing members. [Meet Oblivion →](docs/OBLIVION.md)

---

## Your privacy, your rules

- **View-once, kept.** `.antiviewonce on` copies view-once photos, videos and voice notes into your own chat. Or reply `.vv` to any view-once to open it.
- **Anti-delete and anti-edit.** See what was removed or changed.
- **Anti-call.** `.anticall on` declines unwanted calls.
- **Secret notes.** `.memo` for encrypted notes, `.stegohide` to tuck a message inside an image.
- **Disappearing messages on your terms.** `.capsule in 3 days <message>` sends a message later.

---

## One place to see it all

- **[Dashboard](https://echowabot.vercel.app)**: your sessions, shields, live logs and settings, with a friendly companion who waves hello. Pick Male, Female or Robot and it speaks with a matching voice.
- **[Telegram bot](https://t.me/devaura_echobot)**: pair numbers, check status, and use `/play`, `/video`, `/spotify`, `/tiktok`, `/tourl` and `/tag all` even when WhatsApp isn't open.

---

## Get started in 60 seconds

1. Open the **[Telegram bot](https://t.me/devaura_echobot)** and send `/pair +your number`.
2. In WhatsApp go to **Settings → Linked Devices → Link a device → Link with phone number instead** and type the 8-character code.
3. Send `.menu` in any chat. That's it.

No QR scanning, and you can remove Echo any time from Linked Devices. [Full guide →](docs/GETTING-STARTED.md)

---

## How it works

Echo joins your account as a **linked device**, the same mechanism WhatsApp Web uses, built on the open-source **[Baileys](https://github.com/WhiskeySockets/Baileys)** library. Messages stay end-to-end encrypted. Echo only acts on what it receives as that linked device, and you can unlink it whenever you like. [Architecture →](docs/ARCHITECTURE.md)

---

## Kept fresh

Echo is looked after every week, on both sides of the product.

| Part | Cadence |
|---|---|
| **Bot core and commands** (the backend) | Improvements ship weekly |
| **Dashboard and Telegram bot** (the front end) | Updated weekly |
| **WhatsApp changes and security fixes** | Patched within 24 to 48 hours |

Every release is written up in the [changelog](CHANGELOG.md).

---

## A banner that celebrates with you

The banner above isn't a still image. It decorates itself for the nearest holiday in your country, from a month before to two days after: Christmas trees, Eid lanterns, Diwali lamps, national-day colours and more. Open the **[live version](https://silentium-tech.github.io/echobot/)** to hear it too. [How it works →](docs/EVENTS.md)

---

## Documentation

| | |
|---|---|
| [Getting started](docs/GETTING-STARTED.md) | Pair in minutes, unpair any time |
| [Commands](docs/COMMANDS.md) | Every menu with usage |
| [Features in depth](docs/FEATURES.md) | View-once, anti-link, downloads, status and more |
| [Admin guide](docs/ADMIN-GUIDE.md) | Playbooks for busy group admins |
| [Oblivion](docs/OBLIVION.md) | The assistant inside Echo |
| [Telegram bot](docs/TELEGRAM.md) | Commands that work without WhatsApp |
| [Dashboard](docs/DASHBOARD.md) | Sessions, shields, logs, companion |
| [Self-hosting](docs/SELF-HOSTING.md) | Run your own instance |
| [FAQ](docs/FAQ.md) · [Privacy](docs/PRIVACY.md) · [Security](SECURITY.md) | Straight answers |
| [About](docs/ABOUT.md) · [Changelog](CHANGELOG.md) | The story and the history |

---

## Connect

| | |
|---|---|
| **Dashboard** | [echowabot.vercel.app](https://echowabot.vercel.app) |
| **Telegram bot** | [@devaura_echobot](https://t.me/devaura_echobot) |
| **Telegram channel** | [t.me/silentium_01](https://t.me/silentium_01) |
| **Community group** | [t.me/silentiumXgroup](https://t.me/silentiumXgroup) |
| **WhatsApp channel** | [Follow Echo](https://whatsapp.com/channel/0029Vb2b92L0wak15aR8Ur17) |
| **TikTok** | [@realtech256](https://www.tiktok.com/@realtech256) |
| **Support** | [t.me/loner_01verified](https://t.me/loner_01verified) · WhatsApp +256 757 582 170 |

---

## The maker

Echo is built and maintained by **Benjamin**, a young developer from Uganda in his early twenties, known online as **Dev Aura** and **loner_01verified**. He also goes by **𝐇𝐄'𝐒 𓊈∆𓊉 𝐃𝐄𝐕𖤐᭄𝕍𝕠𝕚𝔻⎯꯭ᴀᴜʀᴀ』** and **𝐋𝚯𝐍𝚵𝐑_𝟎𝟏**. He builds under **Silentium Techies™** with one idea: WhatsApp should feel easier, not busier.

<div align="center">
<sub>Echo is an independent project and is not affiliated with, endorsed by or sponsored by WhatsApp or Meta.<br/>Echo · v10 · <a href="https://echowabot.vercel.app">echowabot.vercel.app</a></sub>
</div>
