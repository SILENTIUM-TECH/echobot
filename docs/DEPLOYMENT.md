# 🚀 Echo Oblivion — Self-Hosting Guide

← [Back to README](../README.md) · [Pairing](PAIRING.md) · [Architecture](ARCHITECTURE.md)

This guide covers running Echo Oblivion on your own server. If you want to use the hosted version (zero setup), see **[PAIRING.md](PAIRING.md)**.

---

## Requirements

| Requirement | Minimum | Recommended |
|---|---|---|
| **Node.js** | 18.x | 20.x LTS or 22.x |
| **npm** | 8+ | comes with Node |
| **RAM** | 512 MB | 1 GB+ |
| **Storage** | 2 GB | 5 GB+ (media temp files) |
| **OS** | Linux (Ubuntu 20.04+) | Ubuntu 22.04 LTS |
| **MongoDB** | 5.0+ | MongoDB Atlas (free tier works) |

> ⚠️ **Cloud provider IPs (AWS, GCP, Replit, Railway, etc.)** are commonly blocked by WhatsApp for the pairing handshake. If pairing fails on your cloud server, pair from a local machine first, then copy the generated session folder to the server. After the initial pairing, reconnection works fine from any IP.

---

## Installation

### 1. Get the code

Upload the bot files to your server and navigate into the directory:

```bash
cd echo-bot
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

This installs all required packages including `whatsapp-rust-bridge` (required for the Noise protocol handshake in Baileys 1.1.9+) and `ffmpeg-static` (for media processing).

Expected output: ~1 000 packages, a few deprecation warnings — these are safe to ignore.

### 3. Configure environment

Open `.env` and fill in your values:

```env
# ── Core ──────────────────────────────
MONGO_URI=mongodb+srv://...          # MongoDB connection string
JWT_SECRET=your-secret-here          # Random string, keep private
SESSION_SECRET=your-secret-here      # Random string, keep private
PORT=25760                           # Dashboard port

# ── Telegram ──────────────────────────
TELEGRAM_BOT_TOKEN=...               # From @BotFather
TELEGRAM_CHAT_ID=...                 # Your Telegram user ID

# ── AI Providers ──────────────────────
GROQ_API_KEY=...                     # From console.groq.com (free)
GEMINI_KEY=...                       # From aistudio.google.com (free)
OPENROUTER_API_KEY=...               # From openrouter.ai (optional)

# ── Email (SMTP) ──────────────────────
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-app-password

# ── Optional Phase 2/3 features ───────
VERIPHONE_KEY=...                    # .footprint — veriphone.io
HIBP_API_KEY=...                     # .breachcheck — haveibeenpwned.com
ALPHA_VANTAGE_KEY=...                # .price stocks — alphavantage.co
GOOGLE_FACT_CHECK_KEY=...            # .factcheck — console.cloud.google.com

# ── Owner config ──────────────────────
OWNER_NUMBER=256757582170            # Your WhatsApp number (digits only)
```

### 4. Start the bot

```bash
node BENJAMIN.js
```

Or with PM2 (recommended for production):

```bash
npm install -g pm2
pm2 start BENJAMIN.js --name echo-bot
pm2 save
pm2 startup
```

---

## First Run

On first start you'll see:

```
[FFMPEG] ✅ Binary present
[CommandRegistry] Scanned Echo.js — 391 commands indexed
⚡ ECHO OBLIVION — SYSTEM PROTOCOL
[OK] Analytics Service initialized ✓
📭 [System] No valid sessions found to restore.
🚀 ECHO SYSTEM IS LIVE
🌐 Dashboard: http://YOUR-IP:25760
[OK] MongoDB connected ✓
[OK] SMTP verified
[AI] OBLIVION Agent system modules loaded
```

`No valid sessions found` is expected on first run — the bot is ready to pair, it just hasn't been connected to a WhatsApp number yet.

---

## Pairing on Your Server

### Method 1 — Via Telegram (Recommended)

If you have `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` configured:

Send from Telegram:
```
/pair 256757582170
```

The bot responds with an 8-character pairing code. Enter it in WhatsApp → Settings → Linked Devices → Link a Device → Link with phone number instead.

### Method 2 — Via Dashboard

Open `http://YOUR-IP:25760` → register → go to WhatsApp Sessions → Add Session → enter number → Get Pairing Code.

### Method 3 — Copy an Existing Session

If you've already paired on another machine (e.g. Replit, local dev):

1. Copy the session folder from the original machine:
   ```
   Echo_sessions/session_256790839077/
   ```
2. Place it in the same path on your server
3. Restart the bot — it reads the session and reconnects automatically, no QR or code needed

---

## Session Storage

Session credentials are stored in:
```
Echo_sessions/session_[your-number]/
```

**Back this folder up.** If it's lost and MongoDB doesn't have a backup of the credentials, you'll need to re-pair.

The folder contains Baileys' multi-file auth state — several small JSON files including `creds.json` (the key pair), pre-keys, and session state. Never share these files.

---

## Production Setup with PM2

```bash
# Start
pm2 start BENJAMIN.js --name echo-bot --max-memory-restart 800M

# View logs
pm2 logs echo-bot

# Restart
pm2 restart echo-bot

# Stop
pm2 stop echo-bot

# Auto-start on boot
pm2 startup
pm2 save
```

### Recommended PM2 ecosystem file (`ecosystem.config.js`)

```js
module.exports = {
  apps: [{
    name: 'echo-bot',
    script: 'BENJAMIN.js',
    max_memory_restart: '800M',
    restart_delay: 3000,
    max_restarts: 10,
    autorestart: true,
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

Start with: `pm2 start ecosystem.config.js`

---

## Reverse Proxy (Nginx)

If you want the dashboard accessible on port 80/443:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:25760;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Add SSL with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## MongoDB Setup

### Option 1 — MongoDB Atlas (Recommended, free tier)

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → create a free account
2. Create a free M0 cluster
3. Create a database user (username + password)
4. Add your server IP to the network access list (or use `0.0.0.0/0` for open access)
5. Get the connection string: **Connect → Drivers** → copy the `mongodb+srv://...` URI
6. Replace `<password>` with your database user password
7. Paste into `.env` as `MONGO_URI`

### Option 2 — Local MongoDB

```bash
# Ubuntu/Debian
sudo apt install mongodb
sudo systemctl enable mongodb
sudo systemctl start mongodb
```

Set in `.env`:
```env
MONGO_URI=mongodb://127.0.0.1:27017/echo_oblivion
```

---

## Troubleshooting

### Bot starts but WhatsApp says "Connection Closed" during pairing

This is typically WhatsApp rejecting the pairing from a cloud provider IP range. Solutions:
1. **Pair from a local machine first**, then copy the session folder to the server
2. **Use a residential VPS** (e.g. a server at home, or a VPS with a residential IP)
3. Try pairing via the Telegram bot from a different network

### `whatsapp-rust-bridge` failed to load

Run:
```bash
npm install whatsapp-rust-bridge@0.5.4 --legacy-peer-deps
```

If this fails due to missing build tools:
```bash
sudo apt install build-essential python3
npm install whatsapp-rust-bridge@0.5.4 --legacy-peer-deps
```

### MongoDB connection timeout

- Check that your IP is whitelisted in Atlas network access settings
- Verify the URI in `.env` is correct (including the database name at the end)
- Check that MongoDB service is running: `sudo systemctl status mongodb`

### Telegram 409 Conflict

This means another instance of the bot is already polling your Telegram token. Stop the other instance first. If you want to run two instances, create a second Telegram bot token with @BotFather.

### Bot reconnects but never shows "connected"

Check:
1. The session folder exists and contains `creds.json`
2. `creds.json` is valid JSON (not truncated/empty)
3. The MongoDB URI is reachable from your server

If `creds.json` is corrupted, delete the session folder and re-pair.

---

## Updating

When a new version is released:

1. Download the updated code
2. Stop the bot: `pm2 stop echo-bot`
3. Replace the bot files (keep your `.env` and `Echo_sessions/` folder — do not replace these)
4. Run `npm install --legacy-peer-deps` to pick up any new dependencies
5. Start: `pm2 start echo-bot`

Your MongoDB data, session, and configuration survive the update.

---

## Environment Variables Reference

| Variable | Required | Used For |
|---|---|---|
| `MONGO_URI` | ✅ | Database connection |
| `JWT_SECRET` | ✅ | Dashboard auth tokens |
| `SESSION_SECRET` | ✅ | Express session |
| `PORT` | ✅ | Dashboard port |
| `TELEGRAM_BOT_TOKEN` | ✅ | Telegram management panel |
| `TELEGRAM_CHAT_ID` | ✅ | Telegram admin notifications |
| `GROQ_API_KEY` | Recommended | AI fallback 2 |
| `GEMINI_KEY` | Recommended | AI fallback 3 |
| `OPENROUTER_API_KEY` | Optional | AI fallback 4 |
| `EMAIL_HOST` | Recommended | SMTP for dashboard email |
| `EMAIL_USER` | Recommended | SMTP sender address |
| `EMAIL_PASS` | Recommended | SMTP password / app password |
| `OWNER_NUMBER` | ✅ | Your WhatsApp number |
| `VERIPHONE_KEY` | Optional | `.footprint` OSINT |
| `HIBP_API_KEY` | Optional | `.breachcheck` |
| `ALPHA_VANTAGE_KEY` | Optional | `.price` (stocks) |
| `GOOGLE_FACT_CHECK_KEY` | Optional | `.factcheck` |

---

<p align="center">
  <sub>⚡ OBLIVION — Echo System Agent · <a href="https://echowabot.eu.org">echowabot.eu.org</a></sub>
</p>
