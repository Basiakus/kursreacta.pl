import React, { useRef } from 'react';
//import uuid from 'uuid';
import '../styles/components/TimeboxCreator.scss';
import classNames from 'classnames';

function TimeboxEditor({ onUpdate, inicialTitle, inicialTotalTimeInMinutes, onCancel, inicialFlag }) {

     let timeboxEditorClasses = classNames(
          "TimeboxCreator",
          {
               "TimeboxCreator--blue": inicialFlag === "blue",
               "TimeboxCreator--yellow": inicialFlag === "yellow",
               "TimeboxCreator--red": inicialFlag === "red"
          }
     );

     const formRef = useRef();

     const handleSubmit = (event) => {
          event.preventDefault();
          onUpdate({
               //"id": uuid.v4(),
               "title": formRef.current[0].value === "" ? "brak" : formRef.current[0].value,
               "totalTimeInMinutes": formRef.current[1].value === null ? 0 : Number(formRef.current[1].value),
               "flag": formRef.current[2].value
          });
     }
     return (
          <form onSubmit={handleSubmit} className={timeboxEditorClasses} ref={formRef}>
               <label>
                    Co robisz?
               <input type="text" defaultValue={inicialTitle}/>
                    </label>
                    <br />
                    <label>
                         Ile minut?
               <input type="number" defaultValue={inicialTotalTimeInMinutes}/>
                    </label>
                    <br />
                    <label> kolor?
               <select defaultValue={inicialFlag}>
                    <option value="blue">niebieski</option>
                    <option value="yellow">żółty</option>
                    <option value="red">czerwony</option>
               </select>
               </label>
               <br />
               <button href="#" onClick={() => onCancel()}>Anuluj</button>
               <button >zapisz zmiany</button>
          </form>
     )
}

export default TimeboxEditor;