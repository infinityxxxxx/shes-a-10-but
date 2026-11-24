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

  const api = { PRON, render, clamp, pool, startFor, pick, guessPoints };
  if (typeof module !== 'undefined') module.exports = api; else g.GameLogic = api;
})(typeof window !== 'undefined' ? window : globalThis);
