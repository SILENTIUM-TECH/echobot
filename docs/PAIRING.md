# 📱 Pairing Echo Oblivion

← [Back to README](../README.md)

---

## What pairing means

Pairing uses WhatsApp's own **Linked Devices** system — the same technology that powers WhatsApp Web and the desktop app. When you pair, WhatsApp generates a temporary 8-character code that links Echo to your account as a trusted device. There is no password involved because WhatsApp doesn't use passwords for device linking. You're in full control and can unlink at any moment from your phone.

Once paired, Echo runs as a linked device on your account — it sees messages sent to it in group chats and DMs, responds to commands, and handles group moderation. It does not see your other private conversations.

> Echo runs 24/7 on dedicated infrastructure. Your phone does not need to be online, on, or even have data — once paired, Echo operates independently.

🎥 **Prefer to watch it happen?** **[Full pairing walkthrough on TikTok →](https://vt.tiktok.com/ZSXJwrPLV/)**

---

## Method 1 — Telegram Bot *(Recommended)*

The fastest and most reliable way to pair.

**[t.me/devaura_echobot](https://t.me/devaura_echobot)**

1. Open the bot on Telegram and press **Start**
2. Send the command:
   ```
   /pair +[your number with country code]
   ```
   Example: `/pair +256757582170`
3. The bot sends back an 8-character pairing code
4. On your phone, open WhatsApp:
   - **Settings → Linked Devices → Link a Device**
   - Tap **"Link with phone number instead"** (at the bottom of the QR screen)
   - Enter the 8-character code
5. Done — Echo is live in your account

The Telegram bot also lets you manage your session (unpair, check status) without using a browser.

---

## Method 2 — Web Dashboard

Full-featured pairing and management through the browser.

**[echobot.eu.org](https://echobot.eu.org)**

1. Go to the dashboard and create a free account
2. Navigate to **WhatsApp Sessions** → **Add Session**
3. Enter your number in international format — no `+`, no spaces
   - Example: `256757582170` for a Ugandan number
4. Click **Get Pairing Code** — an 8-character code appears on screen
5. On your phone:
   - **WhatsApp → Settings → Linked Devices → Link a Device**
   - Tap **"Link with phone number instead"**
   - Enter the code
6. The dashboard shows a green ✅ once connected

The dashboard also gives you access to live bot activity, group controls, premium management, and session settings — all without typing commands.

---

## Method 3 — QR Code

Available through the dashboard.

1. Go to **[echobot.eu.org](https://echobot.eu.org)**
2. Navigate to **WhatsApp Sessions → Add Session → QR Code**
3. A QR code appears on screen
4. On your phone:
   - **WhatsApp → Settings → Linked Devices → Link a Device**
   - Point your camera at the QR code
5. Scan — connected instantly

QR codes expire after 60 seconds. If it expires before you scan, just refresh the page for a new one.

---

## Method 4 — Directly Through WhatsApp

If you already know someone with Echo paired, you can request a code straight from a chat with the bot itself — no Telegram or browser needed.

1. Message Echo **privately** (not in a group) from the number you want to pair:
   ```
   .pair 256757582170
   ```
   Use international format, digits only — no `+` or spaces.
2. Echo replies with an 8-character pairing code the same way as the other methods.
3. On your phone: **WhatsApp → Settings → Linked Devices → Link a Device → Link with phone number instead**.
4. Enter the code — you're live.

---

## After Pairing

Once Echo is linked:

1. Open any WhatsApp chat — a group you admin, or a DM with any contact
2. Send `.menu` — Echo responds with the full command menu
3. Explore from there, or send `.oblivion on` to activate the AI agent

You don't need to add Echo as a contact. It works through the linked device connection.

---

## How to Unpair

You are always in full control.

**From your phone:**
- WhatsApp → Settings → Linked Devices
- Tap the Echo session → **Log Out**
- Immediate. No approval needed. No waiting.

**From the dashboard:**
- Go to **WhatsApp Sessions** → find your session → **Disconnect**

Either method works instantly. Echo stops responding the moment the session is removed.

---

## Troubleshooting

**"The pairing code is invalid or expired"**  
Codes expire after 60 seconds. Request a new one and enter it quickly — the entire process takes about 20 seconds once you have the code ready.

**"I entered the code but nothing happened"**  
Make sure you're on the **phone number** entry screen, not the QR screen. Tap "Link with phone number instead" first. Also confirm you entered all 8 characters correctly.

**"Echo isn't responding in my group"**  
Echo only responds to commands starting with the prefix (`.` by default). Try sending `.ping` — if you get a response, Echo is working. If not, check that your session is still active on the dashboard.

**"I paired but Echo went offline"**  
WhatsApp occasionally closes linked device sessions after extended inactivity or network issues. Just pair again — it takes 2 minutes and there's no limit on repairings.

**"I'm getting 'already connected' errors"**  
Your number is already linked to an active Echo session. Log into the dashboard to see it, or use the Telegram bot to check your session status.

---

## FAQ on Pairing

**Will this affect my main WhatsApp account?**  
No. Echo is added as a linked device — the same as WhatsApp Web. All your existing chats, contacts, and account settings are untouched. Linking Echo does not change anything visible on your account.

**Can my contacts tell I'm using a bot?**  
Only if the bot says something that makes it obvious. WhatsApp shows linked devices in your Settings → Linked Devices, but only you can see that list. Your contacts do not see it.

**Can I pair multiple numbers?**  
Free accounts support one paired number. Premium users can pair multiple numbers simultaneously.

---

📋 More questions? **[Full FAQ](FAQ.md)**  
🔐 Privacy concerns? **[Privacy Policy](PRIVACY.md)**

<p align="center">
  <sub>⚡ OBLIVION — Echo System Agent · <a href="https://echobot.eu.org">echobot.eu.org</a></sub>
</p>
