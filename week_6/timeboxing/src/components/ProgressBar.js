import React from 'react';
import classNames from 'classnames';
//import '../styles/components/ProgressBar.scss';

function ProgressBar({ percent = 0, trackRemaining, barColor, borderBlue, isBig, className}) {
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