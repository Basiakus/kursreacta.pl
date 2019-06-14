import { exportAllDeclaration } from "@babel/types";
import { getMinutesAndSecondsFromDuractionInSeconds } from '../../lib/time.js';

describe('getMinutesAndSecondsFromDuractionInSeconds', ()=> {
     describe('less than 1 minutes', () => {
          it('for 3 return 0 minutes and 3 seconds', function () {
               expect(getMinutesAndSecondsFromDuractionInSeconds(0, 3)).toEqual([0, 3]);
          })
          it('for 59 return 0 minutes and 59 seconds', function () {
               expect(getMinutesAndSecondsFromDuractionInSeconds(0, 59)).toEqual([0, 59]);
          })
     });
     describe('less than 1 hour', () => {
          it('for 130 return 2 minutes and 10 seconds', function () {
               expect(getMinutesAndSecondsFromDuractionInSeconds(0, 130)).toEqual([2, 10]);
          })
          it('for 3500 return 58 minutes and 10 seconds', function () {
               expect(getMinutesAndSecondsFromDuractionInSeconds(0, 3500)).toEqual([58, 20]);
          })
     });
})