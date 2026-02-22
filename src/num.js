export function getRandomNumber(digits, return_type) {
    const available = Array.from({length: 10}, (_, i) => i);
    let result = '';
    for (let i = 0; i < digits; i++) {
        const idx = Math.floor(Math.random() * available.length);
        result += available[idx];
        available.splice(idx, 1);
    }
    if (return_type === 'string') return result;
    return parseInt(result, 10);
}
export function getDigits(number) {
    if (typeof number === 'number') number = number.toString();
    return number.split('');
}