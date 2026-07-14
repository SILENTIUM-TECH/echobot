# Privacy, in Plain Language

## The short version

Pairing Echo doesn't hand over your password (there isn't one to give — WhatsApp's own Linked Devices system generates a temporary code). Echo isn't reading your chats for ad targeting, and nothing is sold to third parties. Here's exactly what it does store, and why.

## What Echo stores, and why

| Data | Why | 
|---|---|
| **Session/login credentials** | Required to keep your linked device connected — the same kind of thing WhatsApp itself stores for every device you link. |
| **Recent conversation context (AI chats only)** | So the AI assistant can respond like it remembers what you just said, instead of treating every message as a stranger would. Older context gets summarized and trimmed, not kept forever. |
| **Group moderation records** (e.g. warnings issued via `.warn`) | So a group's own admins can see a member's history when deciding on kicks/bans. Only visible within that group. |
| **Basic usage stats** (commands run, uptime, error rates) | Used to keep the service running and catch bugs — not tied to reading the content of your personal messages. |

## What Echo does **not** do

- It doesn't sell your data or messages to advertisers.
- It doesn't read your chats outside of processing the command or AI message you actually send it.
- It doesn't share group warning/moderation records outside that specific group.

## Commands that look up public information

A handful of utility commands (like profile or account lookups) return information that's **already publicly visible** on the platform they're checking — the same thing you'd see by visiting that profile yourself. They don't bypass anyone's privacy settings. See [SECURITY.md](../SECURITY.md) for guidance on using these responsibly.

## Your control

- **Unpair any time** from WhatsApp's own Linked Devices screen — instant, no approval needed.
- **Turn off the AI assistant** per-chat with `.chatbot off` if you'd rather it stay silent.
- **Leave a group** and any bot with it — nothing follows you out.

## Questions?

Reach out via **[t.me/silentium_01](https://t.me/silentium_01)** or the community group.
