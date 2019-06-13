import toArabic from "./toArabic.js";
import toRoman from './toRoman';

const addRoman = (a, b) => {
    const sum = toArabic(a) + toArabic(b);
    return toRoman(sum);
}

export default addRoman