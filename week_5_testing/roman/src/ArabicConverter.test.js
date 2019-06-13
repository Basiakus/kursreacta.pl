import { cleanup, render, fireEvent } from '@testing-library/react';
import React from 'react';
import ArabicConverter from './ArabicConverter';
describe('<ArabicConverter />', () => {
     afterEach(cleanup);
     it("render a component", () => {
          render(<ArabicConverter />)
     })
     it('input with label text "Roman"', () => {
          const { getByLabelText } = render(<ArabicConverter />);
          expect(() => {
               getByLabelText(/roman/i);
          }).not.toThrow();
     });
     it('default value of roman number is "none"', () => {
          const { getByText } = render(<ArabicConverter />);
          expect(() => {
               getByText(/roman: none/);
          })
     });
     it('if roman value is set on "I", get arabic value 1', () => {
          const { getByLabelText, getByText } = render(<ArabicConverter />);
          fireEvent.change(getByLabelText(/roman/i), {target: { value: "I" } });
          expect(() => {
               getByText("Arabic: 1");
          }).not.toThrow();
     });
     it('if input value dont contain a aroman number give a "please write only roman numbers" ', () => {
          const { getByLabelText, getByText } = render(<ArabicConverter />);
          fireEvent.change(getByLabelText(/roman/i), { target: { value: "A" } });
          expect(() => {
               getByText(/please write only roman numbers/);
          }).not.toThrow();
     });
});