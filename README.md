# She's a 10, but...

A party game for one shared phone, based on the "She's a 10, but..." trend. No accounts, server, ads or analytics. Works offline and can be installed as an app.

## Modes

- **Rate It**: always starts at "She's a 10, but..." followed by a flaw. The group argues the new score, then tap to see the official verdict.
- **Guess the Number**: one player looks away. The others see a set number (e.g. "She's an 8"), with no flaw, and give hints. The guesser picks the number. Exact = 3 points, one off = 1. Add player names to keep score.

## Features

- 176 built-in "buts" in 9 categories (Funny, Red flags, Gross, Spicy, Food, School, Chaotic, Wholesome, Tech). Pick the ones you want, like in Would You Rather
- She's / He's / They're toggle

## Run locally

```sh
python3 -m http.server 8000
node tests/logic.test.js
```

## Files

- `index.html`: game and styles
- `logic.js`: pronouns, picking, scoring
- `questions.js`: the "buts", written for this project
