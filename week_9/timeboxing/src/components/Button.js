import React from 'react';

const Button = React.forwardRef(({ backgroundColor, children, onClick }, ref) => {
     return <button onClick={onClick} ref={ref} style={{ backgroundColor }}>{children}</button>
})

export default Button;