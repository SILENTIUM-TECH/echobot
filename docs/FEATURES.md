# Features in depth

← [Back to README](../README.md)

How the best parts of Echo work, and how to get the most out of them.

**On this page:** [Downloads](#downloads) · [View-once](#view-once-keep-it-or-open-it) · [Deleted and edited messages](#deleted-and-edited-messages) · [Keeping groups clean](#keeping-groups-clean) · [Status](#status) · [Channels](#channels) · [Automation](#automation) · [Media tools](#media-tools) · [Private tools](#private-tools) · [Business](#whatsapp-business) · [Languages](#languages)

---

## Downloads

Echo turns a link, or just a name, into a file in your chat. You never leave WhatsApp, open a browser, or dodge an ad.

**Three steps.**

1. Send the command and a link or a name: `.play band for band`.
2. Echo finds it, fetches it on its own servers and prepares the file.
3. You get the file, with the details around it.

**What you see.**

- **Music** arrives as a tidy card first (cover art, title, artist, length), then the audio file.
- **Video** arrives as the video itself, with title, channel and length in the caption.
- **TikTok** comes without the watermark. A photo slideshow comes as pictures. `.tiktokmp3` gives only the sound.
- **Spotify** links become the actual song as audio.

**Why it's reliable.** If one source is busy or blocks a request, Echo tries another on its own. When several people ask for the same track, Echo fetches it once and shares the result, which keeps things fast.

**Good to know.**

- Videos up to 10 minutes, audio up to 1 hour, files up to about 50 MB (WhatsApp's own limit).
- `--mp3` or `--mp4` picks the format, and `--quality 480p` shrinks a big video.
- Private or removed content can't be fetched.

Full list of supported sites: [Commands → Downloads](COMMANDS.md#downloads).

---

## View-once: keep it or open it

View-once photos, videos and voice notes disappear after one look. Echo gives you two ways to deal with that.

**Keep them automatically.**

```text
.antiviewonce on
```

From then on, any view-once media sent to you is copied into your own chat. Each copy shows who sent it, which chat it came from, what it is and when. Turn it off with `.antiviewonce off`. For a single group, use `.antiviewonce group on`.

**Open one on demand.** Reply to a view-once message with `.vv` and Echo shows it to you as normal media.

Echo only sees view-once media that WhatsApp delivers to your linked device. If a message arrives with no content, Echo logs it so you know the problem is WhatsApp's delivery and not your settings.

---

## Deleted and edited messages

- `.antidelete on` shows you what was deleted.
- `.antiedit on` shows you what a message said before it was edited.
- In a group, `.resurrect on` rebuilds deleted messages so nobody can quietly rewrite history.

---

## Keeping groups clean

Turn on only what a group needs. Every switch is a one-liner.

| Problem | Switch |
|---|---|
| Spam links | `.antilink set delete` (or `warn` or `kick`) then `.antilink on` |
| Scam and phishing links | `.antiphish on` |
| Rogue bots | `.antibot on` |
| Banned words | `.antiword on rude word, another word` |
| Floods of messages | `.antispam on` |
| People tagging everyone | `.antimassmention on` · `.antitag on` |
| Sneaky admin changes | `.antidemote on` · `.antipromote on` · `.antikick on` |
| Impersonators | `.antiimpersonate on` |
| Repeat offenders | `.warn @user reason`, and repeated warnings escalate on their own |

When anti-link catches someone, Echo applies the penalty you chose and never punishes admins.

---

## Status

- **Post to your Status** with `.mystatus Good morning`. Reply to a photo, video or voice note to post that instead. Add `| 🔥 | Close friends` to label the audience, or a colour like `#purple` for text statuses, and `cta:Shop now=https://your.link` to attach a link.
- **Post to a group's updates feed** with `.gcstatus`.
- **See everything** automatically: `.autostatusview on` views statuses for you and `.autoslike 💚` picks the reaction.
- **Save anything.** Turn on `.autosave on`, then tap 💚 on a status. Echo sends the photo, video, voice note or text to your own chat.

Echo can only save statuses that arrived while it was connected, and it remembers them for about three hours.

---

## Channels

Run a WhatsApp Channel without leaving chat.

- `.newslettercreate` starts a Channel, and `.newslettername`, `.newsletterdescription` and `.newsletterpicture` style it.
- `.postupdate` publishes to a Channel you administer, with an optional **Open** or **Copy** button.
- `.newsletterfollow`, `.newslettermute`, `.newsletterreact` and `.newslettermessages` handle everything you follow.
- `.newslettersubscribers` and `.newsletteradmins` keep an eye on the audience.

---

## Automation

Set it up once and forget about it.

- **Timers and schedules.** `.closetime 30 minutes` and `.opentime 10 minutes` open or close a group after a delay, and "Oblivion, close the group at 10pm" sets a time of day. `.capsule in 3 days Happy birthday!` sends a message later. `.remind` and `.countdown` handle the rest of life.
- **Away replies.** `.autoreply on` answers your DMs with a smart message when you can't. `.autoreply set <message>` writes your own.
- **Fresh profile.** `.autobio on` keeps your About line current.
- **Status on autopilot.** View and react to every status with `.autostatusview on`.
- **Group autopilot.** `.autopilot on` lets Oblivion assist and manage the group on its own, following the instructions you give with `.autopilot set <instructions>`.
- **Mirrored groups.** `.sync link` keeps two groups in step.
- **Broadcasts.** `.broadcast <message>` reaches many chats at once, `.broadcast schedule` picks the time.
- **Always-on helpers.** `.autoread`, `.autotyping` and `.anticall` quietly improve every day.

---

## Media tools

- **Stickers.** `.sticker` on any photo or short video. `.toimg` and `.tovideo` turn them back.
- **Audio.** `.tomp3`, plus `.8d`, `.bass`, `.nightcore`, `.reverb`, `.slow`, `.robot` and more.
- **Images.** `.removebg` for cut-outs, `.remini` or `.tohd` to sharpen, `.readimg` to read the text in a screenshot or describe a picture.
- **Voice.** `.transcribe` turns a voice note into text, `.shazam` names a song, `.translate fr` translates a message.
- **Documents.** `.topdf` converts, `.docai` summarises a PDF and answers questions about it.
- **Links.** `.tourl` turns any file into a permanent link, `.shorturl` shortens a link.

---

## Private tools

- `.memo add Wi-Fi code is 1234` keeps an encrypted note you can find later with `.memo search wifi`.
- `.stegohide` tucks a secret message inside a picture, `.stegoread` reads it back.
- `.silentmode on` makes Echo invisible in a group while it keeps learning for your summaries.
- `.legacy setup` schedules messages to be delivered if you're away for a long time.

---

## WhatsApp Business

`.catalog`, `.labels`, `.quickreply`, `.product`, `.order` and `.requestpay` run the business side from chat, and `.bizupdate` and `.bizcover` keep your profile current.

---

## Languages

Echo answers in the language you write in. Set the bot's own language with `.setlang`, your time zone with `.timezone Nairobi`, and the Oblivion assistant's language with `.oblivion lang`. This README is also available in [11 languages](../README.md).
