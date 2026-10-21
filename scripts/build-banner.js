#!/usr/bin/env node
/**
 * Builds the animated Echo banner.
 *
 *   node scripts/build-banner.js                       -> assets/banner.svg for today (country UG)
 *   node scripts/build-banner.js --country KE          -> same, for Kenya
 *   node scripts/build-banner.js --date 2026-12-20     -> pretend it is that day
 *   node scripts/build-banner.js --gallery             -> assets/events/<theme>.svg for every theme
 *
 * The daily GitHub Action (.github/workflows/banner.yml) runs this so the README banner
 * always matches the nearest event of the country set in the BANNER_COUNTRY variable.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const Banner = require('../docs/banner-engine.js');

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf('--' + name);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const root = path.join(__dirname, '..');
const country = String(opt('country', process.env.BANNER_COUNTRY || 'UG')).toUpperCase();
const dateArg = opt('date', null);
const now = dateArg ? new Date(dateArg + 'T12:00:00Z') : new Date();
const version = opt('version', 'v10');
const commands = opt('commands', '600+ commands');

function write(file, svg) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === svg) return false;
  fs.writeFileSync(file, svg);
  return true;
}

if (args.includes('--gallery')) {
  const seen = new Set();
  const dir = path.join(root, 'assets', 'events');
  write(path.join(dir, 'aurora.svg'), Banner.render({ code: country, noEvent: true, version, commands }).svg);
  Object.keys(Banner.EVENTS).forEach((key) => {
    const ev = Banner.EVENTS[key];
    if (seen.has(ev.theme)) return;
    seen.add(ev.theme);
    const forceEvent = {
      name: ev.name, label: ev.name + (key === 'newyear' ? ' 2027' : ''), theme: ev.theme, pal: ev.pal, date: { y: 2027, m: 1, d: 1 }, country,
    };
    write(path.join(dir, ev.theme + '.svg'), Banner.render({ code: country, forceEvent, version, commands }).svg);
  });
  const c = Banner.COUNTRIES.UG;
  write(path.join(dir, 'national.svg'), Banner.render({
    code: 'UG', version, commands,
    forceEvent: { name: 'Independence Day', label: 'Happy Independence Day, ' + c.name, theme: 'national', pal: c.flag.concat(['#45dfbd', '#7c5cff']), date: { y: 2026, m: 10, d: 9 } },
  }).svg);
  console.log('Gallery written to assets/events/');
  process.exit(0);
}

const { svg, event } = Banner.render({ code: country, now, version, commands });
const changed = write(path.join(root, 'assets', 'banner.svg'), svg);
console.log(`[banner] ${country} ${now.toISOString().slice(0, 10)} -> ${event ? event.label : 'aurora (no event)'}${changed ? ' (updated)' : ' (unchanged)'}`);
