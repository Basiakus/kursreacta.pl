import React, { Component } from 'react';
import toArabic from './toArabic.js';

export default class ArabicConverter extends Component {
     state = {
          arabicValue: "none"
     }
     handleChange = (e) => {
          const userValue = (e.target.value);
          return this.setState({ arabicValue: toArabic(userValue)});
     }
     render() {
          return (
               <div>
                    <label>Roman: <input type="text" onChange={this.handleChange}></input></label>
                    <h1>Arabic: {this.state.arabicValue}</h1>
               </div>
          )
     }
}
