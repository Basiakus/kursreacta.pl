import React from 'react';
import '../styles/components/TimeboxEditor.scss';

function TimeboxEditor(props) {
   const {
      title,
      totalTimeInMinutes,
      handleTitleOnChange,
      handleTotalTimeInMinutesOnChange,
      handleStart,
      isEditable,
      onConfirm
   } = props;
   prettyDir = () => {
      console.log(this.state);
   }
   return (
      <div className={`TimeboxEditor ${isEditable ? '' : 'inactive'}`}>
         <label>Co robisz?<input type="text" onChange={handleTitleOnChange} value={title} disabled={!isEditable} /></label><br />
         <label>Ile minut?<input type="number" onChange={handleTotalTimeInMinutesOnChange} value={totalTimeInMinutes} disabled={!isEditable} /></label><br />
         <button onClick={this.prettyDir} disabled={!isEditable} >log</button>
         <button onClick={onConfirm} disabled={!isEditable}>Zatwierdź zmiany</button>
      </div>
   )
}

export default TimeboxEditor;