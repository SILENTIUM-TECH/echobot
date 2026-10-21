# Admin guide

← [Back to README](../README.md)

Playbooks for people who look after busy groups. Each one takes a couple of minutes and then keeps working while you get on with your day.

---

## Set up a new group in 3 minutes

```text
.welcome on                       greet every newcomer
.setwelcome Welcome @user! Please read the rules and say hi.
.antilink set delete              remove links automatically
.antilink on
.antiphish on                     check the links that do get through
.antibot on                       keep spam bots out
.closetime 2 hours                close the group after a cooldown
```

For a set time of day, just say it: *"Oblivion, close the group at 10pm."*

Then ask Oblivion to write the rules: `.constitution generate`, and post the result with `.constitution adopt`.

---

## A calm daily routine

| When | Do this |
|---|---|
| Morning | `.summarize tldr` for the night's chat, `.approve` to clear join requests |
| During the day | Echo handles links, spam and warnings. You step in only for people. |
| Announcements | `.tagall Meeting at 5pm`, or `.hidetag` when you don't want the noise |
| Evening | `.groupdna` and `.temp` show the group's mood. Oblivion's scheduled close takes over. |

---

## When things go wrong

**A raid of spam accounts.**
`.mute` closes the group, `.antibot on` and `.antispam on` shut the door, then clear the mess with `.purge 50` and reopen with `.unmute`. `.kickall` removes everyone who isn't an admin if you need a hard reset.

**A heated argument.**
`.negotiate start @anna @joel the budget` opens a calm AI-moderated session and `.negotiate close` ends it. Pair it with `.slowmode`.

**Someone is pretending to be an admin.**
`.antiimpersonate on` flags look-alike names automatically.

**Someone keeps breaking the rules.**
`.warn @user reason` adds up. Repeated warnings can escalate on their own, and `.resetwarns @user` gives a fresh start.

**Admins being removed behind your back.**
`.antidemote on`, `.antipromote on` and `.antikick on` undo the change and tell you.

---

## Running many groups

- **Mirror two groups** that share an audience: `.sync link @group1 @group2`, and `.sync list` shows what's linked.
- **Broadcast** an announcement to every group: `.broadcast groups New schedule is live`, or `.broadcast schedule 18:00 <message>`.
- **Find your group IDs** with `.mygroups` and `.gcid`.
- **Communities.** `.createcommunity`, `.linkgroup` and `.communityinfo` manage a community and its groups from chat.

---

## Handle join requests in one tap

When a group uses *Approve new members*, requests pile up. Send `.approve` to accept everyone waiting or `.reject` to decline them. Shortcuts `.aprv` and `.rjct` do the same.

---

## Reach the right people

- `.tagall` mentions everyone, `.hidetag` mentions without showing the list.
- `.tagcountry +256` (owner) mentions only the members from one country, handy for local announcements in an international group.
- `.poll` for quick votes and `.confess on` for an anonymous box that you approve before anything is posted.

---

## Talk to Oblivion like a deputy

You can say things instead of remembering commands:

```text
Oblivion, close the group at midnight
Oblivion, who was most active this week?
Oblivion, summarise what I missed since lunch
```

Anything that changes membership or sends to many people asks for your confirmation first. Details in [Oblivion](OBLIVION.md).

---

## Also on Telegram

Telegram groups get `/welcome`, `/antilink`, `/warn`, `/ban`, `/mute`, `/rules`, `/pin` and `/tag all`. See the [Telegram guide](TELEGRAM.md).
