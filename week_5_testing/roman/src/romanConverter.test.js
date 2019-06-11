import React from 'react';
import toRoman from './toRoman.js';
import { cleanup, render, fireEvent } from '@testing-library/react';
import RomanConverter from './RomanConverter';


describe('<RomanConverter />', () => {
     afterEach(cleanup);
     it('render <RomanConverter />', () => {
          render(<RomanConverter />)
     });
     it('check if is a input', () => {
          const { getByLabelText } = render(<RomanConverter />);
          expect(() => {
               getByLabelText(/arabic/i)
          }).not.toThrow();
     });
     it('By default no shows roman number', () => {
          const { getByText } = render(<RomanConverter />);
          expect(() => {
               getByText('Roman: none')
          }).not.toThrow();
     });
     it('Convert arabic "1" to roman "I"', () => {
          const { getByText, getByLabelText } = render(<RomanConverter />);
          fireEvent.change(getByLabelText(/arabic/i), { target: { value: '1' } });
          expect(() => {
               getByText("Roman: I");
          }).not.toThrow();
     });
     it('Convert arabic "5" to roman "V"', () => {
          const { getByText, getByLabelText } = render(<RomanConverter />);
          fireEvent.change(getByLabelText(/arabic/i), { target: { value: "5" } });
          expect(() => {
               getByText("Roman: V");
          }).not.toThrow();
     });
     it('Convert arabic "10" to roman "X"', () => {
          const { getByText, getByLabelText } = render(<RomanConverter />);
          fireEvent.change(getByLabelText(/arabic/i), { target: { value: "10" } });
          expect(() => {
               getByText("Roman: X");
          }).not.toThrow();
     });
});