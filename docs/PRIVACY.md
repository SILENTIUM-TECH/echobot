# Privacy

← [Back to README](../README.md)

*Last updated: October 2026*

Written to be read, not survived. Here is what Echo does with your data, what it never does, and what you control.

---

## What Echo processes

| What | Why | How long |
|---|---|---|
| **Session credential** (made when you pair) | Keeps Echo connected without your phone. It's the same kind of key WhatsApp Web uses. | Until you unpair, then deleted |
| **Messages sent to Echo** (commands, replies, media you ask it to work on) | To do what you asked | Handled in the moment, not kept in a searchable log |
| **Oblivion memory** (only if you turn Oblivion on) | So it can answer with context. Roughly your last 50 exchanges, with older ones condensed. | Until you run `.oblivion forget` or unpair |
| **Warnings and group settings** | So admins can run their group | Stay inside that group's context |
| **Group statistics** (for `.groupdna`, `.temp`, `.summarize`) | Word counts, mood scores, activity times. Individual messages are processed in memory, not stored as raw text. | Rolling, aggregate only |
| **Scheduled items** (`.capsule`, reminders, `.legacy`) | To deliver them on time | Deleted right after delivery |
| **Downloads and conversions** | Files are prepared on Echo's servers, sent to you, and shared with anyone asking for the same item in the next few minutes. | Deleted within about 10 minutes |
| **Status references** (for `.autosave`) | So tapping 💚 can find the status again | Held in memory for about 3 hours |
| **Usage totals** (commands run, errors, uptime) | To keep the service healthy | Aggregate, not tied to message content |

Optional tools such as private notes, secret-message tools and monitoring helpers keep only what they need to work, only for the person who switched them on, and they delete it when you stop them.

---

## What Echo never does

- Sell your data. There are no advertisers and no data brokers.
- Read your private conversations. Echo acts on messages it receives as your linked device and the commands you give it.
- Share group moderation records outside the group.
- Use your conversations to train AI models.
- Keep passwords or keys from secret-message tools beyond the operation itself.
- Keep anonymous-confession senders in any recoverable form (only an irreversible hash used to stop abuse).

Echo is end-to-end encrypted the same way any linked WhatsApp device is.

---

## Your controls

| You want to | Do this |
|---|---|
| Stop Echo immediately | WhatsApp → Linked Devices → tap Echo → **Log out**, or `/delpair` on Telegram, or **Disconnect** on the dashboard |
| Erase what Oblivion knows | `.oblivion forget` |
| Review or change what Echo does | The dashboard's **Shields** and **Settings** tabs |
| Ask about your data | Message [t.me/loner_01verified](https://t.me/loner_01verified) |

---

## Third parties

Some jobs (for example AI answers, music matching or downloads) use outside services to do their work, and only the information needed for that single job is sent. Echo does not send those services your identity or your contact list.

---

## Children

Echo follows WhatsApp's own minimum-age rules.

---

## Changes

If this policy changes in a meaningful way, the date above changes and the [changelog](../CHANGELOG.md) says so.
