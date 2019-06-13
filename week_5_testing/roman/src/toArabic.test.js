import toArabic from './toArabic.js';

describe('toArabic()', () => {
     it.each([
          [1, 'I'],
          [5, 'V'],
          [9, 'IX'],
          [50, 'L'],
          [100, 'C'],
          [1000, 'M'],
          [2019, 'MMXIX']
     ])('convert arabic %d to %s as a roman number', (arabic, roman) => {
          expect(toArabic(roman)).toEqual(arabic);
     })
});