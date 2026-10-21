# Getting started

← [Back to README](../README.md)

Echo joins your WhatsApp as a **linked device**, the same way WhatsApp Web does. Pairing takes about a minute, and you stay in control: unlink it whenever you like.

---

## Pick your way in

### 1. Telegram bot (fastest)

1. Open **[@devaura_echobot](https://t.me/devaura_echobot)** and press **Start**.
2. Send `/pair +your number` with the country code, for example `/pair +256757582170`.
3. The bot replies with an 8-character code.
4. On your phone: **WhatsApp → Settings → Linked Devices → Link a device → Link with phone number instead**, then type the code.

The same bot lists your sessions (`/listpair`), removes one (`/delpair`) and shows uptime (`/runtime`).

### 2. Dashboard

1. Open **[echowabot.vercel.app](https://echowabot.vercel.app)** and create a free account.
2. Go to **WhatsApp → Add session**, enter your number in international format (digits only, like `256757582170`) and press **Get pairing code**.
3. Enter the code on your phone as above, or choose **QR code** and scan it from **Link a device**. QR codes last about a minute, so refresh if it expires.

### 3. From WhatsApp itself

Message an Echo-powered number privately and send `.pair 256757582170` (digits only). You'll get the same 8-character code.

---

## After pairing

1. Open any chat and send **`.menu`**.
2. Try **`.play your favourite song`**.
3. In a group you admin, send **`.antilink on`** and **`.welcome on`**.
4. Say **"Oblivion, what can you do?"** or send `.oblivion capabilities`.

Echo doesn't need to be saved as a contact. It works through your linked-device connection.

---

## Unlink any time

- **Phone:** WhatsApp → Settings → Linked Devices → tap the Echo session → **Log out**.
- **Dashboard:** WhatsApp → find the session → **Disconnect**.
- **Telegram:** `/delpair`.

Echo stops responding the moment the session is removed.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Code invalid or expired" | Codes last about a minute. Request a new one and enter it straight away. |
| Nothing happens after typing the code | Make sure you're on the **phone number** screen (tap *Link with phone number instead*) and typed all 8 characters. |
| Echo doesn't reply in a group | Commands start with `.` by default. Send `.ping`. If that works, check the command spelling. |
| Echo went offline | WhatsApp sometimes ends a linked session after a long idle spell. Pair again; there's no limit. Opening WhatsApp on your phone regularly prevents this. |
| "Already connected" | That number already has a session. Check the dashboard or `/listpair`. |

---

## Quick answers

**Will this change my main account?** No. Your chats, contacts and settings stay exactly as they are.

**Can my contacts see that I use Echo?** Only if a message makes it obvious. The Linked Devices list is visible to you alone.

**Can I pair more than one number?** Yes. Pair each number from the Telegram bot or the dashboard, and `/listpair` shows them all.

**Does Echo work on WhatsApp Business?** Yes, and it adds Business tools such as catalogues, labels and quick replies. See [Commands](COMMANDS.md#business-whatsapp).

More answers in the [FAQ](FAQ.md) · [Privacy](PRIVACY.md).
