import React, { Component } from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';

class RomanConverter extends Component {
     state = {
          roman: null
     }

     handleChange = (event) => {
          const arabic = event.target.value;
          let roman = 'alala';
          if( arabic == 1 ) {
               roman = 'I'
          } else if ( arabic == 5 ) {
               roman = 'V'
          } else if ( arabic == 10 ) {
               roman = "X"
          }
          return this.setState({ roman });
     }
     render() {
          return (
               <div>
                    <label>Arabic: <input type="number" onChange={this.handleChange}></input></label>
                    <h1>Roman: {this.state.roman ? this.state.roman : 'none'}</h1>
               </div>
          )
     }
}


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
          fireEvent.change(getByLabelText(/arabic/i), { target: { value: "1" } });
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