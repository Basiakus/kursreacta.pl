import React from 'react';

const Canvas = React.forwardRef(({ borderRadius, borderSize}, ref) => {
     return (
          <>
               <canvas
                    ref={ref}
                    width={300}
                    height={300}
                    style={
                         {
                              border: `${borderSize}px solid black`,
                              borderRadius: `${borderRadius}px` 
                         }
                    }
               />
          </>
     )
})

export default Canvas;