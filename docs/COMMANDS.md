# Commands

← [Back to README](../README.md)

Echo has **600+ commands** (counting shortcuts), grouped into a handful of menus. Commands start with `.` by default. In any chat:

| Send | You get |
|---|---|
| `.menu` | The main menu |
| `.groupmenu` · `.utilitymenu` · `.downloadmenu` · `.ownermenu` | One menu per area |
| `.listcase` | Every command, A to Z |
| `.mymenu set <style>` | Change the look: `list`, `poll`, `richcard`, `fakequote`, `interactive`, `aura`, `table` |

**Who can use what.** *Everyone* means any member, *Admin* means group admins, *Owner* means the person who paired the bot. Echo tells you politely when a command needs a higher rank.

Tip: reply to a message, photo or voice note and the command works on it.

---

## Downloads

| Command | What it does |
|---|---|
| `.play <song or link>` | Song as audio, with cover art and details first |
| `.video <title or link>` | Video with its details in the caption |
| `.spotify <track link>` | Spotify track as audio |
| `.tiktok <link>` · `.tiktokmp3` · `.tiktokimage` | TikTok video without watermark, audio only, or photo slideshow |
| `.instagram <link>` (`.ig`) | Instagram posts and reels |
| `.facebook <link>` | Facebook video |
| `.twitter <link>` (`.xdl`) | X (Twitter) media |
| `.pinterest <search>` · `.pinterestdl <link>` | Search or download Pinterest |
| `.threads` · `.capcut` · `.rednote` · `.snap` | Threads, CapCut, RedNote, Snapchat |
| `.applemusic` · `.audiomack` | Apple Music and Audiomack tracks |
| `.mediafire` · `.gdrive` · `.apk <app name>` | Files and Android apps |
| `.lyrics <artist - title>` | Song lyrics |

Add `--mp3` or `--mp4` where it makes sense. Limits: videos up to 10 minutes, audio up to 1 hour, files up to about 50 MB.

---

## Groups (admins)

**Members**

| Command | What it does |
|---|---|
| `.add <number>` · `.kick @user` · `.remove` | Add or remove people |
| `.promote @user` · `.demote @user` | Make or remove an admin |
| `.tagall [message]` · `.hidetag [message]` | Mention everyone, loudly or silently |
| `.tagcountry <country or +code>` | Owner: mention members from one country |
| `.warn @user [reason]` · `.resetwarns @user` | Warnings that add up |
| `.kickall` · `.kickadmins` · `.purge <count>` | Clean-up tools (use with care) |
| `.approve` · `.reject` | Accept or decline all pending join requests |

**Settings**

| Command | What it does |
|---|---|
| `.mute` · `.unmute` · `.lock` · `.unlock` | Close or open the group |
| `.opentime <number> <unit>` · `.closetime <number> <unit>` | Open or close the group after a delay, like `.closetime 30 minutes` |
| `.welcome on\|off` · `.setwelcome` | Welcome cards |
| `.goodbye on\|off` · `.setgoodbye` | Goodbye cards |
| `.setppgc` · `.delppgc` | Group picture |
| `.poll` · `.slowmode` | Polls, slow mode |
| `.gcinfo` · `.gcid` · `.getlink` | Info, ID, invite link |

**Protection**

| Command | What it does |
|---|---|
| `.antilink set warn\|kick\|delete` · `.antilink on\|off` | Block links and choose the penalty |
| `.antiphish on\|off` | Check links for phishing |
| `.antibot` · `.antiword <words>` · `.antispam` | Keep bots, banned words and floods out |
| `.antitag` · `.antimassmention` · `.antigcmention` | Stop mention abuse |
| `.antidemote` · `.antipromote` · `.antikick` | Protect admin changes |
| `.antiimpersonate on\|off` | Flag look-alike names |
| `.antiviewonce group on\|off` | Keep view-once media in this group |
| `.resurrect on\|off` | Reconstruct deleted messages |

**Smart tools**

| Command | What it does |
|---|---|
| `.summarize [bullets\|tldr\|narrative]` | Summary of the recent chat |
| `.timemachine [in 2h \| today \| last 7 days]` | Recap of any time range |
| `.autopilot on\|off` | Let Oblivion help run the group |
| `.constitution generate` | Draft group rules from how the group behaves |
| `.groupdna` · `.temp` · `.groupmap` | Group vibe, mood and who talks to whom |
| `.confess` | Anonymous confession box with admin approval |
| `.debate start` | An AI-judged debate |
| `.sync link @group1 @group2` | Mirror two groups |
| `.tripwire add` | Custom moderation rules |
| `.negotiate start @a @b <issue>` | AI-mediated dispute resolution |

---

## Tools

**Media and files**

| Command | What it does |
|---|---|
| `.sticker` · `.toimg` · `.tovideo` · `.emojimix` | Stickers and conversions |
| `.tomp3` · `.toaudio` · `.topdf` | Video to audio, document to PDF |
| `.8d` `.bass` `.nightcore` `.reverb` `.slow` `.robot` `.chipmunk` `.tremolo` | Audio effects on a voice note or song |
| `.removebg` · `.remini` · `.tohd` | Background removal and image sharpening |
| `.tourl` | Turn any media into a permanent link |
| `.json` `.xml` `.csv` `.excel` `.txt` | Quick document tools |
| `.exif` | See what's hidden inside a photo |

**Everyday**

| Command | What it does |
|---|---|
| `.translate <language>` | Translate a message (reply to it) |
| `.transcribe` | Voice note to text |
| `.shazam` | Name that song |
| `.calculate` · `.currency` · `.timezone` · `.countdown` · `.remind` | Handy helpers |
| `.shorturl <link>` · `.ghostmail` | Short links, throwaway email |
| `.define` · `.movie <title>` · `.price <coin or stock>` | Quick lookups |
| `.anime` · `.waifu` · `.neko` | Anime pictures and info |
| `.joke` · `.fact` · `.8ball` · `.coin` · `.dice` · `.trivia` · `.riddle` | For when the chat goes quiet |

**AI**

| Command | What it does |
|---|---|
| `.oblivion on\|off\|status` | The assistant ([guide](OBLIVION.md)) |
| `.readimg` · `.narrate` · `.docai` · `.voiceemo` | Read an image, narrate it, question a document, sense the mood of a voice note |
| `.factcheck <claim>` | Check a claim |
| `.coach start` · `.learn start <language>` | 30-day coaching and daily language lessons |
| `.song <genre> <topic>` · `.dream` · `.horoscope` · `.predict` · `.viral` | Creative and fun |
| `.flux` · `.canvas` · `.card` · `.nano` | Image generation and design |

---

## Privacy and protection (owner)

| Command | What it does |
|---|---|
| `.antiviewonce on\|off` | Save view-once photos, videos and voice notes to your own chat |
| `.vv` · `.rvo` | Reply to a view-once message to open it |
| `.antidelete` · `.antiedit` | Show deleted and edited messages |
| `.anticall on\|off` | Decline calls automatically |
| `.silentmode on\|off` | Echo stays quiet in a group and only listens |
| `.memo add\|list\|search\|delete` | Private notes with smart search |
| `.stegohide` · `.stegoread` | Hide or read a secret message inside an image |
| `.capsule in 3 days <message>` | Send a message later |
| `.legacy setup` | Messages to be delivered if you're unavailable for a long time |

---

## Status, channels and communities (owner)

| Command | What it does |
|---|---|
| `.mystatus <text>` | Post to your Status (reply to a photo or video to post it) |
| `.gcstatus` · `.gcpost` | Post to a group's updates feed |
| `.upstatus` | Upload a status from chat |
| `.autostatusview on\|off` · `.autoslike <emoji>` | View and react to statuses automatically |
| `.autosave on\|off` | React 💚 to a status to save it to your chat |
| `.postupdate <channel id> open <link> "Button" <message>` | Post to your Channel with a call-to-action button |
| `.newslettercreate` `.newsletterfollow` `.newslettermute` `.newsletterreact` … | Create and manage Channels |
| `.createcommunity` · `.linkgroup` · `.communityinfo` · `.mycommunities` … | Communities |
| `.broadcast [message]` · `.broadcast schedule` | Message many chats at once |

---

## Bot control (owner)

| Command | What it does |
|---|---|
| `.mode public\|self` | Everyone can use Echo, or only you |
| `.anticall` · `.autoread` · `.autotyping` · `.autobio` | Always-on helpers |
| `.autoreply on\|off\|set <message>` | Smart away message in DMs |
| `.setlang` · `.timezone <city>` | Language and time zone |
| `.addowner` · `.sudo` | Give trusted people access |
| `.ping` · `.runtime` · `.ver` · `.sys` | Health and version |
| `.restart` · `.backupdb` | Restart, back up |

---

## Business WhatsApp

`.bizupdate` · `.bizcover` · `.catalog` · `.labels` · `.quickreply` · `.product` · `.order` · `.requestpay`

Manage your business profile, product catalogue, labels, quick replies, orders and payment requests from chat.

---

*Missing a command you expected? Run `.listcase`, or ask in the [community group](https://t.me/silentiumXgroup).*
