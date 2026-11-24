const assert = require('assert');
const L = require('../logic.js');
global.window = undefined;
require('../questions.js');
const D = globalThis.GAME_DATA;

assert.strictEqual(L.render('%s [chew/chews] with %p mouth open', 'she'), 'she chews with her mouth open');
assert.strictEqual(L.render('%s [chew/chews] with %p mouth open', 'they'), 'they chew with their mouth open');
assert.strictEqual(L.render('%s [make/makes] it about %self', 'he'), 'he makes it about himself');
assert.strictEqual(L.render('%s [are/is] rude', 'they'), 'they are rude');
assert.strictEqual(L.render('%s [are/is] rude', 'she'), 'she is rude');
assert.strictEqual(L.render('{s} [laugh/laughs] at {p} own jokes', 'she'), 'she laughs at her own jokes');
assert.strictEqual(L.guessPoints(5, 5), 3);
assert.strictEqual(L.guessPoints(5, 6), 1);
assert.strictEqual(L.guessPoints(2, 8), 0);

const all = L.pool(D, Object.keys(D));
assert(all.length >= 170);
for (const t of all) {
  for (const k of ['she', 'he', 'they']) {
    const r = L.render(t.tpl, k);
    assert(!/%[a-z]|[{}\[\]]/.test(r), 'leftover token: ' + r);
  }
  for (let i = 0; i < 20; i++) {
    const s = L.startFor(t.delta, Math.random);
    const f = L.clamp(s + t.delta, 0, 10);
    assert(s >= 0 && s <= 10 && f >= 0 && f <= 10);
  }
}
const seen = new Set();
const ids = new Set();
for (let i = 0; i < all.length; i++) ids.add(L.pick(all, seen, Math.random).id);
assert.strictEqual(ids.size, all.length, 'every item seen once before repeating');
assert.strictEqual(L.aNum(8), 'an 8');
assert.strictEqual(L.aNum(10), 'a 10');
assert.strictEqual(L.RATE_START, 10);
const fl = L.flaws(L.pool(D, Object.keys(D)));
assert(fl.length > 0 && fl.every(t => t.delta < 0), 'Rate It only uses flaws');
assert.deepStrictEqual(L.scale(false, false), [1,2,3,4,5,6,7,8,9,10]);
assert.deepStrictEqual(L.scale(true, true), [0,1,2,3,4,5,6,7,8,9,10,11]);
assert.deepStrictEqual(L.scale(true, false)[0], 0);
assert.deepStrictEqual(L.scale(false, true).slice(-1), [11]);
console.log('ok', all.length, 'traits');
