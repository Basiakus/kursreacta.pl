import React from 'react';
import classNames from 'classnames';
import '../styles/components/Clock.scss';
import PropTypes from 'prop-types';


const numberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const correctSrtingColorValue = function(props, propName, componentName ) {
   const propToCheck = props[propName];
   if (propToCheck !== 'red' && propToCheck !== 'black' && propToCheck !== 'blue' && propToCheck !== 'green') {
         return new Error(`niewłaściwy prop ${propName} w komponencie ${componentName}. Opcjonalne wartości to: "black", "green", "blue", "red"`);
      }
}

Clock.propTypes = {
   hours: numberOrStringType.isRequired,
   minutes: numberOrStringType.isRequired,
   seconds: numberOrStringType.isRequired,
   miliseconds: numberOrStringType.isRequired,
   className: PropTypes.string.isRequired,
   hoursColor: correctSrtingColorValue,
   minutesColor: correctSrtingColorValue,
   secondsColor: correctSrtingColorValue,
   milisecondsColor: correctSrtingColorValue,
   separatorColor: correctSrtingColorValue
}

Clock.defaultProps = {
   className: ""
}

function Clock({ 
      hours, 
      minutes, 
      seconds, 
      miliseconds, 
      className, 
      hoursColor, 
      minutesColor, 
      secondsColor, 
      milisecondsColor, 
      separatorColor
}) {
   //throw new Error('Clock is demage');
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
      {
         "Clock__part--red": hoursColor === "red",
         "Clock__part--green": hoursColor === "green",
         "Clock__part--blue": hoursColor === "blue",
         "Clock__part--black": hoursColor === "black"

   }
   );
   let minutesColorClassNames = classNames(
      className,
      "Clock__part",
      {
         "Clock__part--red": minutesColor === "red",
         "Clock__part--green": minutesColor === "green",
         "Clock__part--blue": minutesColor === "blue",
         "Clock__part--black": minutesColor === "black"
      }
   );
   let secondsColorClassNames = classNames(
      className,
      "Clock__part",
      {
         "Clock__part--red": secondsColor === "red" ,
         "Clock__part--green": secondsColor === "green" ,
         "Clock__part--blue": secondsColor === "blue",
         "Clock__part--black": secondsColor === "black"
      }
   );
   let milisecondsColorClassNames = classNames(
      className,
      "Clock__part",
      {
         "Clock__part--red": milisecondsColor === "red",
         "Clock__part--green": milisecondsColor === "green",
         "Clock__part--blue": milisecondsColor === "blue",
         "Clock__part--black": milisecondsColor === "black"
      }
   );
   let separatorColorClassNames = classNames(
      className,
      "Clock__part",
      {
         "Clock__part--red": separatorColor === "red",
         "Clock__part--green": separatorColor === "green",
         "Clock__part--blue": separatorColor === "blue",
         "Clock__part--black": separatorColor === "black"
      }
   );

   return (
      <h2 className={`Clock`}>
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