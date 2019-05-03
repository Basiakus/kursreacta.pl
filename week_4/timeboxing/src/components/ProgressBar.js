import React from 'react';
import '../styles/components/ProgressBar.scss';

function ProgressBar({ percent = 0, trackRemaining, colorGreen, colorOrangered}) {
   return (
      <div
         className={`ProgressBar ProgressBar--big ProgressBar--green`}
         style={{
            background: (trackRemaining ?
               `linear-gradient(${colorGreen}, ${colorGreen}) right /${percent}% no-repeat content-box` :
               `linear-gradient(${colorGreen}, ${colorGreen}) left /${percent}% no-repeat content-box`
            )
         }}
      >
      </div>
   )
}

export default ProgressBar;