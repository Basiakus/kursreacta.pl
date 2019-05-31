import { fizzBuzz } from '../../lib/tests.js';

describe('Test fizzBuzz function', () => {
     describe('a number divisible by 3', () => {
          test('for 3 have return Buzz', () => {
               expect(fizzBuzz(3)).toBe('Fizz');
          })
     });
     describe('a number divisible by 5', () => {
          test('for 5 have return Fizz', () => {
               expect(fizzBuzz(5)).toBe('Buzz');
          });
     });
     describe('a number not divisible by 5 and 3', () => {
          test('for 7 have return 7', () => {
               expect(fizzBuzz(7)).toBe(7);
          });
     });
});