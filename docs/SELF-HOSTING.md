# Self-hosting

← [Back to README](../README.md)

Most people use Echo's hosted service and never need this page. If you want your own instance, this is what it takes. The bot package isn't published in this repository. To run your own instance, ask in the [community group](https://t.me/silentiumXgroup) or message [@loner_01verified](https://t.me/loner_01verified).

## What you need

| Requirement | Notes |
|---|---|
| Server | Any Linux host, 1 GB of memory or more. Each paired number adds a little. |
| Node.js | 18 or newer (20 recommended) |
| MongoDB | A free Atlas cluster is plenty |
| Telegram bot token | From [@BotFather](https://t.me/BotFather), for pairing and alerts |
| ffmpeg | Included with the package; a system copy also works |

Optional: API keys for extra AI engines and data lookups improve capacity and unlock a few lookups. Echo runs without them.

## Install

```bash
unzip echo-bot.zip && cd echo-bot
npm install
cp .env.example .env        # then fill it in
node BENJAMIN.js
```

For production, keep it alive with PM2:

```bash
npm install -g pm2
pm2 start BENJAMIN.js --name echo
pm2 save && pm2 startup
```

## The settings that matter

```env
MONGO_URI=mongodb+srv://...      # your database
JWT_SECRET=a-long-random-string  # keep private
PORT=25760                       # dashboard port
TELEGRAM_BOT_TOKEN=...           # from BotFather
TELEGRAM_CHAT_ID=...             # your Telegram user ID
OWNER_NUMBER=256757582170        # your number, digits only
```

## YouTube on a hosting provider

Some hosts' IP addresses are limited by YouTube. If music or video downloads fail with a "limiting this server" message, export your YouTube cookies in Netscape format and save them as `cookies/youtube.txt` (or point `SOCIAL_DL_YOUTUBE_COOKIES` at the file). Use a throwaway account, never your main one. Echo picks the file up without a restart.

## First run

On the first start you'll see a "No valid sessions" note. That's normal: nothing is paired yet. Pair with `/pair` from Telegram or from the dashboard on `http://YOUR-IP:25760`.

## Keeping it healthy

- Back up your database regularly (`.backupdb` makes a snapshot from chat).
- Keep Node and your packages current.
- Watch **Logs** on the dashboard for anything unusual.
