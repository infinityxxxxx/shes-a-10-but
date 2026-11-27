(function (g) {
  const PRON = {
    she:  { s: 'she',  o: 'her',  p: 'her',   pp: 'hers',   self: 'herself',   verb: 1, label: "She's",  short: 'She' },
    he:   { s: 'he',   o: 'him',  p: 'his',   pp: 'his',    self: 'himself',   verb: 1, label: "He's",   short: 'He' },
    they: { s: 'they', o: 'them', p: 'their', pp: 'theirs', self: 'themself',  verb: 0, label: "They're", short: 'They' }
  };

  // Turn a trait template into text for one pronoun set.
  function render(tpl, key) {
    const P = PRON[key] || PRON.she;
    return tpl
      .replace(/\[([^\]\/]*)\/([^\]]*)\]/g, (_, a, b) => (P.verb ? b : a))
      .replace(/(%|\{)self\}?/g, P.self)
      .replace(/(%|\{)pp\}?/g, P.pp)
      .replace(/(%|\{)p\}?/g, P.p)
      .replace(/(%|\{)o\}?/g, P.o)
      .replace(/(%|\{)s\}?/g, P.s);
  }

  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

  // Flat list of {id, cat, delta, tpl} for the picked categories.
  function pool(data, cats) {
    const out = [];
    for (const c of cats) {
      const d = data[c];
      if (!d) continue;
      d.traits.forEach((t, i) => out.push({ id: c + ':' + i, cat: c, delta: t[0], tpl: t[1] }));
    }
    return out;
  }

  // Starting number that keeps the final score inside 0..10.
  function startFor(delta, rnd) {
    const lo = delta > 0 ? 3 : 6;
    const hi = delta > 0 ? 7 : 10;
    return lo + Math.floor(rnd() * (hi - lo + 1));
  }

  // Pick an unseen item first; reset when all were seen.
  function pick(items, seen, rnd) {
    let fresh = items.filter(i => !seen.has(i.id));
    if (!fresh.length) { seen.clear(); fresh = items; }
    const it = fresh[Math.floor(rnd() * fresh.length)];
    seen.add(it.id);
    return it;
  }

  // Guess-the-number points: exact 3, one off 1, else 0.
  function guessPoints(guess, answer) {
    const d = Math.abs(guess - answer);
    return d === 0 ? 3 : d === 1 ? 1 : 0;
  }

  // "a" or "an" before a number: "an 8", "a 10".
  const aNum = n => (n === 8 || n === 11 || n === 18 ? 'an ' : 'a ') + n;

  // Rate It always opens at 10 and only uses flaws (negative traits).
  const RATE_START = 10;
  const flaws = items => items.filter(i => i.delta < 0);

  // Numbers on the score wheel: 1..10, plus 0 and/or 11 when ticked.
  function scale(zero, eleven) {
    const out = [];
    for (let i = zero ? 0 : 1; i <= (eleven ? 11 : 10); i++) out.push(i);
    return out;
  }

  // Rate It reaction lines, by the score the group gives (0..11).
  const NOTES = [
    ['Run. Do not look back.', 'Absolutely not. Ever.', 'Delete the number.', 'Call the authorities.', 'Worst of all time.'],
    ['Yikes.', 'A walking red flag.', 'Not even as a joke.', 'That is a disaster.', 'Block and move on.'],
    ['Oof, that hurts.', 'Hard pass.', 'The ick is permanent.', 'Yeah... no.'],
    ['Rough. Really rough.', 'Only if the world is ending.', 'That flaw did damage.', 'Big yikes energy.'],
    ['Below average, sorry.', 'Not looking good.', 'Could be worse. Barely.', 'You can do better.'],
    ['Mid.', 'Perfectly... okay.', 'Kinda mid, not gonna lie.', 'Coin flip.', 'Meh.'],
    ['Slightly above mid.', 'There is some potential.', 'Not bad, not great.', 'One more chance.'],
    ['Pretty solid!', 'We can work with that.', 'Respectable.', 'Green-ish flag.'],
    ['Really good!', 'Worth it.', 'Barely even a problem.', 'That is a keeper.'],
    ['Wow, that is awesome!', 'Almost perfect.', 'Elite behavior.', 'Wife or husband material.'],
    ['Still a 10. Not a dealbreaker.', 'Flaw? What flaw?', 'Flawless. No notes.', 'Lock this one down.'],
    ['GOAT.', 'Greatest of all time.', 'Best person ever.', 'The flaw made it better.', 'Marry immediately.']
  ];
  const noteFor = (n, seen, rnd) => pick(NOTES[n].map(text => ({ id: text, text })), seen, rnd).text;

  const api = { PRON, render, clamp, pool, startFor, pick, guessPoints, aNum, RATE_START, flaws, scale, NOTES, noteFor };
  if (typeof module !== 'undefined') module.exports = api; else g.GameLogic = api;
})(typeof window !== 'undefined' ? window : globalThis);
