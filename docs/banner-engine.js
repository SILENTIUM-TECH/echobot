/*!
 * Echo banner engine
 * Builds the animated "liquid glass" Echo banner and decorates it for the nearest
 * holiday of a given country. Pure JavaScript, no dependencies, runs in Node and in
 * the browser (docs/index.html uses it for the live page).
 *
 * Rules: a decoration starts 30 days before the event, stays on the event day and
 * ends 2 days after it. "Today" is read in the country's own time zone, so a
 * holiday that falls on different days in different places is handled per country.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.EchoBanner = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DAY = 86400000;
  var BEFORE_DAYS = 30;
  var AFTER_DAYS = 2;

  /* ───────────── dates ───────────── */
  function utcDay(y, m, d) { return Math.floor(Date.UTC(y, m - 1, d) / DAY); }
  function fromDay(n) { var t = new Date(n * DAY); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; }

  function easterDay(y) {
    // Anonymous Gregorian algorithm
    var a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4,
      f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
      i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
      month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
    return utcDay(y, month, day);
  }
  function nthWeekday(y, month, weekday, n) { // weekday 0=Sun
    var first = new Date(Date.UTC(y, month - 1, 1)).getUTCDay();
    return utcDay(y, month, 1 + ((weekday - first + 7) % 7) + (n - 1) * 7);
  }

  var islamicCache = {};
  function islamicDays(y) {
    // Gregorian day numbers of 1 Shawwal (Eid al-Fitr) and 10 Dhu al-Hijjah (Eid al-Adha).
    // Computed with the Umm al-Qura calendar; local moon sighting can differ by a day.
    if (islamicCache[y]) return islamicCache[y];
    var out = { fitr: null, adha: null };
    try {
      var fmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', { day: 'numeric', month: 'numeric', timeZone: 'UTC' });
      for (var n = utcDay(y, 1, 1); n <= utcDay(y, 12, 31); n++) {
        var parts = fmt.formatToParts(new Date(n * DAY)), mo = 0, dy = 0;
        for (var i = 0; i < parts.length; i++) { if (parts[i].type === 'month') mo = +parts[i].value; if (parts[i].type === 'day') dy = +parts[i].value; }
        if (mo === 10 && dy === 1 && out.fitr === null) out.fitr = n;
        if (mo === 12 && dy === 10 && out.adha === null) out.adha = n;
      }
    } catch (e) { /* Intl without Islamic calendar: Eid themes are simply skipped */ }
    islamicCache[y] = out;
    return out;
  }

  // Lunar-calendar events use verified lookup tables (2026-2030).
  var DIWALI = { 2026: [11, 8], 2027: [10, 29], 2028: [10, 17], 2029: [11, 5], 2030: [10, 26] };
  var LUNAR_NY = { 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13], 2030: [2, 3] };

  /* ───────────── event catalogue ───────────── */
  // date(y) -> Gregorian day number; theme -> decoration; pal -> accent colours (blobs)
  var EVENTS = {
    newyear: { name: 'Happy New Year', theme: 'newyear', pri: 5, pal: ['#ffd166', '#7c5cff', '#3aa0ff', '#ff4fd8', '#45dfbd'], date: function (y) { return utcDay(y, 1, 1); } },
    valentine: { name: "Happy Valentine's Day", theme: 'valentine', pri: 3, pal: ['#ff4f81', '#ff8fb1', '#b4005d', '#7c5cff', '#ffb3c7'], date: function (y) { return utcDay(y, 2, 14); } },
    christmas: { name: 'Merry Christmas', theme: 'christmas', pri: 6, pal: ['#d62839', '#1b8a5a', '#ffd166', '#3aa0ff', '#45dfbd'], date: function (y) { return utcDay(y, 12, 25); } },
    easter: { name: 'Happy Easter', theme: 'easter', pri: 4, pal: ['#ffb3de', '#b8f2e6', '#ffe29a', '#b79cff', '#9be7ff'], date: easterDay },
    halloween: { name: 'Happy Halloween', theme: 'halloween', pri: 4, pal: ['#ff7a00', '#7c2cff', '#1a1033', '#b6ff5c', '#ff4f00'], date: function (y) { return utcDay(y, 10, 31); } },
    eidfitr: { name: 'Eid Mubarak', theme: 'eid', pri: 6, pal: ['#d4af37', '#0f9d76', '#3aa0ff', '#7c5cff', '#f4e3a3'], date: function (y) { return islamicDays(y).fitr; } },
    eidadha: { name: 'Eid al-Adha Mubarak', theme: 'eid', pri: 6, pal: ['#d4af37', '#0f9d76', '#3aa0ff', '#7c5cff', '#f4e3a3'], date: function (y) { return islamicDays(y).adha; } },
    diwali: { name: 'Happy Diwali', theme: 'diwali', pri: 6, pal: ['#ff9f1c', '#ff4f81', '#ffd166', '#ff5400', '#7c5cff'], date: function (y) { return DIWALI[y] ? utcDay(y, DIWALI[y][0], DIWALI[y][1]) : null; } },
    lny: { name: 'Happy Lunar New Year', theme: 'lny', pri: 6, pal: ['#e63946', '#ffd166', '#ff7a00', '#b5179e', '#ffb703'], date: function (y) { return LUNAR_NY[y] ? utcDay(y, LUNAR_NY[y][0], LUNAR_NY[y][1]) : null; } },
    thanksgiving_us: { name: 'Happy Thanksgiving', theme: 'thanksgiving', pri: 4, pal: ['#e36414', '#9a031e', '#fb8b24', '#5f0f40', '#ffd166'], date: function (y) { return nthWeekday(y, 11, 4, 4); } },
    thanksgiving_ca: { name: 'Happy Thanksgiving', theme: 'thanksgiving', pri: 4, pal: ['#e36414', '#9a031e', '#fb8b24', '#5f0f40', '#ffd166'], date: function (y) { return nthWeekday(y, 10, 1, 2); } },
    bonfire: { name: 'Bonfire Night', theme: 'bonfire', pri: 3, pal: ['#ff7a00', '#ff3d00', '#ffd166', '#7c5cff', '#3aa0ff'], date: function (y) { return utcDay(y, 11, 5); } },
    carnival: { name: 'Happy Carnival', theme: 'carnival', pri: 5, pal: ['#ffd166', '#06d6a0', '#ef476f', '#118ab2', '#b5179e'], date: function (y) { return easterDay(y) - 47; } },
    muertos: { name: 'Dia de Muertos', theme: 'muertos', pri: 5, pal: ['#ff9f1c', '#b5179e', '#2ec4b6', '#ffbf69', '#7c5cff'], date: function (y) { return utcDay(y, 11, 2); } },
    stpatrick: { name: "Happy St. Patrick's Day", theme: 'stpatrick', pri: 4, pal: ['#1b9e4b', '#7bd88f', '#ffd166', '#0b6e4f', '#45dfbd'], date: function (y) { return utcDay(y, 3, 17); } },
    songkran: { name: 'Happy Songkran', theme: 'songkran', pri: 5, pal: ['#3aa0ff', '#45dfbd', '#9be7ff', '#7c5cff', '#ffd166'], date: function (y) { return utcDay(y, 4, 13); } }
  };

  /* ───────────── countries ─────────────
   * f: flag colours · tags: which shared events the country observes
   * days: national days [name, month, day]
   */
  var C = {
    UG: ['Uganda', 'Africa/Kampala', ['#111111', '#FCDC04', '#D90000'], 'xmas easter eid', [['Independence Day', 10, 9], ['Martyrs Day', 6, 3], ['Heroes Day', 6, 9]]],
    KE: ['Kenya', 'Africa/Nairobi', ['#111111', '#BB0000', '#006600'], 'xmas easter eid', [['Jamhuri Day', 12, 12], ['Madaraka Day', 6, 1], ['Mashujaa Day', 10, 20]]],
    TZ: ['Tanzania', 'Africa/Dar_es_Salaam', ['#1EB53A', '#FCD116', '#00A3DD'], 'xmas easter eid', [['Independence Day', 12, 9], ['Union Day', 4, 26]]],
    RW: ['Rwanda', 'Africa/Kigali', ['#00A1DE', '#FAD201', '#20603D'], 'xmas easter', [['Independence Day', 7, 1], ['Liberation Day', 7, 4]]],
    NG: ['Nigeria', 'Africa/Lagos', ['#008751', '#ffffff', '#008751'], 'xmas easter eid', [['Independence Day', 10, 1], ['Democracy Day', 6, 12]]],
    GH: ['Ghana', 'Africa/Accra', ['#CE1126', '#FCD116', '#006B3F'], 'xmas easter eid', [['Independence Day', 3, 6], ['Republic Day', 7, 1]]],
    ZA: ['South Africa', 'Africa/Johannesburg', ['#007A4D', '#FFB612', '#DE3831'], 'xmas easter eid', [['Freedom Day', 4, 27], ['Youth Day', 6, 16], ['Heritage Day', 9, 24]]],
    ET: ['Ethiopia', 'Africa/Addis_Ababa', ['#078930', '#FCDD09', '#DA121A'], 'xmas eid', [['Enkutatash', 9, 11]]],
    EG: ['Egypt', 'Africa/Cairo', ['#CE1126', '#ffffff', '#111111'], 'eid', [['Revolution Day', 7, 23]]],
    MA: ['Morocco', 'Africa/Casablanca', ['#C1272D', '#006233', '#C1272D'], 'eid', [['Throne Day', 7, 30]]],
    ZM: ['Zambia', 'Africa/Lusaka', ['#198A00', '#DE2010', '#EF7D00'], 'xmas easter', [['Independence Day', 10, 24]]],
    ZW: ['Zimbabwe', 'Africa/Harare', ['#006400', '#FFD200', '#D40000'], 'xmas easter', [['Independence Day', 4, 18]]],
    SN: ['Senegal', 'Africa/Dakar', ['#00853F', '#FDEF42', '#E31B23'], 'xmas eid', [['Independence Day', 4, 4]]],
    CI: ["Côte d'Ivoire", 'Africa/Abidjan', ['#F77F00', '#ffffff', '#009E60'], 'xmas easter eid', [['Independence Day', 8, 7]]],
    CD: ['DR Congo', 'Africa/Kinshasa', ['#007FFF', '#F7D618', '#CE1021'], 'xmas easter', [['Independence Day', 6, 30]]],
    US: ['United States', 'America/New_York', ['#B22234', '#ffffff', '#3C3B6E'], 'xmas easter halloween thanksgiving_us stpatrick', [['Independence Day', 7, 4]]],
    CA: ['Canada', 'America/Toronto', ['#D80621', '#ffffff', '#D80621'], 'xmas easter halloween thanksgiving_ca stpatrick', [['Canada Day', 7, 1]]],
    MX: ['Mexico', 'America/Mexico_City', ['#006847', '#ffffff', '#CE1126'], 'xmas easter muertos', [['Independence Day', 9, 16]]],
    BR: ['Brazil', 'America/Sao_Paulo', ['#009C3B', '#FFDF00', '#002776'], 'xmas easter carnival', [['Independence Day', 9, 7]]],
    AR: ['Argentina', 'America/Argentina/Buenos_Aires', ['#74ACDF', '#ffffff', '#F6B40E'], 'xmas easter carnival', [['Independence Day', 7, 9]]],
    CO: ['Colombia', 'America/Bogota', ['#FCD116', '#003893', '#CE1126'], 'xmas easter', [['Independence Day', 7, 20]]],
    GB: ['United Kingdom', 'Europe/London', ['#012169', '#ffffff', '#C8102E'], 'xmas easter halloween bonfire', []],
    IE: ['Ireland', 'Europe/Dublin', ['#169B62', '#ffffff', '#FF883E'], 'xmas easter halloween stpatrick', []],
    FR: ['France', 'Europe/Paris', ['#0055A4', '#ffffff', '#EF4135'], 'xmas easter', [['Bastille Day', 7, 14]]],
    DE: ['Germany', 'Europe/Berlin', ['#111111', '#DD0000', '#FFCE00'], 'xmas easter', [['Unity Day', 10, 3]]],
    ES: ['Spain', 'Europe/Madrid', ['#AA151B', '#F1BF00', '#AA151B'], 'xmas easter', [['National Day', 10, 12]]],
    IT: ['Italy', 'Europe/Rome', ['#009246', '#ffffff', '#CE2B37'], 'xmas easter', [['Republic Day', 6, 2]]],
    PT: ['Portugal', 'Europe/Lisbon', ['#006600', '#FF0000', '#FFD700'], 'xmas easter', [['Portugal Day', 6, 10]]],
    RU: ['Russia', 'Europe/Moscow', ['#ffffff', '#0039A6', '#D52B1E'], '', [['Russia Day', 6, 12]]],
    TR: ['Türkiye', 'Europe/Istanbul', ['#E30A17', '#ffffff', '#E30A17'], 'eid', [['Republic Day', 10, 29]]],
    SA: ['Saudi Arabia', 'Asia/Riyadh', ['#006C35', '#ffffff', '#006C35'], 'eid', [['National Day', 9, 23]]],
    AE: ['UAE', 'Asia/Dubai', ['#00732F', '#ffffff', '#FF0000'], 'eid', [['National Day', 12, 2]]],
    IN: ['India', 'Asia/Kolkata', ['#FF9933', '#ffffff', '#138808'], 'xmas diwali eid', [['Republic Day', 1, 26], ['Independence Day', 8, 15]]],
    PK: ['Pakistan', 'Asia/Karachi', ['#01411C', '#ffffff', '#01411C'], 'eid', [['Pakistan Day', 3, 23], ['Independence Day', 8, 14]]],
    BD: ['Bangladesh', 'Asia/Dhaka', ['#006A4E', '#F42A41', '#006A4E'], 'eid', [['Independence Day', 3, 26], ['Victory Day', 12, 16]]],
    ID: ['Indonesia', 'Asia/Jakarta', ['#E70011', '#ffffff', '#E70011'], 'xmas eid lny', [['Independence Day', 8, 17]]],
    MY: ['Malaysia', 'Asia/Kuala_Lumpur', ['#CC0001', '#010066', '#FFCC00'], 'eid diwali lny', [['Merdeka Day', 8, 31]]],
    SG: ['Singapore', 'Asia/Singapore', ['#EF3340', '#ffffff', '#EF3340'], 'xmas eid diwali lny', [['National Day', 8, 9]]],
    PH: ['Philippines', 'Asia/Manila', ['#0038A8', '#ffffff', '#CE1126'], 'xmas easter halloween', [['Independence Day', 6, 12]]],
    TH: ['Thailand', 'Asia/Bangkok', ['#A51931', '#F4F5F8', '#2D2A4A'], 'songkran lny', []],
    VN: ['Vietnam', 'Asia/Ho_Chi_Minh', ['#DA251D', '#FFCD00', '#DA251D'], 'lny', [['National Day', 9, 2]]],
    CN: ['China', 'Asia/Shanghai', ['#DE2910', '#FFDE00', '#DE2910'], 'lny', [['National Day', 10, 1]]],
    JP: ['Japan', 'Asia/Tokyo', ['#ffffff', '#BC002D', '#ffffff'], 'xmas', [['Foundation Day', 2, 11]]],
    KR: ['South Korea', 'Asia/Seoul', ['#ffffff', '#CD2E3A', '#0047A0'], 'xmas lny', [['Liberation Day', 8, 15]]],
    AU: ['Australia', 'Australia/Sydney', ['#00008B', '#ffffff', '#E4002B'], 'xmas easter halloween', [['Australia Day', 1, 26]]],
    NZ: ['New Zealand', 'Pacific/Auckland', ['#00247D', '#ffffff', '#CC142B'], 'xmas easter halloween', [['Waitangi Day', 2, 6]]]
  };
  var COUNTRIES = {};
  Object.keys(C).forEach(function (k) { COUNTRIES[k] = { code: k, name: C[k][0], tz: C[k][1], flag: C[k][2], tags: C[k][3].split(' ').filter(Boolean), days: C[k][4] }; });

  // Time zone -> country (browser detection). Unknown zones fall back to the browser language region.
  var TZ = {
    'Africa/Kampala': 'UG', 'Africa/Nairobi': 'KE', 'Africa/Dar_es_Salaam': 'TZ', 'Africa/Kigali': 'RW', 'Africa/Lagos': 'NG', 'Africa/Accra': 'GH',
    'Africa/Johannesburg': 'ZA', 'Africa/Addis_Ababa': 'ET', 'Africa/Cairo': 'EG', 'Africa/Casablanca': 'MA', 'Africa/Lusaka': 'ZM', 'Africa/Harare': 'ZW',
    'Africa/Dakar': 'SN', 'Africa/Abidjan': 'CI', 'Africa/Kinshasa': 'CD', 'Africa/Lubumbashi': 'CD', 'America/New_York': 'US', 'America/Chicago': 'US',
    'America/Denver': 'US', 'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US', 'Pacific/Honolulu': 'US', 'America/Toronto': 'CA',
    'America/Vancouver': 'CA', 'America/Edmonton': 'CA', 'America/Halifax': 'CA', 'America/Mexico_City': 'MX', 'America/Sao_Paulo': 'BR', 'America/Fortaleza': 'BR',
    'America/Manaus': 'BR', 'America/Argentina/Buenos_Aires': 'AR', 'America/Buenos_Aires': 'AR', 'America/Bogota': 'CO', 'Europe/London': 'GB', 'Europe/Dublin': 'IE',
    'Europe/Paris': 'FR', 'Europe/Berlin': 'DE', 'Europe/Madrid': 'ES', 'Europe/Rome': 'IT', 'Europe/Lisbon': 'PT', 'Europe/Moscow': 'RU', 'Europe/Istanbul': 'TR',
    'Asia/Riyadh': 'SA', 'Asia/Dubai': 'AE', 'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Asia/Karachi': 'PK', 'Asia/Dhaka': 'BD', 'Asia/Jakarta': 'ID',
    'Asia/Kuala_Lumpur': 'MY', 'Asia/Singapore': 'SG', 'Asia/Manila': 'PH', 'Asia/Bangkok': 'TH', 'Asia/Ho_Chi_Minh': 'VN', 'Asia/Shanghai': 'CN', 'Asia/Tokyo': 'JP',
    'Asia/Seoul': 'KR', 'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU', 'Australia/Perth': 'AU', 'Pacific/Auckland': 'NZ'
  };
  function detectCountry(tz, lang) {
    if (tz && TZ[tz]) return TZ[tz];
    var m = /[-_]([A-Za-z]{2})\b/.exec(lang || '');
    if (m && COUNTRIES[m[1].toUpperCase()]) return m[1].toUpperCase();
    return null;
  }

  /* ───────────── event resolution ───────────── */
  function todayIn(tz, now) {
    var d = now || new Date();
    try {
      var p = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d).split('-');
      return utcDay(+p[0], +p[1], +p[2]);
    } catch (e) { return Math.floor(d.getTime() / DAY); }
  }

  function candidates(country) {
    var list = [];
    var tags = {};
    country.tags.forEach(function (t) { tags[t] = true; });
    list.push('newyear', 'valentine');
    if (tags.xmas) list.push('christmas');
    if (tags.easter) list.push('easter');
    if (tags.eid) list.push('eidfitr', 'eidadha');
    ['diwali', 'lny', 'halloween', 'thanksgiving_us', 'thanksgiving_ca', 'bonfire', 'carnival', 'muertos', 'stpatrick', 'songkran'].forEach(function (k) { if (tags[k]) list.push(k); });
    return list;
  }

  /**
   * Returns the active event for a country, or null.
   * @param {string} code ISO country code (UG, KE, US ...)
   * @param {Date}   [now]
   */
  function resolveEvent(code, now) {
    var country = COUNTRIES[code] || COUNTRIES.UG;
    var today = todayIn(country.tz, now);
    var year = fromDay(today).y;
    var best = null;
    function consider(key, id, name, theme, pri, pal, dayNo, label) {
      if (dayNo === null || dayNo === undefined) return;
      var delta = dayNo - today; // positive = still to come
      if (delta > BEFORE_DAYS || delta < -AFTER_DAYS) return;
      var dist = Math.abs(delta);
      if (!best || dist < best.dist || (dist === best.dist && pri > best.pri)) {
        best = { id: id, key: key, name: name, label: label || name, theme: theme, pri: pri, pal: pal, day: dayNo, delta: delta, dist: dist, date: fromDay(dayNo), country: country.code };
      }
    }
    for (var y = year - 1; y <= year + 1; y++) {
      candidates(country).forEach(function (key) {
        var ev = EVENTS[key];
        var dayNo = ev.date(y);
        var label = ev.name + (key === 'newyear' ? ' ' + fromDay(dayNo).y : '');
        consider(key, key + y, ev.name, ev.theme, ev.pri, ev.pal, dayNo, label);
      });
      country.days.forEach(function (nd, i) {
        consider('national' + i, 'national' + i + y, nd[0], 'national', 5, country.flag.concat(['#45dfbd', '#7c5cff']), utcDay(y, nd[1], nd[2]), 'Happy ' + nd[0] + ', ' + country.name);
      });
    }
    return best;
  }

  function allThemes() {
    var seen = {}, out = [];
    Object.keys(EVENTS).forEach(function (k) { if (!seen[EVENTS[k].theme]) { seen[EVENTS[k].theme] = 1; out.push(k); } });
    return out;
  }

  /* ───────────── svg helpers ───────────── */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function rng(seed) {
    var h = 1779033703 ^ String(seed).length;
    for (var i = 0; i < String(seed).length; i++) { h = Math.imul(h ^ String(seed).charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    var a = h >>> 0;
    return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function f(n) { return Math.round(n * 10) / 10; }

  var SHAPES = {
    dot: function (s, c) { return '<circle r="' + f(s / 2) + '" fill="' + c + '"/>'; },
    heart: function (s, c) { var k = s / 2; return '<path d="M0 ' + f(k * .7) + 'C' + f(-k) + ' ' + f(-k * .1) + ' ' + f(-k * .7) + ' ' + f(-k * 1.1) + ' 0 ' + f(-k * .5) + 'C' + f(k * .7) + ' ' + f(-k * 1.1) + ' ' + f(k) + ' ' + f(-k * .1) + ' 0 ' + f(k * .7) + 'Z" fill="' + c + '"/>'; },
    leaf: function (s, c) { var k = s / 2; return '<path d="M0 ' + f(-k) + 'C' + f(k) + ' ' + f(-k * .4) + ' ' + f(k) + ' ' + f(k * .5) + ' 0 ' + f(k) + 'C' + f(-k) + ' ' + f(k * .5) + ' ' + f(-k) + ' ' + f(-k * .4) + ' 0 ' + f(-k) + 'Z" fill="' + c + '"/><path d="M0 ' + f(-k) + 'V' + f(k) + '" stroke="#00000033" stroke-width="1"/>'; },
    conf: function (s, c) { return '<rect x="' + f(-s / 2) + '" y="' + f(-s / 4) + '" width="' + f(s) + '" height="' + f(s / 2) + '" rx="1" fill="' + c + '"/>'; },
    star: function (s, c) { var k = s / 2, p = []; for (var i = 0; i < 10; i++) { var r = i % 2 ? k * .45 : k, a = -Math.PI / 2 + i * Math.PI / 5; p.push(f(Math.cos(a) * r) + ',' + f(Math.sin(a) * r)); } return '<polygon points="' + p.join(' ') + '" fill="' + c + '"/>'; },
    spark: function (s, c) { var k = s / 2; return '<path d="M0 ' + f(-k) + 'Q0 0 ' + f(k) + ' 0Q0 0 0 ' + f(k) + 'Q0 0 ' + f(-k) + ' 0Q0 0 0 ' + f(-k) + 'Z" fill="' + c + '"/>'; },
    drop: function (s, c) { var k = s / 2; return '<path d="M0 ' + f(-k * 1.2) + 'C' + f(k) + ' ' + f(-k * .1) + ' ' + f(k * .8) + ' ' + f(k) + ' 0 ' + f(k) + 'C' + f(-k * .8) + ' ' + f(k) + ' ' + f(-k) + ' ' + f(-k * .1) + ' 0 ' + f(-k * 1.2) + 'Z" fill="' + c + '" fill-opacity=".85"/>'; },
    clover: function (s, c) { var k = s / 3.2; return '<g fill="' + c + '"><circle cx="' + f(-k) + '" cy="0" r="' + f(k) + '"/><circle cx="' + f(k) + '" cy="0" r="' + f(k) + '"/><circle cx="0" cy="' + f(-k) + '" r="' + f(k) + '"/><circle cx="0" cy="' + f(k) + '" r="' + f(k) + '"/></g><path d="M0 0L' + f(k) + ' ' + f(k * 2.6) + '" stroke="' + c + '" stroke-width="1.6"/>'; },
    ring: function (s, c) { return '<circle r="' + f(s / 2) + '" fill="none" stroke="' + c + '" stroke-width="1.4"/>'; },
    tri: function (s, c) { var k = s / 2; return '<polygon points="0,' + f(-k) + ' ' + f(k) + ',' + f(k * .8) + ' ' + f(-k) + ',' + f(k * .8) + '" fill="none" stroke="' + c + '" stroke-width="1.4"/>'; }
  };

  // Particles drifting from y0 to y1 (falling when y1 > y0, rising when y1 < y0).
  function particles(o) {
    var r = rng(o.seed || 'p'), out = '';
    for (var i = 0; i < o.n; i++) {
      var x = o.x[0] + r() * (o.x[1] - o.x[0]);
      var s = o.size[0] + r() * (o.size[1] - o.size[0]);
      var dur = o.dur[0] + r() * (o.dur[1] - o.dur[0]);
      var dx = (r() - .5) * (o.drift || 40);
      var c = o.colors[Math.floor(r() * o.colors.length)];
      var shape = (SHAPES[o.shape] || SHAPES.dot)(s, c);
      out += '<g opacity="' + f(o.op || .9) + '"><g>' + shape +
        (o.spin ? '<animateTransform attributeName="transform" type="rotate" values="0;' + (r() > .5 ? 360 : -360) + '" dur="' + f(dur * .8) + 's" repeatCount="indefinite"/>' : '') + '</g>' +
        '<animateTransform attributeName="transform" type="translate" values="' + f(x) + ',' + o.y[0] + ';' + f(x + dx) + ',' + o.y[1] + '" dur="' + f(dur) + 's" begin="-' + f(r() * dur) + 's" repeatCount="indefinite"/>' +
        (o.fade === false ? '' : '<animate attributeName="opacity" values="0;' + f(o.op || .9) + ';' + f(o.op || .9) + ';0" keyTimes="0;.12;.8;1" dur="' + f(dur) + 's" begin="-' + f(r() * dur) + 's" repeatCount="indefinite"/>') +
        '</g>';
    }
    return out;
  }

  function twinkle(cx, cy, r, color, dur, begin) {
    return '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + r + '" fill="' + color + '"><animate attributeName="opacity" values=".25;1;.25" dur="' + dur + 's" begin="' + begin + 's" repeatCount="indefinite"/></circle>';
  }

  function swing(inner, cx, cy, deg, dur, begin) {
    return '<g><animateTransform attributeName="transform" type="rotate" values="' + (-deg) + ' ' + cx + ' ' + cy + ';' + deg + ' ' + cx + ' ' + cy + ';' + (-deg) + ' ' + cx + ' ' + cy + '" dur="' + dur + 's" begin="' + (begin || 0) + 's" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/>' + inner + '</g>';
  }

  function firework(cx, cy, r, colors, begin, seed) {
    var rg = rng(seed || 'fw'), rays = '', n = 18;
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2, c = colors[i % colors.length];
      rays += '<line x1="' + f(Math.cos(a) * r * .25) + '" y1="' + f(Math.sin(a) * r * .25) + '" x2="' + f(Math.cos(a) * r) + '" y2="' + f(Math.sin(a) * r) + '" stroke="' + c + '" stroke-width="2.2" stroke-linecap="round"/>' +
        '<circle cx="' + f(Math.cos(a) * r * 1.05) + '" cy="' + f(Math.sin(a) * r * 1.05) + '" r="' + f(1.4 + rg() * 1.4) + '" fill="' + c + '"/>';
    }
    return '<g transform="translate(' + cx + ' ' + cy + ')"><g><animateTransform attributeName="transform" type="scale" values=".05;1;1.08" keyTimes="0;.55;1" dur="2.6s" begin="' + begin + 's" repeatCount="indefinite"/>' +
      '<animate attributeName="opacity" values="0;1;.9;0" keyTimes="0;.1;.65;1" dur="2.6s" begin="' + begin + 's" repeatCount="indefinite"/>' + rays + '</g></g>';
  }

  function lantern(cx, top, colorA, colorB, begin, big) {
    var w = big ? 34 : 26, h = big ? 52 : 40;
    var body = '<line x1="' + cx + '" y1="' + (top - 22) + '" x2="' + cx + '" y2="' + top + '" stroke="#d4af37" stroke-width="1.6"/>' +
      '<rect x="' + (cx - w * .35) + '" y="' + top + '" width="' + f(w * .7) + '" height="5" rx="2" fill="#d4af37"/>' +
      '<ellipse cx="' + cx + '" cy="' + (top + 5 + h / 2) + '" rx="' + w / 2 + '" ry="' + h / 2 + '" fill="' + colorA + '"/>' +
      '<ellipse cx="' + cx + '" cy="' + (top + 5 + h / 2) + '" rx="' + f(w * .22) + '" ry="' + f(h / 2) + '" fill="' + colorB + '" fill-opacity=".55"/>' +
      '<ellipse cx="' + cx + '" cy="' + (top + 5 + h / 2) + '" rx="' + f(w * .55) + '" ry="' + f(h * .56) + '" fill="none" stroke="#ffffff" stroke-opacity=".25"/>' +
      '<rect x="' + (cx - w * .3) + '" y="' + (top + h + 3) + '" width="' + f(w * .6) + '" height="5" rx="2" fill="#d4af37"/>' +
      '<line x1="' + cx + '" y1="' + (top + h + 8) + '" x2="' + cx + '" y2="' + (top + h + 22) + '" stroke="#d4af37" stroke-width="2.2"><animate attributeName="y2" values="' + (top + h + 20) + ';' + (top + h + 25) + ';' + (top + h + 20) + '" dur="1.6s" repeatCount="indefinite"/></line>' +
      '<ellipse cx="' + cx + '" cy="' + (top + 5 + h / 2) + '" rx="' + f(w * .6) + '" ry="' + f(h * .6) + '" fill="#ffd166" fill-opacity=".18"><animate attributeName="fill-opacity" values=".1;.3;.1" dur="2.2s" repeatCount="indefinite"/></ellipse>';
    return swing(body, cx, top - 22, 7, 3.4, begin);
  }

  function crescent(cx, cy, r, id) {
    return '<mask id="' + id + '"><rect x="' + (cx - r * 2) + '" y="' + (cy - r * 2) + '" width="' + r * 4 + '" height="' + r * 4 + '" fill="#000"/><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#fff"/><circle cx="' + f(cx + r * .42) + '" cy="' + f(cy - r * .12) + '" r="' + f(r * .82) + '" fill="#000"/></mask>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(r * 1.5) + '" fill="#ffe29a" fill-opacity=".14"/><rect x="' + (cx - r * 2) + '" y="' + (cy - r * 2) + '" width="' + r * 4 + '" height="' + r * 4 + '" fill="#f6dc8b" mask="url(#' + id + ')"/>';
  }

  function tree(cx, base, scale, opts) {
    var s = scale, g = '<g transform="translate(' + cx + ' ' + base + ') scale(' + s + ')">';
    g += '<rect x="-9" y="-22" width="18" height="24" rx="3" fill="#6b3e26"/>';
    var tiers = [[-22, 118, 70], [-62, 96, 58], [-98, 74, 46], [-130, 52, 34]];
    tiers.forEach(function (t, i) {
      g += '<polygon points="0,' + (t[0] - t[1] * .72) + ' ' + t[2] + ',' + t[0] + ' ' + (-t[2]) + ',' + t[0] + '" fill="' + ['#117a4d', '#15935d', '#1aa96b', '#22bd7a'][i] + '"/>' +
        '<polygon points="0,' + (t[0] - t[1] * .72) + ' ' + (t[2] * .4) + ',' + t[0] + ' ' + (-t[2] * .4) + ',' + t[0] + '" fill="#ffffff" fill-opacity=".06"/>';
    });
    // garland + lights
    var lc = ['#ff4d6d', '#ffd166', '#4cc9f0', '#f72585', '#b8f2e6'], rg = rng('tree'), i;
    for (i = 0; i < 18; i++) {
      var tier = tiers[i % 4], px = (rg() * 2 - 1) * tier[2] * .7, py = tier[0] - rg() * tier[1] * .45;
      g += twinkle(px, py, 3.2, lc[i % lc.length], 1.2 + rg() * 1.4, -rg() * 2);
    }
    g += '<g transform="translate(0 ' + (-130 - 52 * .72 - 6) + ')"><g>' + SHAPES.star(22, '#ffd166') + '<animateTransform attributeName="transform" type="scale" values="1;1.22;1" dur="1.8s" repeatCount="indefinite"/></g></g>';
    g += '<rect x="-70" y="-14" width="30" height="22" rx="3" fill="#ef476f"/><rect x="-57" y="-14" width="4" height="22" fill="#ffd166"/><rect x="40" y="-10" width="26" height="18" rx="3" fill="#4cc9f0"/><rect x="51" y="-10" width="4" height="18" fill="#ffffff" fill-opacity=".85"/>';
    return g + '</g>';
  }

  function pumpkin(cx, cy, s, glow) {
    var g = '<g transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')">';
    g += '<ellipse cx="0" cy="0" rx="58" ry="46" fill="#ff7a00"/><ellipse cx="-26" cy="0" rx="26" ry="46" fill="#ff8f1f"/><ellipse cx="26" cy="0" rx="26" ry="46" fill="#ff8f1f"/><ellipse cx="0" cy="0" rx="16" ry="46" fill="#ff6a00"/>';
    g += '<path d="M-4 -46 Q0 -64 12 -62" stroke="#3a7d2c" stroke-width="9" fill="none" stroke-linecap="round"/>';
    g += '<g fill="#2a0f00"><polygon points="-30,-14 -14,-14 -22,-28"/><polygon points="14,-14 30,-14 22,-28"/><path d="M-30 12 L-18 24 L-9 14 L0 26 L9 14 L18 24 L30 12 L22 32 L0 38 L-22 32Z"/></g>';
    g += '<g fill="#ffd166"><polygon points="-27,-16 -17,-16 -22,-25"><animate attributeName="opacity" values=".7;1;.55;1" dur="1.4s" repeatCount="indefinite"/></polygon><polygon points="17,-16 27,-16 22,-25"><animate attributeName="opacity" values="1;.6;1;.8" dur="1.7s" repeatCount="indefinite"/></polygon></g>';
    g += '<ellipse cx="0" cy="0" rx="76" ry="62" fill="#ffb347" fill-opacity=".12"><animate attributeName="fill-opacity" values=".08;.2;.08" dur="2s" repeatCount="indefinite"/></ellipse>';
    return g + '</g>';
  }

  function bat(x, y, s, dur, begin) {
    var shape = '<path d="M0 0 C-6 -8 -16 -10 -26 -4 C-20 -2 -18 4 -13 5 C-9 2 -5 4 0 9 C5 4 9 2 13 5 C18 4 20 -2 26 -4 C16 -10 6 -8 0 0Z" fill="#150a22"/><circle cx="-2" cy="0" r="1.1" fill="#ffd166"/><circle cx="2" cy="0" r="1.1" fill="#ffd166"/>';
    return '<g><g transform="scale(' + s + ')">' + shape + '<animateTransform attributeName="transform" type="scale" values="' + s + ' ' + s + ';' + s + ' ' + f(s * .45) + ';' + s + ' ' + s + '" dur=".5s" repeatCount="indefinite" additive="replace"/></g>' +
      '<animateMotion path="M' + x + ' ' + y + ' q 80 -50 160 0 t 160 10 t 160 -20" dur="' + dur + 's" begin="' + begin + 's" repeatCount="indefinite"/></g>';
  }

  function sugarSkull(cx, cy, s) {
    return '<g transform="translate(' + cx + ' ' + cy + ')"><g transform="scale(' + s + ')"><path d="M-44 -4 C-44 -50 44 -50 44 -4 C44 18 32 26 28 40 L-28 40 C-32 26 -44 18 -44 -4Z" fill="#fff6e8"/>' +
      '<circle cx="-18" cy="-6" r="14" fill="#2b1442"/><circle cx="18" cy="-6" r="14" fill="#2b1442"/><circle cx="-18" cy="-6" r="6" fill="#ff9f1c"/><circle cx="18" cy="-6" r="6" fill="#2ec4b6"/>' +
      '<polygon points="0,6 -6,20 6,20" fill="#2b1442"/><g stroke="#2b1442" stroke-width="2.2"><line x1="-24" y1="32" x2="-24" y2="40"/><line x1="-12" y1="32" x2="-12" y2="40"/><line x1="0" y1="32" x2="0" y2="40"/><line x1="12" y1="32" x2="12" y2="40"/><line x1="24" y1="32" x2="24" y2="40"/></g>' +
      '<path d="M-36 -20 q6 -8 14 -2 M36 -20 q-6 -8 -14 -2" stroke="#b5179e" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="0" cy="-30" r="4" fill="#ff4f81"/></g>' +
      '<animateTransform attributeName="transform" type="translate" values="' + cx + ' ' + cy + ';' + cx + ' ' + (cy - 7) + ';' + cx + ' ' + cy + '" dur="3s" repeatCount="indefinite"/></g>';
  }

  function egg(cx, cy, c1, c2, begin) {
    return '<g><g transform="translate(' + cx + ' ' + cy + ')"><path d="M0 -34 C22 -34 30 -2 30 12 C30 32 16 40 0 40 C-16 40 -30 32 -30 12 C-30 -2 -22 -34 0 -34Z" fill="' + c1 + '"/>' +
      '<path d="M-29 6 q7 -9 14 0 t14 0 t14 0 t14 0" stroke="' + c2 + '" stroke-width="5" fill="none"/><path d="M-26 22 q6 8 13 0 t13 0 t13 0 t13 0" stroke="#ffffff" stroke-opacity=".7" stroke-width="4" fill="none"/>' +
      '<ellipse cx="-12" cy="-10" rx="5" ry="9" fill="#ffffff" fill-opacity=".35"/>' +
      '<animateTransform attributeName="transform" type="translate" values="' + cx + ' ' + cy + ';' + cx + ' ' + (cy - 10) + ';' + cx + ' ' + cy + '" dur="2.6s" begin="' + begin + 's" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".4 0 .6 1;.4 0 .6 1"/></g></g>';
  }

  function diya(cx, cy, begin) {
    return '<g transform="translate(' + cx + ' ' + cy + ')"><path d="M-26 0 C-22 22 22 22 26 0Z" fill="#c1440e"/><path d="M-26 0 C-12 6 12 6 26 0 C12 -6 -12 -6 -26 0Z" fill="#e85d04"/>' +
      '<ellipse cx="0" cy="-12" rx="7" ry="14" fill="#ffd166"><animate attributeName="ry" values="14;17;12;16;14" dur="1.1s" begin="' + begin + 's" repeatCount="indefinite"/><animate attributeName="rx" values="7;6;8;6.5;7" dur="1.1s" begin="' + begin + 's" repeatCount="indefinite"/></ellipse>' +
      '<ellipse cx="0" cy="-8" rx="3.4" ry="8" fill="#ff6b35"><animate attributeName="ry" values="8;10;7;9;8" dur="1.1s" begin="' + begin + 's" repeatCount="indefinite"/></ellipse>' +
      '<circle cx="0" cy="-12" r="26" fill="#ffd166" fill-opacity=".12"><animate attributeName="fill-opacity" values=".08;.22;.1" dur="1.4s" repeatCount="indefinite"/></circle></g>';
  }

  function flameShape(cx, base, s) {
    return '<g transform="translate(' + cx + ' ' + base + ') scale(' + s + ')"><path d="M0 0 C-34 0 -44 -30 -22 -56 C-18 -40 -8 -38 -8 -62 C10 -48 16 -30 8 -14 C22 -20 34 -10 34 0Z" fill="#ff5400"><animate attributeName="d" dur="1.2s" repeatCount="indefinite" values="M0 0 C-34 0 -44 -30 -22 -56 C-18 -40 -8 -38 -8 -62 C10 -48 16 -30 8 -14 C22 -20 34 -10 34 0Z;M0 0 C-38 0 -40 -34 -26 -52 C-14 -42 -10 -44 -4 -70 C14 -44 20 -26 10 -12 C24 -18 36 -8 38 0Z;M0 0 C-34 0 -44 -30 -22 -56 C-18 -40 -8 -38 -8 -62 C10 -48 16 -30 8 -14 C22 -20 34 -10 34 0Z"/></path>' +
      '<path d="M0 0 C-18 0 -22 -16 -10 -30 C-8 -20 -2 -20 0 -34 C10 -22 14 -12 8 0Z" fill="#ffd166"/></g>';
  }

  /* ───────────── themes (right-hand scene + overlay) ───────────── */
  var SCENES = {
    aurora: function (ev, pal) {
      var out = '<g transform="translate(1010 196)">';
      [[96, 0, 34, '#45dfbd'], [74, 25, 22, '#7c5cff'], [52, -20, 16, '#ff4fd8']].forEach(function (o, i) {
        out += '<ellipse rx="' + o[0] + '" ry="' + f(o[0] * .34) + '" fill="none" stroke="' + o[3] + '" stroke-opacity=".5" stroke-width="1.4" transform="rotate(' + (-18 + i * 20) + ')"/>';
      });
      out += '<circle r="26" fill="url(#orbG)"/><circle r="26" fill="none" stroke="#ffffff" stroke-opacity=".5"/>';
      [[96, 7, '#45dfbd'], [74, 5, '#7c5cff'], [52, 4, '#ff4fd8']].forEach(function (o, i) {
        out += '<g transform="rotate(' + (-18 + i * 20) + ')"><circle r="' + (o[1] - 1) + '" fill="' + o[2] + '"><animateMotion dur="' + (7 + i * 3) + 's" repeatCount="indefinite" path="M' + o[0] + ' 0 A' + o[0] + ' ' + f(o[0] * .34) + ' 0 1 1 ' + (-o[0]) + ' 0 A' + o[0] + ' ' + f(o[0] * .34) + ' 0 1 1 ' + o[0] + ' 0"/></circle></g>';
      });
      out += '</g>';
      out += particles({ seed: 'alien', n: 16, x: [820, 1150], y: [330, 40], size: [8, 16], dur: [8, 15], drift: 30, shape: 'ring', colors: ['#45dfbd', '#b79cff', '#9be7ff'], op: .55 });
      out += particles({ seed: 'alien2', n: 10, x: [820, 1150], y: [330, 40], size: [8, 14], dur: [9, 16], drift: 26, shape: 'tri', colors: ['#ff8fe3', '#b6ff5c'], op: .5, spin: true });
      return out;
    },
    christmas: function (ev, pal) {
      return tree(1010, 328, 1.05) +
        particles({ seed: 'snow', n: 46, x: [40, 1160], y: [-10, 392], size: [3, 8], dur: [7, 14], drift: 60, shape: 'dot', colors: ['#ffffff', '#dff6ff'], op: .85 });
    },
    newyear: function (ev, pal) {
      var yr = String(ev.date.y), out = '';
      out += '<text x="1010" y="236" text-anchor="middle" font-size="108" font-weight="800" fill="none" stroke="url(#ttl)" stroke-width="2.4" font-family="ui-rounded,\'SF Pro Rounded\',\'Segoe UI\',system-ui,sans-serif" opacity=".9">' + yr + '<animate attributeName="stroke-opacity" values=".6;1;.6" dur="3s" repeatCount="indefinite"/></text>';
      out += firework(930, 120, 62, ['#ffd166', '#ff4fd8', '#45dfbd'], 0, 'a') + firework(1090, 108, 54, ['#3aa0ff', '#ffd166', '#ff4f81'], 0.9, 'b') + firework(1010, 300, 50, ['#b6ff5c', '#7c5cff', '#ffd166'], 1.7, 'c');
      out += particles({ seed: 'gold', n: 34, x: [40, 1160], y: [-10, 392], size: [3, 7], dur: [6, 12], drift: 40, shape: 'conf', colors: ['#ffd166', '#ffffff', '#ff4fd8', '#45dfbd'], op: .85, spin: true });
      return out;
    },
    valentine: function (ev, pal) {
      var out = '<g transform="translate(1010 200)"><g>' + SHAPES.heart(130, '#ff4f81') + '<animateTransform attributeName="transform" type="scale" values="1;1.1;1;1.07;1" dur="1.6s" repeatCount="indefinite"/></g>' +
        '<g transform="translate(46 -48) rotate(18)">' + SHAPES.heart(54, '#ffb3c7') + '</g><g transform="translate(-52 34) rotate(-16)">' + SHAPES.heart(44, '#b4005d') + '</g></g>';
      out += particles({ seed: 'hearts', n: 26, x: [40, 1160], y: [392, -10], size: [10, 26], dur: [7, 13], drift: 50, shape: 'heart', colors: ['#ff4f81', '#ff8fb1', '#ffb3c7', '#e0245e'], op: .8 });
      return out;
    },
    halloween: function (ev, pal) {
      var out = '<circle cx="1110" cy="92" r="40" fill="#fff3c4" fill-opacity=".9"/><circle cx="1096" cy="84" r="8" fill="#e9d79a" fill-opacity=".7"/><circle cx="1120" cy="104" r="5" fill="#e9d79a" fill-opacity=".7"/><circle cx="1110" cy="92" r="70" fill="#fff3c4" fill-opacity=".1"/>';
      out += pumpkin(990, 268, 1.05) + bat(0, 120, 1, 9, 0) + bat(0, 170, .75, 12, -4) + bat(0, 90, .6, 15, -8);
      out += particles({ seed: 'embers', n: 22, x: [820, 1150], y: [340, 40], size: [3, 6], dur: [6, 12], drift: 40, shape: 'dot', colors: ['#ffb347', '#ff7a00', '#b6ff5c'], op: .7 });
      return out;
    },
    easter: function (ev, pal) {
      return egg(920, 250, '#ffb3de', '#b79cff', 0) + egg(1010, 232, '#b8f2e6', '#ff8fb1', .5) + egg(1100, 252, '#ffe29a', '#4cc9f0', 1) +
        particles({ seed: 'petal', n: 22, x: [40, 1160], y: [-10, 392], size: [8, 16], dur: [8, 15], drift: 70, shape: 'leaf', colors: ['#ffc2e2', '#fff0a8', '#c3f0ff'], op: .8, spin: true });
    },
    eid: function (ev, pal) {
      var out = crescent(1010, 150, 52, 'cr' + ev.date.m + ev.date.d) + '<g transform="translate(1058 112)">' + SHAPES.star(20, '#f6dc8b') + '</g>';
      out += lantern(900, 44, '#0f9d76', '#ffe29a', 0, true) + lantern(1120, 44, '#d4af37', '#fff3c4', -1.4, false);
      var rg = rng('eidstars'), i;
      for (i = 0; i < 26; i++) out += twinkle(820 + rg() * 340, 40 + rg() * 290, 1 + rg() * 1.6, '#fff3c4', 1.4 + rg() * 2, -rg() * 3);
      out += particles({ seed: 'gold2', n: 18, x: [820, 1150], y: [-10, 360], size: [3, 6], dur: [8, 14], drift: 30, shape: 'spark', colors: ['#f6dc8b', '#ffffff'], op: .8 });
      return out;
    },
    diwali: function (ev, pal) {
      var out = '<g transform="translate(1010 150)" opacity=".55">';
      [70, 52, 34, 18].forEach(function (r, i) { out += '<circle r="' + r + '" fill="none" stroke="' + ['#ffd166', '#ff4f81', '#ff9f1c', '#ffffff'][i] + '" stroke-width="2.4" stroke-dasharray="' + (3 + i) + ' ' + (7 - i) + '"><animateTransform attributeName="transform" type="rotate" values="0;' + (i % 2 ? -360 : 360) + '" dur="' + (24 - i * 3) + 's" repeatCount="indefinite"/></circle>'; });
      out += '</g>' + diya(900, 300, 0) + diya(1010, 308, -.4) + diya(1120, 300, -.8);
      out += particles({ seed: 'diwa', n: 36, x: [820, 1150], y: [340, 30], size: [4, 10], dur: [5, 11], drift: 40, shape: 'spark', colors: ['#ffd166', '#ff9f1c', '#ffffff', '#ff4f81'], op: .9 });
      return out;
    },
    lny: function (ev, pal) {
      var out = lantern(900, 36, '#e63946', '#ffb703', 0, true) + lantern(1010, 36, '#d62828', '#ffd166', -1, true) + lantern(1120, 36, '#e63946', '#ffb703', -2, true);
      out += firework(960, 250, 44, ['#ffd166', '#ff4d6d', '#ffffff'], 0.4, 'l1') + firework(1075, 262, 38, ['#ffb703', '#ff7a00', '#ffffff'], 1.5, 'l2');
      out += particles({ seed: 'coins', n: 22, x: [820, 1150], y: [-10, 360], size: [8, 14], dur: [7, 13], drift: 40, shape: 'dot', colors: ['#ffd166', '#ffb703'], op: .9 });
      return out;
    },
    thanksgiving: function (ev, pal) {
      return pumpkin(1010, 262, 1.1) +
        particles({ seed: 'leaves', n: 34, x: [40, 1160], y: [-10, 392], size: [12, 24], dur: [8, 15], drift: 90, shape: 'leaf', colors: ['#e36414', '#9a031e', '#fb8b24', '#ffba08', '#6a994e'], op: .9, spin: true });
    },
    bonfire: function (ev, pal) {
      return firework(930, 110, 60, ['#ff7a00', '#ffd166', '#ff3d00'], 0, 'b1') + firework(1090, 130, 52, ['#3aa0ff', '#ffd166', '#ff4f81'], 1.1, 'b2') +
        flameShape(1010, 320, 1.5) + particles({ seed: 'sparks', n: 28, x: [940, 1080], y: [320, 60], size: [3, 6], dur: [3, 7], drift: 50, shape: 'dot', colors: ['#ffd166', '#ff7a00'], op: .9 });
    },
    carnival: function (ev, pal) {
      var out = '<g transform="translate(1010 190)"><g><path d="M-80 -6 C-80 -50 80 -50 80 -6 C80 24 40 30 24 10 C14 -2 -14 -2 -24 10 C-40 30 -80 24 -80 -6Z" fill="url(#ttl)"/>' +
        '<ellipse cx="-42" cy="-6" rx="20" ry="13" fill="#10142a"/><ellipse cx="42" cy="-6" rx="20" ry="13" fill="#10142a"/>' +
        '<path d="M70 -22 q40 -40 70 -30 M74 -12 q46 -24 78 -6 M68 -32 q30 -50 60 -50" stroke="#ef476f" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-70 -24 q-40 -34 -66 -20" stroke="#06d6a0" stroke-width="5" fill="none" stroke-linecap="round"/>' +
        '<animateTransform attributeName="transform" type="rotate" values="-5;5;-5" dur="3.4s" repeatCount="indefinite"/></g></g>';
      out += particles({ seed: 'carn', n: 52, x: [40, 1160], y: [-10, 392], size: [5, 11], dur: [5, 11], drift: 90, shape: 'conf', colors: ['#ffd166', '#06d6a0', '#ef476f', '#118ab2', '#b5179e'], op: .95, spin: true });
      return out;
    },
    muertos: function (ev, pal) {
      return sugarSkull(1010, 190, 1.35) +
        particles({ seed: 'marigold', n: 30, x: [40, 1160], y: [-10, 392], size: [10, 18], dur: [8, 15], drift: 70, shape: 'dot', colors: ['#ff9f1c', '#ffbf69', '#ff7b00', '#ffd166'], op: .9, spin: true }) +
        particles({ seed: 'mgl2', n: 14, x: [820, 1150], y: [360, 30], size: [5, 9], dur: [7, 13], drift: 30, shape: 'spark', colors: ['#2ec4b6', '#ffffff'], op: .8 });
    },
    stpatrick: function (ev, pal) {
      var out = '<g transform="translate(1010 190)"><g>' + SHAPES.clover(150, '#1b9e4b') + '<animateTransform attributeName="transform" type="rotate" values="-6;6;-6" dur="4s" repeatCount="indefinite"/></g></g>';
      out += particles({ seed: 'clover', n: 24, x: [40, 1160], y: [-10, 392], size: [12, 26], dur: [8, 15], drift: 70, shape: 'clover', colors: ['#34c759', '#7bd88f', '#1b9e4b', '#ffd166'], op: .85, spin: true });
      return out;
    },
    songkran: function (ev, pal) {
      var out = '';
      [0, 1.1, 2.2].forEach(function (b, i) { out += '<circle cx="' + (900 + i * 110) + '" cy="260" r="8" fill="none" stroke="#9be7ff" stroke-width="2"><animate attributeName="r" values="8;54" dur="3.3s" begin="' + b + 's" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="3.3s" begin="' + b + 's" repeatCount="indefinite"/></circle>'; });
      out += '<g transform="translate(1010 160)"><g>' + SHAPES.drop(120, '#3aa0ff') + '<animateTransform attributeName="transform" type="translate" values="0 -6;0 8;0 -6" dur="2.6s" repeatCount="indefinite"/></g></g>';
      out += particles({ seed: 'drops', n: 38, x: [40, 1160], y: [-10, 392], size: [8, 18], dur: [3.5, 8], drift: 20, shape: 'drop', colors: ['#9be7ff', '#3aa0ff', '#ffffff', '#45dfbd'], op: .85 });
      return out;
    },
    national: function (ev, pal, country) {
      var flag = (country && country.flag) || pal.slice(0, 3), out = '';
      var pts = [], i;
      out += '<path d="M820 70 Q1010 150 1180 66" stroke="#ffffff" stroke-opacity=".7" stroke-width="1.6" fill="none"/>';
      for (i = 0; i < 9; i++) {
        var t = (i + .5) / 9, x = 820 + t * 360, y = 70 + (1 - Math.pow(2 * t - 1, 2)) * 56 - 0;
        out += '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><polygon points="-13,0 13,0 0,34" fill="' + flag[i % 3] + '" stroke="#ffffff" stroke-opacity=".35"><animateTransform attributeName="transform" type="rotate" values="-6 0 0;6 0 0;-6 0 0" dur="' + (2 + (i % 3) * .5) + 's" begin="-' + i * .3 + 's" repeatCount="indefinite"/></polygon></g>';
      }
      [0, 1, 2].forEach(function (k) {
        out += '<path d="M830 ' + (240 + k * 22) + ' q45 -26 90 0 t90 0 t90 0 t90 0" stroke="' + flag[k] + '" stroke-width="14" fill="none" stroke-linecap="round" stroke-opacity=".92"><animate attributeName="d" dur="3.2s" begin="-' + k * .6 + 's" repeatCount="indefinite" values="M830 ' + (240 + k * 22) + ' q45 -26 90 0 t90 0 t90 0 t90 0;M830 ' + (240 + k * 22) + ' q45 26 90 0 t90 0 t90 0 t90 0;M830 ' + (240 + k * 22) + ' q45 -26 90 0 t90 0 t90 0 t90 0"/></path>';
      });
      out += particles({ seed: 'natl', n: 44, x: [40, 1160], y: [-10, 392], size: [5, 11], dur: [5, 11], drift: 90, shape: 'conf', colors: flag.concat(['#ffffff']), op: .95, spin: true });
      return out;
    }
  };

  /* ───────────── base banner ───────────── */
  var W = 1200, H = 380;
  var CSS_FONT = "ui-rounded,'SF Pro Rounded','Segoe UI Variable Display','Segoe UI',system-ui,-apple-system,Roboto,sans-serif";

  function blobsDefs(pal) {
    // five soft colour blobs that drift behind the glass
    var spots = [[220, 120, 190], [520, 300, 210], [820, 90, 180], [1040, 280, 200], [380, 340, 150]];
    var out = '<g id="blobs">';
    spots.forEach(function (s, i) {
      var c = pal[i % pal.length], dx = (i % 2 ? 70 : -60), dy = (i % 3 ? -40 : 46);
      out += '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="' + c + '" fill-opacity=".85"><animateTransform attributeName="transform" type="translate" values="0 0;' + dx + ' ' + dy + ';' + (-dx / 2) + ' ' + (-dy / 2) + ';0 0" dur="' + (16 + i * 3) + 's" repeatCount="indefinite" calcMode="spline" keyTimes="0;.35;.7;1" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1"/></circle>';
    });
    return out + '</g>';
  }

  function eLogo(cx, cy) {
    // "E" drawn from rounded bars so it renders the same everywhere
    return '<g transform="translate(' + cx + ' ' + cy + ')" fill="#ffffff"><rect x="-17" y="-26" width="9" height="52" rx="4.5"/><rect x="-17" y="-26" width="34" height="9" rx="4.5"/><rect x="-17" y="-4.5" width="26" height="9" rx="4.5"/><rect x="-17" y="17" width="34" height="9" rx="4.5"/></g>';
  }

  function waveLine(y, color, op, begin) {
    var a = 'M270 ' + y + ' q22 -14 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0';
    var b = 'M270 ' + y + ' q22 14 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0';
    var c = 'M270 ' + y + ' q22 -6 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0';
    return '<path d="' + a + '" fill="none" stroke="' + color + '" stroke-width="2.4" stroke-linecap="round" stroke-opacity="' + op + '"><animate attributeName="d" values="' + a + ';' + b + ';' + c + ';' + a + '" dur="4.4s" begin="' + begin + 's" repeatCount="indefinite"/></path>';
  }

  function chip(x, y, label, w) {
    return '<g transform="translate(' + x + ' ' + y + ')"><rect width="' + w + '" height="34" rx="17" fill="#ffffff" fill-opacity=".1" stroke="#ffffff" stroke-opacity=".32"/>' +
      '<text x="' + w / 2 + '" y="22.5" text-anchor="middle" font-size="15.5" font-weight="650" fill="#ffffff" fill-opacity=".92" font-family="' + CSS_FONT + '">' + esc(label) + '</text></g>';
  }

  /**
   * @param {object} o { code, now, version, commands, theme (force a theme key for galleries) }
   * @returns {{svg:string, event:object|null}}
   */
  function render(o) {
    o = o || {};
    var code = o.code && COUNTRIES[o.code] ? o.code : 'UG';
    var country = COUNTRIES[code];
    var event = o.noEvent ? null : (o.forceEvent || resolveEvent(code, o.now));
    var pal = event ? event.pal : ['#45dfbd', '#7c5cff', '#ff4fd8', '#3aa0ff', '#b6ff5c'];
    var scene = event ? (SCENES[event.theme] || SCENES.aurora) : SCENES.aurora;
    var version = o.version || 'v10', commands = o.commands || '600+ commands';
    var label = event ? event.label : null;

    var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="Echo, the WhatsApp bot that feels alive' + (label ? ' - ' + esc(label) : '') + '">';
    s += '<title>Echo - the WhatsApp bot that feels alive' + (label ? ' - ' + esc(label) : '') + '</title>';
    s += '<defs>' +
      '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#070a16"/><stop offset=".55" stop-color="#0b1022"/><stop offset="1" stop-color="#05070f"/></linearGradient>' +
      '<linearGradient id="ttl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="' + pal[0] + '"/><stop offset="1" stop-color="' + pal[1] + '"/></linearGradient>' +
      '<linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".75"/><stop offset=".35" stop-color="#ffffff" stop-opacity=".08"/><stop offset=".7" stop-color="#ffffff" stop-opacity=".06"/><stop offset="1" stop-color="#ffffff" stop-opacity=".4"/></linearGradient>' +
      '<linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".26"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".16"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>' +
      '<radialGradient id="orbG" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".28" stop-color="' + pal[0] + '"/><stop offset=".7" stop-color="' + pal[1] + '"/><stop offset="1" stop-color="' + pal[2] + '"/></radialGradient>' +
      '<filter id="blurOut" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="26"/></filter>' +
      '<filter id="blurIn" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="46"/><feColorMatrix type="saturate" values="1.55"/></filter>' +
      '<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .07 0"/></filter>' +
      '<clipPath id="glassClip"><rect x="34" y="34" width="1132" height="312" rx="44"/></clipPath>' +
      '<clipPath id="all"><rect width="' + W + '" height="' + H + '" rx="28"/></clipPath>' +
      blobsDefs(pal) + '</defs>';

    s += '<g clip-path="url(#all)"><rect width="' + W + '" height="' + H + '" fill="url(#bg)"/>';
    s += '<g filter="url(#blurOut)"><use href="#blobs"/></g>';
    // the glass: a more blurred, more saturated copy of the blobs, clipped to the panel
    s += '<g clip-path="url(#glassClip)"><g filter="url(#blurIn)"><use href="#blobs"/></g><rect x="34" y="34" width="1132" height="312" fill="#0b1022" fill-opacity=".34"/><rect x="34" y="34" width="1132" height="312" fill="#ffffff" fill-opacity=".07"/>' +
      '<rect x="34" y="34" width="1132" height="312" filter="url(#grain)"/><rect x="34" y="34" width="1132" height="104" fill="url(#hl)"/>' +
      '<rect x="-220" y="20" width="200" height="340" fill="url(#beam)" transform="skewX(-18)"><animateTransform attributeName="transform" type="translate" values="0 0;1500 0" dur="7.5s" repeatCount="indefinite" additive="sum"/></rect></g>';
    s += '<rect x="34.75" y="34.75" width="1130.5" height="310.5" rx="43.5" fill="none" stroke="url(#gl)" stroke-width="1.5"/>';

    // scene (decoration or alien orbit) sits on the glass
    s += '<g>' + scene(event || { date: { y: 0, m: 0, d: 0 } }, pal, country) + '</g>';

    // logo orb
    s += '<g transform="translate(152 190)"><circle r="92" fill="' + pal[0] + '" fill-opacity=".14" filter="url(#glow)"/>' +
      '<circle r="70" fill="url(#orbG)" stroke="#ffffff" stroke-opacity=".55" stroke-width="1.4"/>' +
      '<circle r="84" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="1.4" stroke-dasharray="3 9"><animateTransform attributeName="transform" type="rotate" values="0;360" dur="26s" repeatCount="indefinite"/></circle>' +
      '<g><circle r="5.5" cx="84" cy="0" fill="#ffffff"><animate attributeName="opacity" values="1;.5;1" dur="2s" repeatCount="indefinite"/></circle><animateTransform attributeName="transform" type="rotate" values="0;360" dur="9s" repeatCount="indefinite"/></g>' +
      '<g><circle r="3.5" cx="-84" cy="0" fill="' + pal[3] + '"/><animateTransform attributeName="transform" type="rotate" values="360;0" dur="14s" repeatCount="indefinite"/></g>' +
      '<g><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4s" repeatCount="indefinite"/>' + eLogo(0, 0) + '</g></g>';

    // title block
    s += '<text x="268" y="176" font-size="104" font-weight="800" letter-spacing="8" fill="url(#ttl)" font-family="' + CSS_FONT + '">ECHO</text>';
    s += '<text x="272" y="216" font-size="25" font-weight="500" fill="#ffffff" fill-opacity=".84" font-family="' + CSS_FONT + '">The WhatsApp bot that feels alive.</text>';
    s += chip(270, 244, version, 70) + chip(352, 244, commands, 158) + chip(522, 244, '24/7 online', 128) + chip(662, 244, 'Built on Baileys', 164);
    s += waveLine(316, pal[0], .9, 0) + waveLine(316, pal[2], .55, -1.2);

    // event pill
    if (label) {
      var pw = Math.min(520, Math.max(190, label.length * 10.4 + 56));
      s += '<g transform="translate(' + (1140 - pw) + ' 52)"><rect width="' + f(pw) + '" height="38" rx="19" fill="#ffffff" fill-opacity=".14" stroke="#ffffff" stroke-opacity=".4"/><circle cx="20" cy="19" r="5" fill="' + pal[0] + '"><animate attributeName="opacity" values="1;.35;1" dur="1.6s" repeatCount="indefinite"/></circle>' +
        '<text x="' + f(pw / 2 + 8) + '" y="25" text-anchor="middle" font-size="17" font-weight="650" fill="#ffffff" font-family="' + CSS_FONT + '">' + esc(label) + '</text></g>';
    }
    s += '</g></svg>';
    return { svg: s, event: event };
  }

  return {
    render: render, resolveEvent: resolveEvent, detectCountry: detectCountry, COUNTRIES: COUNTRIES, EVENTS: EVENTS,
    themes: Object.keys(SCENES), allThemes: allThemes, easterDay: easterDay, islamicDays: islamicDays, todayIn: todayIn,
    BEFORE_DAYS: BEFORE_DAYS, AFTER_DAYS: AFTER_DAYS
  };
});
