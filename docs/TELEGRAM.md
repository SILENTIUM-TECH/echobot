# Telegram bot

← [Back to README](../README.md)

**[@devaura_echobot](https://t.me/devaura_echobot)** is Echo's companion. It pairs your WhatsApp numbers, and it's a handy tool by itself: music, video, links and group moderation work even when WhatsApp isn't open.

---

## Pair and manage

| Command | What it does |
|---|---|
| `/start` · `/menu` | Open the menu |
| `/pair +256…` | Get a WhatsApp pairing code |
| `/listpair` · `/delpair` | See your sessions, remove one |
| `/runtime` · `/listmode` | Uptime and bot modes |

---

## Downloads (private chat)

| Command | What it does |
|---|---|
| `/play <song or link>` | Audio. A cover card with the song details appears first, then disappears as the audio arrives. |
| `/video <title or link>` | Video with its details as the caption |
| `/spotify <track link>` | A Spotify track as audio |
| `/tiktok <link>` · `/tiktokmp3` · `/tiktokimage` | TikTok video, audio or photos |
| `/song <link>` | Audio from a supported link |

---

## Files to links

`/tourl` turns a file into a permanent link you can share anywhere. Reply to a photo, video, audio, voice note or document with `/tourl`, or send the file with `/tourl` as its caption. Telegram lets bots read files up to 20 MB.

---

## Group tools

| Command | What it does |
|---|---|
| `/tag all [message]` (or `/tagall`) | Mention everyone Echo knows in the group |
| `/welcome` · `/goodbye` | Welcome and goodbye cards |
| `/antilink` | Remove links, with your choice of penalty |
| `/warn` · `/ban` · `/unban` · `/kick` · `/mute` · `/unmute` | Moderation |
| `/rules` · `/groupinfo` · `/pin` · `/unpin` | Group info |
| `/lock` · `/unlock` | Lock a command |

`/tag all` mentions the admins plus everyone Echo has seen speak or join, because Telegram doesn't let bots list a group's members. Turn off the bot's privacy mode in @BotFather so it sees more of your group.
