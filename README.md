# She's a 10, but...

A party game for one shared phone, based on the "She's a 10, but..." trend. No accounts, server, ads or analytics. Works offline and can be installed as an app.

## Modes

- **Rate It**: always starts at "She's a 10, but..." followed by a flaw. The group argues, then scrolls the score wheel to their new score and locks it in.
- **Guess the Number**: one player looks away. The others see a set number (e.g. "She's an 8"), with no flaw, and give hints. The guesser scrolls the wheel to their guess.

## Features

- 176 built-in "buts" in 9 categories (Funny, Red flags, Gross, Spicy, Food, School, Chaotic, Wholesome, Tech). Pick the ones you want, like in Would You Rather
- She's / He's / They're toggle
- Score scale: tick boxes to add 0 (really bad) and 11 (really good)
- Sound effects, vibration (Android) and volume in Settings, same as Imposter

## Run locally

```sh
python3 -m http.server 8000
node tests/logic.test.js
```

## Files

- `index.html`: game and styles
- `logic.js`: pronouns, picking, scoring
- `questions.js`: the "buts", written for this project
