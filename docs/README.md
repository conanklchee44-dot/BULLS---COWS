# Bulls & Cows Game

## Overview
This project is a web-based implementation of the classic Bulls & Cows game. It features two modes:
- Normal mode: You guess the computer's secret number.
- AI Solve mode: You pick a number, and the AI tries to solve it.

## Folder Structure
- `src/` — Main source files (HTML, JS, CSS)
- `assets/` — Game assets (sprites, fonts, audio)
- `docs/` — Documentation

## Code Explanation

### game.html
Defines the layout and UI for the game. Includes:
- Title bar
- Main game area
- Stats and turn stats containers
- Difficulty and mode selection
- Modal for AI Solve mode

### styles.css
Contains all styling for the pixel-art UI, using CSS variables for theme colors and font. Ensures consistent look for all containers, buttons, and text.

### script.js
Handles game logic and UI interactions:
- User guessing mode: Handles form submission, updates guesses, bulls, and cows.
- AI Solve mode: Shows modal, accepts user input, and calls the AI algorithm.
- Mode switching: Visually indicates active mode.
- Resets game state as needed.

### algorithm.js
Exports the AI solving function. The AI uses a fast elimination strategy:
- Maintains a list of possible codes
- Filters after each guess based on feedback
- Guesses from remaining possibilities until solved

## How to Play
- In "You" mode, enter guesses to find the computer's secret number.
- In "AI Solve" mode, enter your own secret number and watch the AI try to solve it.

## Customization
- Change theme colors in styles.css via CSS variables.
- Improve the AI algorithm in algorithm.js for more advanced strategies.

## Credits
- Pixel font: Minecraftia
- Sprites: Custom or open source

## License
MIT License
