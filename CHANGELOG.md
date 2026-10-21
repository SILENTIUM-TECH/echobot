# Changelog

← [Back to README](README.md)

## v10 (current)

Echo v10 is a complete, polished release.

**Downloads**
- Songs arrive as a card with cover art, title, artist and length, followed by the audio. Videos carry their details as the caption.
- Spotify links work as full tracks.
- Automatic fallback when a source is busy, plus shared downloads so repeated requests are quick.

**Groups**
- `.approve` / `.reject` (shortcuts `.aprv` / `.rjct`) clear join requests at once.
- Fixed `.kickall` so it works with every kind of member ID.

**Status, channels and privacy**
- `.mystatus` posts to your own Status with an audience label and an optional link.
- 💚 on a status saves it to your chat (`.autosave`), and the setting now survives reconnects.
- View-once capture rebuilt with clearer logging.

**Oblivion**
- Reads images, whether sent with a caption or replied to.
- Persona, voice replies, memory controls and schedules.

**Reliability**
- Sessions that go quiet after a network drop are detected and rebuilt automatically.
- Safer credential saving with backups, and no more deletion of live key files during clean-up.
- Orderly restart with calm back-off.

**Telegram bot**
- New `/spotify`, `/tourl` and `/tag all`. `/play` and `/video` now match the WhatsApp experience.

**Dashboard**
- Companion redesigned: Male, Female or Robot, with matching voices and natural movement.

**Docs**
- A new README, guides for admins, features and the Telegram bot, 11 languages, and a banner that celebrates your country's holidays.
