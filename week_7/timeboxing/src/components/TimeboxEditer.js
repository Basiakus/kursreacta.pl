import React from 'react';
import uuid from 'uuid';
import classNames from 'classnames';
import '../styles/components/TimeboxEditer.scss';

class TimeboxEditer extends React.Component {
   state = {
      "title": this.props.title,
      "totalTimeInMinutes": this.props.totalTimeInMinutes,
      "flag": this.props.flag
   }
   handleTitleOnChange = (event) => {
      //console.log(event.target.value)
      this.setState({ title: event.target.value });
   }
   handleTimeOnChange = (event) => {
      const value = Number(event.target.value);
      //console.log(typeof value);
      this.setState({ totalTimeInMinutes: value });
   }
   handleFlagOnChange = (event) => {
      //console.log(event.target.value)
      this.setState({ flag: event.target.value });
   }
   handleSubmitForm = (event) => {
      event.preventDefault();
      this.props.onEdit(this.props.index, { id: uuid.v4(), title: this.state.title, totalTimeInMinutes: this.state.totalTimeInMinutes, flag: this.state.flag });
   }
   render() {
      const { title, totalTimeInMinutes, isEdit, handleIsEdit, flag } = this.props;
      let timeboxEditerClasses = classNames(
         "TimeboxEditer",
         {
            'unactive': !isEdit,
            "TimeboxEditer--blue": flag === "blue",
            "TimeboxEditer--yellow": flag === "yellow",
            "TimeboxEditer--red": flag === "red"
         }
      );
      return (
         <div className={timeboxEditerClasses}>
            <form onSubmit={this.handleSubmitForm}>
               <label>
                  Zadanie: 
                  <input type="text" onChange={this.handleTitleOnChange} defaultValue={title} />
               </label>
               <label>
                  min: 
                  <input type="number" onChange={this.handleTimeOnChange} defaultValue={totalTimeInMinutes} />
               </label>
               <label> 
                  kolor?
                  <select defaultValue={this.state.flag} onChange={this.handleFlagOnChange}>
                     <option value="blue">niebieski</option>
                     <option value="yellow">żółty</option>
                     <option value="red">czerwony</option>
                  </select>
               </label>
               <button type="submit">edytuj</button>
               <button onClick={handleIsEdit}>anuluj</button>
            </form>
         </div>
      )
   }
}

export default TimeboxEditer;