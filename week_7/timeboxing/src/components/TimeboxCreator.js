import React from 'react';
//import uuid from 'uuid';
import '../styles/components/TimeboxCreator.scss';

class TimeboxCreator extends React.Component {
   constructor(props) {
      super(props);
      this.formRef = React.createRef();
   }
   handleSubmit = (event) => {
      event.preventDefault();
      this.props.onCreate({
         //"id": uuid.v4(),
         "title": this.formRef.current[0].value === "" ? "brak" : this.formRef.current[0].value,
         "totalTimeInMinutes": this.formRef.current[1].value === null ? 0 : Number(this.formRef.current[1].value),
         "flag": this.formRef.current[2].value
      });
      //this.formRef.current[0].value = "wpisz zadanie";
      //this.formRef.current[1].value = 3;
      //this.formRef.current[2].value = 'blue';
   }
   render() {
      return (
         <form onSubmit={this.handleSubmit} className='TimeboxCreator' ref={this.formRef}>
            <label>
               Co robisz?
               <input type="text" />
            </label>
            <br />
            <label>
               Ile minut?
               <input type="number" />
            </label>
            <br />
            <label> kolor?
               <select>
                  <option value="blue">niebieski</option>
                  <option value="yellow">żółty</option>
                  <option value="red">czerwony</option>
               </select>
            </label>
            <br />
            <button >Dodaj Timebox</button>
         </form>
      )
   }
}

export default TimeboxCreator;