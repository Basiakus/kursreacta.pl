import React, { useRef } from 'react';
//import uuid from 'uuid';
import '../styles/components/TimeboxCreator.scss';

function TimeboxCreator({onCreate}) {

   const formRef = useRef();

   const handleSubmit = (event) => {
      event.preventDefault();
      onCreate({
         //"id": uuid.v4(),
         "title": formRef.current[0].value === "" ? "brak" : formRef.current[0].value,
         "totalTimeInMinutes": formRef.current[1].value === null ? 0 : Number(formRef.current[1].value),
         "flag": formRef.current[2].value
      });
      formRef.current[0].value = "";
      formRef.current[1].value = null;
   }
   return (
      <form onSubmit={handleSubmit} className='TimeboxCreator' ref={formRef}>
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

export default TimeboxCreator;

///week 7 editable Timebox