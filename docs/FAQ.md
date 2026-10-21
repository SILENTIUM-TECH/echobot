# FAQ

← [Back to README](../README.md)

## The basics

**Is it safe to use with my real number?**
Yes. Echo joins as a linked device, exactly like WhatsApp Web. Your chats, contacts and settings stay untouched, and you can remove it in one tap from Linked Devices.

**Will people know I use a bot?**
Only if something Echo says makes it obvious. Your contacts can't see your Linked Devices list.

**Does Echo read my private chats?**
No. It acts on commands and on messages sent to it. See [Privacy](PRIVACY.md).

**Does my phone need to stay online?**
No. Echo runs on its own servers. WhatsApp does ask that you open it on your phone from time to time, as it does for every linked device.

**Does it work on WhatsApp Business?**
Yes, and you get extra [Business tools](COMMANDS.md#business-whatsapp).

**Can I pair more than one number?**
Yes. Use `/pair` on Telegram or the dashboard for each number, and `/listpair` to see them all.

**Does it cost anything?**
Pairing Echo and using its commands is free. If that ever changes, it will be announced in the [channel](https://t.me/silentium_01) first.

## Using it

**How do I change the language?**
`.setlang` for Echo, `.oblivion lang` for the assistant, and you can simply write to Oblivion in your language.

**Can I use a different prefix?**
Yes, the owner can change it from the settings. The default is `.`.

**Can everyone use every command?**
No. Echo checks rank first: members get everyday tools, admins get group tools, and owners get bot control.

**Echo isn't replying in my group. What now?**
Send `.ping`. If it answers, check the spelling and your rank. If not, open the dashboard and make sure the session is connected, or pair again.

**Why did a download fail?**
Usually the source is private, removed, or too big (over about 50 MB). Echo already tries more than one source, so waiting a minute and trying again often works.

**Can it download any website?**
It supports the major social, video and music platforms listed under [Downloads](COMMANDS.md#downloads).

## Privacy tools

**Does `.antiviewonce` break any rules?**
It saves media that was sent to *you*, to *your* own chat. Use it responsibly, and don't share what others sent in confidence.

**Why didn't a view-once get saved?**
Echo can only keep what WhatsApp delivers to your linked device. If a message arrives empty, Echo logs it.

**Why can't I save a status?**
Echo remembers statuses that arrived while it was connected, for about three hours. Older ones can't be found.

**Is `.confess` really anonymous?**
Admins never see who sent a confession. Echo keeps only an irreversible fingerprint to stop abuse.

## Oblivion

**What is Oblivion?**
The assistant inside Echo. Talk to it in plain language. See [Oblivion](OBLIVION.md).

**Will it do something dangerous on its own?**
No. It follows your rank and asks before removing members, closing groups or messaging many people.

## Other

**What if WhatsApp restricts my account?**
Echo behaves like a normal linked device and keeps its pace human, but any automation carries some risk. Avoid mass-messaging strangers, and keep your phone's WhatsApp up to date.

**How do I remove Echo?**
WhatsApp → Linked Devices → tap Echo → **Log out**, or `/delpair` on Telegram.

**How do I report a bug?**
Open an [issue](https://github.com/SILENTIUM-TECH/echobot/issues/new/choose), or tell us in the [community group](https://t.me/silentiumXgroup).

**Is the source code public?**
This repository holds the documentation and branding. The bot itself is not open for contribution, but documentation fixes and translations are welcome. See [Contributing](../.github/CONTRIBUTING.md).
