import addRoman from './addRoman';

describe('addRoman', () => {
     it('add I + X = XI', () => {
          expect(addRoman("I", "X")).toEqual('XI');
     });
     it('add L + XLIX = XCIX', () => {
          expect(addRoman("L", "XLIX")).toEqual('XCIX');
     });
});