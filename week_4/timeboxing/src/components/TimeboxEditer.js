import React from 'react';

class TimeboxEditer extends React.Component {
   state = {
      title: this.props.title,
      totalTimeInMinutes: this.props.totalTimeInMinutes
   }
   handleTitleOnChange = (event) => {
      console.log(event.target.value)
      this.setState({ title: event.target.value });
   }
   handleTimeOnChange = (event) => {
      console.log(event.target.value)
      this.setState({ totalTimeInMinutes: event.target.value });
   }
   handleSubmitForm = (event) => {
      event.preventDefault();
      this.props.onEdit(this.props.index, { id: uuid.v4(), title: this.state.title, totalTimeInMinutes: this.state.totalTimeInMinutes });
   }
   render() {
      const { index, title, totalTimeInMinutes, onEdit, isEdit, handleIsEdit } = this.props;
      return (
         <div className={`TimeboxEditer ${isEdit ? '' : 'unactive'}`}>
            <form onSubmit={this.handleSubmitForm}>
               <label>Zadanie: <input type="text" onChange={this.handleTitleOnChange} defaultValue={title} /></label>
               <label>min: <input type="number" onChange={this.handleTimeOnChange} defaultValue={totalTimeInMinutes} /></label>
               <button type="submit">edytuj</button>
               <button onClick={handleIsEdit}>anuluj</button>
            </form>
         </div>
      )
   }
}

export default TimeboxEditer;