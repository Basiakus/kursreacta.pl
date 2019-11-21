import React from 'react';

const Button = ({ backgroundColor, children }) => {
     return (
          <button style={{backgroundColor}}>{children}</button>
     )
}
export default Button;