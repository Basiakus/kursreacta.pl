import React from 'react';
import '../styles/components/Canvas.scss';

class Canvas extends React.Component {
     constructor(props) {
          super(props);
          this.canvasRef = React.createRef();
          this.imgRef = React.createRef();
     }
     componentDidMount() {
          this.drawCanvas();
     }
     drawCanvas = () => {
          const canvas = this.canvasRef.current;
          const img = this.imgRef.current;
          const ctx = canvas.getContext("2d");
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 15
          ctx.stroke();
          console.log(img);
          img.onload = () => {
               ctx.drawImage(img, 0, 0);
          }
     }

     render() {
          return (
               <div className='Canvas'>
                    <canvas 
                         ref={this.canvasRef} 
                         width={300} 
                         height={300} 
                         style={
                              {border: '3px solid black'},
                              {borderRadius: '20px'}
               }   
          />
                    <img 
                         className='Canvas__hidden_img'
                         alt='zonk'
                         ref={this.imgRef}
                         src="https://66.media.tumblr.com/e043dc9a8349104908563f81258dcbc0/tumblr_oujs8owAkm1wx1shbo1_500.jpg"
                    />
               </div>
          )
     }
}

export default Canvas;