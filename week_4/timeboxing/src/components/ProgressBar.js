import React from 'react';
import '../styles/components/ProgressBar.scss';

function ProgressBar({ percent = 0, trackRemaining, className }) {
   return (
      <div
         className={`ProgressBar ${className}`}
         style={{
            background: (trackRemaining ?
               `linear-gradient(orangered, orangered) right /${percent}% no-repeat content-box` :
               `linear-gradient(orangered, orangered) left /${percent}% no-repeat content-box`
            )
         }}
      >
      </div>
   )
}

export default ProgressBar;