import React from 'react';
import '../styles/components/Clock.scss';

function Clock({ hours = 0, minutes = 0, seconds = 0, miliseconds = 0}) {
   const msConverter = (miliseconds) => {
      miliseconds = miliseconds / 10;
      return miliseconds < 10 ? `0${miliseconds}` : miliseconds;
   }
   const secConverter = (seconds) => {
      if (seconds < 0) {
         return '00';
      } else if (seconds < 10) {
         return `0${seconds}`
      } else if (seconds >= 10 && seconds < 60) {
         return `${seconds}`
      } else if (seconds >= 60) {
         return '59'
      }
   }
   const minConverter = (minutes) => {
      if (minutes < 0) {
         return '00';
      } else if (minutes < 10) {
         return `0${minutes}`
      } else if (minutes >= 10 && minutes < 60) {
         return `${minutes}`
      } else if (minutes >= 60) {
         return '59'
      }
   }
   const hConverter = (hours) => {
      if (hours < 0) {
         return '00';
      } else if (hours < 10) {
         return `0${hours}`
      } else if (hours >= 10 && hours < 24) {
         return `${hours}`
      } else if (hours >= 24) {
         return '23';
      }
   }
   return (
      <h2 className={`Clock`}>
      Pozostało: 
         <span className={`Clock__part`}>{hConverter(hours)}</span>
         <span className={`Clock__part Clock__part--blue`}>:</span>
         <span className={`Clock__part Clock__part--green`}>{minConverter(minutes)}</span>
         <span className={`Clock__part Clock__part--blue`}>:</span>
         <span className={`Clock__part Clock__part--green`}>{secConverter(seconds)}</span>
         <span className={`Clock__part Clock__part--blue`}>.</span>
         <span className={`Clock__part Clock__part--red`}>{msConverter(miliseconds)}</span>
      </h2>
   )
}

export default Clock;