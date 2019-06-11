import React, { Component } from 'react';
import toRoman from './toRoman.js';
class RomanConverter extends Component {
     state = {
          roman: null
     }

     handleChange = (event) => {
          const arabic = event.target.value;
          return this.setState({ roman: toRoman(arabic) });
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

export default RomanConverter;