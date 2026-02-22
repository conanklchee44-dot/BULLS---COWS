 export function getRandomNumber(digits, return_type) {
    const DIGITS = 10 ** (digits);
    let NUMBER = Math.floor(Math.random() * DIGITS);
    if (return_type === 'string') NUMBER = NUMBER.toString().padStart(digits, '0');
    return NUMBER;
} 
export function getDigits(number) {
    if (typeof number === 'number') number = number.toString();
    return number.split('');
}