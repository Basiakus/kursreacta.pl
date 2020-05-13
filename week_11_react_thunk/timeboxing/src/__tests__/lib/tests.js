import { fizzBuzz, fib, xxx } from '../../lib/tests.js';

describe('Test fizzBuzz function', () => {
     describe('a number divisible by 3', () => {
          it('for 3 have return Buzz', () => {
               expect(fizzBuzz(3)).toBe('Fizz');
          })
     });
     describe('a number divisible by 5', () => {
          it('for 5 have return Fizz', () => {
               expect(fizzBuzz(5)).toBe('Buzz');
          });
     });
     describe('a number not divisible by 5 and 3', () => {
          it('for 7 have return 7', () => {
               expect(fizzBuzz(7)).toBe(7);
          });
     });
});

describe('Test fib function', () => {
     describe('for values maximum to 9', () => {
          it('for 2 have return 1', () => {
               expect(fib(2)).toBe(1)
          });
          it('for 3 have return 2', () => {
               expect(fib(3)).toBe(2)
          });
          it('for 4 have return 3', () => {
               expect(fib(4)).toBe(3)
          });
          it('for 5 have return 5', () => {
               expect(fib(5)).toBe(5)
          });
          it('for 6 have return 8', () => {
               expect(fib(6)).toBe(8)
          });
     });
});

describe('Test xxx function', () => {
     describe('return reverse string', () => {
          it('for "abc" have return "cba"', () => {
               expect(xxx('abc')).toBe('cba')
          });
          it('for "Adam" have return "madA"', () => {
               expect(xxx('Adam')).toBe('madA')
          });
     });
});