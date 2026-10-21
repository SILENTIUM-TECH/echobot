# How Echo works

← [Back to README](../README.md)

A plain-language tour, with no secrets given away.

```text
 You ── WhatsApp ──────────────┐
                               ▼
                     ┌───────────────────┐        ┌──────────────────┐
 Telegram bot  ────► │    Echo core      │ ◄────► │   Dashboard      │
 (pair, play, tag)   │  linked-device    │        │ (sessions, logs) │
                     │  sessions         │        └──────────────────┘
                     └───┬───────────┬───┘
                         │           │
              ┌──────────▼───┐   ┌───▼─────────────┐
              │  Commands    │   │ Oblivion         │
              │  600+ tools  │   │ assistant + AI   │
              └──────────────┘   └──────────────────┘
```

## Linked device

Echo pairs to your account the same way WhatsApp Web does, using the open-source **[Baileys](https://github.com/WhiskeySockets/Baileys)** library. It talks to WhatsApp over the multi-device protocol, so messages stay end-to-end encrypted and your phone doesn't have to forward anything.

## Many sessions, one core

A single Echo instance looks after many paired numbers at once. Each session keeps its own settings (public or private mode, protections, language) and its own saved credential.

## Staying connected

Long-running reliability is a feature, not an accident:

- **Self-healing connections.** If a session drops, Echo reconnects it in an orderly queue, and a supervisor checks every session about once a minute and rebuilds any that went quiet.
- **Safe credentials.** Credentials are saved in an order that survives a crash, with a backup copy ready if a write is ever interrupted.
- **One owner per session.** A lease stops two copies of Echo from fighting over one number.
- **Calm restarts.** When the server restarts, sessions are saved first and brought back in turn.

## Commands

Every command declares who can use it (member, admin, owner). Echo checks that before it runs anything, whether you typed the command or asked Oblivion to do it for you.

## Oblivion

Oblivion turns plain language into the right command, with your rank and the chat's context in mind. It has several AI engines behind it and moves between them automatically, so one busy engine doesn't stop a reply.

## Downloads

Downloads run on Echo's servers. A request is resolved, prepared once, and shared with anyone else asking for the same item at the same time. If a source refuses, Echo falls back to another.

## Dashboard and Telegram

Both are thin front ends over the same core, so pairing on Telegram and managing on the dashboard always agree.
