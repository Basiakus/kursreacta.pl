import React from 'react';
import uuid from 'uuid';

class TimeboxCreator extends React.Component {
   constructor(props) {
      super(props);
      this.formRef = React.createRef();
   }
   handleSubmit = (event) => {
      event.preventDefault();
      //console.log(this.formRef.current[0]) 
      this.props.onCreate({
         id: uuid.v4(),
         title: this.formRef.current[0].value === "" ? "brak" : this.formRef.current[0].value,
         totalTimeInMinutes: this.formRef.current[1].value === '' ? 0 : this.formRef.current[1].value
      });
   }
   render() {
      return (
         <form onSubmit={this.handleSubmit} className='TimeboxCreator' ref={this.formRef}>
            <label>Co robisz?<input type="text" /></label><br />
            <label>Ile minut?<input type="number" /></label><br />
            <button >Dodaj Timebox</button>
         </form>
      )
   }
}

export default TimeboxCreator;