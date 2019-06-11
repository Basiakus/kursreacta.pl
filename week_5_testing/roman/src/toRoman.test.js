import toRoman from './toRoman.js';
import React from 'react';

describe('toRoman()', () => {
     it.each([
          [1, "I"],
          [10, 'X'],
          [50, 'L'],
          [100, 'C'],
          [500, 'D'],
          [1000, 'M'],
          [2019, 'MMXIX']
     ])('convert %d to %s', (arabic, roman) => {
          expect(toRoman(arabic)).toEqual(roman);
     })
});