# Every Command, Explained

All commands use Echo's prefix (default `.`). Replace `<...>` with your own value; `@user` means tag or reply to someone.

Send **`.menu`** any time in WhatsApp to see this same structure live, with sub-menus for each category.

---

## 📥 Downloads & AI — `.dlmenu`

### Audio / Video
| Command | What it does |
|---|---|
| `.play <song name>` | Search & download a track from YouTube as audio, arriving with real title/artist/cover-art tags |
| `.video <name or link>` | Download a YouTube video |
| `.tiktok <link>` / `.tiktokmp3 <link>` | Download a TikTok video, or just its audio |
| `.instagram` / `.ig <link>` | Download an Instagram post/reel |
| `.facebook` / `.fbdl <link>` | Download a Facebook video |
| `.twitter` / `.xdl <link>` | Download a Twitter/X video |
| `.spotify <link>` | Download a Spotify track |
| `.shazam` (reply to audio/video) | Identify a song from a clip |

### Image / Sticker
| Command | What it does |
|---|---|
| `.pinterest <query>` | Search & download Pinterest images |
| `.tgstickers <link>` | Download a Telegram sticker pack |
| `.gdrive <link>` | Download a public Google Drive file |
| `.apk <app name>` | Download an Android APK |

### AI Generation
| Command | What it does |
|---|---|
| `.flux <prompt>` / `.sora <prompt>` / `.nano <prompt>` | Generate an image from a text description |
| `.genvid <prompt>` / `.luma <prompt>` | Generate a short video from a text description |
| `.faceswap` (reply to 2 images) | Swap a face between two photos |
| `.tohd` / `.remini` (reply to image) | AI-enhance/upscale a photo |

### Talk to it directly
| Command | What it does |
|---|---|
| `.gpt4o <question>` / `.gemini <question>` | Ask the AI assistant directly |
| Just message it normally | No command needed — Echo chats naturally, remembers context, and can pull in live weather/news/price/date info when relevant |

---

## 👥 Group Control — `.gcmenu`

### Members
| Command | What it does |
|---|---|
| `.add <number>` | Add a member |
| `.kick @user` | Remove a member |
| `.promote @user` / `.demote @user` | Change admin status |
| `.tagall [message]` / `.hidetag [message]` | Mention everyone |

### Protection
| Command | What it does |
|---|---|
| `.antilink set warn\|kick\|delete` | Action taken when someone posts a link |
| `.antigcmention on/off` | Blocks your group from being used to farm mentions into someone's WhatsApp Status |
| `.antidelete on/off` | Catches messages people try to delete before you see them |
| `.antidemote` / `.antipromote` / `.antikick` | Stops unauthorized admin changes or removals |
| `.antibot on/off` | Blocks other bots from the group |

### Settings
| Command | What it does |
|---|---|
| `.mute` / `.unmute` | Restrict messaging to admins, or lift it |
| `.welcome on/off` / `.goodbye on/off` | Toggle join/leave messages |
| `.setwelcome <text>` / `.setgoodbye <text>` | Customize those messages |
| `.warn @user [reason]` | Issue a strike — auto-kicks after 3 |
| `.warnings @user` / `.resetwarns @user` | Check or clear someone's strikes |
| `.poll <question> \| opt1 \| opt2` | Create a native WhatsApp poll |
| `.slowmode <seconds>` | Rate-limit how often members can message |
| `.gcinfo` / `.gcid` / `.getlink` | Group details, ID, and invite link |

---

## 🛠️ Utility Tools — `.xtools`

| Command | What it does |
|---|---|
| `.tomp3` (reply to video) | Extract audio |
| `.tovid` (reply to animated sticker/GIF) | Convert to a playable video |
| `.topdf` (reply to image) | Image → PDF |
| `.removebg` (reply to image) | Remove background |
| `.emojimix 😀+😎` | Blend two emoji into a sticker |
| `.rvo` / `.vv` (reply to a view-once message) | Recover a view-once photo, video, or voice note |
| `.translate` (reply to a voice note) | Translate speech to English text |
| `.timezone <city>` | Current time in any city worldwide |
| `.currency <amount> <FROM> to <TO>` | Currency conversion |
| `.countdown <YYYY-MM-DD> <label>` | Days remaining until a date |
| `.remind <30m\|2h> <note>` | Personal reminder |
| `.repoinfo <owner/repo>` | GitHub repository stats |
| `.shorturl <link>` | Shorten a URL |
| `.calculate <expression>` | Quick math |

---

## [∆] Clan Hub — `.clanmenu`

An optional community/social feature — a roster with roles, separate from the core bot.

| Command | What it does |
|---|---|
| `.clantag` | Show your clan tag |
| `.clanlist` | View the roster |
| `.vow` | Apply for membership |

---

## A note on the styling

Menus, broadcasts, and many replies arrive in a styled card designed to look clean and consistent — that's Echo's own visual identity, not an official WhatsApp verification badge. It doesn't grant any special account status; it's just how Echo presents itself.
