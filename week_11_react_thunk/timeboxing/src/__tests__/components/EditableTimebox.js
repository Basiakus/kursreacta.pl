import React from 'react';
import EditableTimebox from '../../components/EditableTimebox.js';
import { render, cleanup, fireEvent } from '@testing-library/react';
describe('<EditableTimebox />', () => {
     afterEach(() => {
          cleanup();
     })
     it('looking for button width text "Edytuj"', () => {
          let { debug, getByText } = render(<EditableTimebox />);
          //debug();
          expect(()=> {
               getByText('Edytuj');
          }).not.toThrow;
     });
     it('check if component is editable', () => {
          let { debug, getByText } = render(<EditableTimebox />);
          fireEvent.click(getByText("Zatwierdź zmiany"));
          fireEvent.click(getByText("Start"));
          debug(getByText("Pauzuj"));
          fireEvent.click(getByText("Pauzuj"))
          debug(getByText("Wznów"));
          fireEvent.click(getByText("Wznów"));
          debug(getByText("Edytuj"));
          fireEvent.click(getByText("Edytuj"));
          debug(getByText("Zatwierdź zmiany"));
          fireEvent.click(getByText("Zatwierdź zmiany"));
     });
});