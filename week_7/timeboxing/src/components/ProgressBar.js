import React from 'react';
import classNames from 'classnames';
//import '../styles/components/ProgressBar.scss';


const correctSrtingColorValue = function (props, propName, componentName) {
   const propToCheck = props[propName];
   if (propToCheck !== 'red' && propToCheck !== 'blue' && propToCheck !== 'green') {
      return new Error(`niewłaściwy prop ${propName} w komponencie ${componentName}. Opcjonalne wartości to: "green", "blue", "red"`);
   }
}
const correctPercentValue = function (props, propName, componentName) {
   const propToCheck = props[propName];
   if (propToCheck < 0 || propToCheck > 100 || propToCheck === undefined || propToCheck === null) {
      return new Error(`niewłaściwy prop ${propName} w komponencie ${componentName}. Powinien on akceptować tylko liczby, których wartości są pomiędzy 0 a 100. Nie powinien akceptować ani null ani undefined.`);
   }
}

ProgressBar.propTypes = {
   barColor: correctSrtingColorValue,
   percent: correctPercentValue
}

function ProgressBar({ percent, trackRemaining, barColor, borderBlue, isBig, className}) {
   //`ProgressBar ProgressBar--big ProgressBar--borderBlue`
   let progressBarClassNames = classNames(
      "ProgressBar",
      className,
      {
         "ProgressBar--big": isBig,
         "ProgressBar--borderBlue": borderBlue
      }
   );
   return (
      <div
         className={progressBarClassNames}
         style={{
            background: (trackRemaining ?
               `linear-gradient(${barColor}, ${barColor}) right /${percent}% no-repeat content-box` :
               `linear-gradient(${barColor}, ${barColor}) left /${percent}% no-repeat content-box`
            )
         }}
      >
      </div>
   )
}

export default ProgressBar;