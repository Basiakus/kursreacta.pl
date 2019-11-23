import React from 'react';

const Canvas = React.forwardRef(({ borderRadius, borderSize, width = 300, height = 300}, ref) => {
     return (
          <>
               <canvas
                    ref={ref}
                    width={width}
                    height={height}
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