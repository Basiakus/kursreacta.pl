import React from 'react';
import Timebox from '../../components/Timebox.js';
import { render, cleanup, fireEvent } from '@testing-library/react';
describe('<Timebox />', () => {
     afterEach(() => {
          cleanup()
     })

     it('1. find all EDIT button', () => {
          let {getByText, getAllByText, gueryAllByText, findAllByText, getByLabel } = render(<Timebox />);
          getAllByText(/Edit/);
     });
     xit('2. check Edit buttons on CLICK', () => {
          let { getByText, getAllByText, findAllByText, getByLabel } = render(<Timebox />);
          fireEvent.click(getAllByText(/Edit/));
     });
     xit('3. Find INPUT with LABEL text "Zadanie:" in <TimeboxEditer />', () => {
          let {getByLabelText } = render(<Timebox />);
          getByLabelText('Zadanie:');
     });
     it('4. Check LABEL text "Zadanie:" on change value', () => {
          let { getByLabelText } = render(<Timebox />);
          const input = getByLabelText('Zadanie:');
          fireEvent.change(input, {target: {value: "testing!!!"}});
     });
     it('5. accept change by pressing edytuj in <TimeboxEditer />', () => {
          let {getAllByText, getByText } = render(<Timebox />);
          getAllByText('edytuj');
          fireEvent.click(getByText('edytuj'));
     });
     it('6. Chek if title of <Timebox /> has changed', () => {
          let {debug, getAllByText, getByText } = render(<Timebox />);
          debug(getAllByText(/Zadanie:/))
     });
});