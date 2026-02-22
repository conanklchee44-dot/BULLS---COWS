export function aiSolve(secret, onGuess) {
    let possible = [];
    for (let i = 0; i < 10000; i++) {
        let s = i.toString().padStart(4, '0');
        if (new Set(s).size === 4) possible.push(s);
    }
    let tries = 0;

    function getBullsAndCows(secret, guess) {
        let bulls = 0, cows = 0;
        for (let i = 0; i < secret.length; i++) {
            if (guess[i] === secret[i]) bulls++;
            else if (secret.includes(guess[i])) cows++;
        }
        return { bulls, cows };
    }

    function filterPossible(possible, guess, bulls, cows) {
        return possible.filter(code => {
            const res = getBullsAndCows(code, guess);
            return res.bulls === bulls && res.cows === cows;
        });
    }

    function step() {
        if (possible.length === 0) return;
        const guess = possible[0];
        const { bulls, cows } = getBullsAndCows(secret, guess);
        tries++;
        onGuess(guess, bulls, cows, tries);
        if (bulls === 4) {
            onGuess(`AI solved in ${tries} tries!`, 4, 0, tries);
            return;
        }
        possible = filterPossible(possible, guess, bulls, cows);
        setTimeout(step, 300);
    }
    step();
}
