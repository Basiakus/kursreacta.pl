import React from 'react';
import classNames from 'classnames';
import '../styles/components/Clock.scss';

function Clock({ 
      hours = 0, 
      minutes = 0, 
      seconds = 0, 
      miliseconds = 0, 
      className="", 
      hoursColor="", 
      minutesColor="", 
      secondsColor="", 
      milisecondsColor="", 
      separatorColor=""
}) {
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
   let hoursColorClassNames = classNames(
      className,
      "Clock__part",
      {"Clock__part--red": hoursColor === "red",
      "Clock__part--green": hoursColor === "green",
      "Clock__part--blue": hoursColor === "blue"}
   );
   let minutesColorClassNames = classNames(
      className,
      "Clock__part",
      {
         "Clock__part--red": minutesColor === "red",
         "Clock__part--green": minutesColor === "green",
         "Clock__part--blue": minutesColor === "blue"
      }
   );
   let secondsColorClassNames = classNames(
      className,
      "Clock__part",
      {
         "Clock__part--red": secondsColor === "red" ,
         "Clock__part--green": secondsColor === "green" ,
         "Clock__part--blue": secondsColor === "blue"
      }
   );
   let milisecondsColorClassNames = classNames(
      className,
      "Clock__part",
      {
         "Clock__part--red": milisecondsColor === "red",
         "Clock__part--green": milisecondsColor === "green",
         "Clock__part--blue": milisecondsColor === "blue"
      }
   );
   let separatorColorClassNames = classNames(
      className,
      "Clock__part",
      {
         "Clock__part--red": separatorColor === "red",
         "Clock__part--green": separatorColor === "green",
         "Clock__part--blue": separatorColor === "blue"
      }
   );

   return (
      <h2 className={`Clock`}>
         <span>Pozostało:</span>
         <span className={hoursColorClassNames}>{hConverter(hours)}</span>
         <span className={separatorColorClassNames}>:</span>
         <span className={minutesColorClassNames}>{minConverter(minutes)}</span>
         <span className={separatorColorClassNames}>:</span>
         <span className={secondsColorClassNames}>{secConverter(seconds)}</span>
         <span className={separatorColorClassNames}>.</span>
         <span className={milisecondsColorClassNames}>{msConverter(miliseconds)}</span>
      </h2>
   )
}

export default Clock;