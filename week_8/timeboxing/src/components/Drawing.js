import React from 'react';
import '../styles/components/Drawing.scss';
import Canvas from './Canvas';

class Drawing extends React.Component {
     constructor(props) {
          super(props);
          this.canvasRef = React.createRef();
     }
     componentDidMount() {
          this.drawCanvas();
     }
     componentDidUpdate() {
          this.drawCanvas();
     }
     drawCanvas = () => {
          const canvas = this.canvasRef.current;
          const ctx = canvas.getContext("2d");
          const img = new Image();
          let imgSrc = "https://66.media.tumblr.com/e043dc9a8349104908563f81258dcbc0/tumblr_oujs8owAkm1wx1shbo1_500.jpg";
          img.src = imgSrc;
          img.onload = () => {
               ctx.drawImage(img, 0, 0, 300, 300);
          }
     }

     render() {
          return (
               <div className='Drawing'>
                    <Canvas 
                         borderRadius = {10}
                         borderSize= {20}
                         ref={this.canvasRef}
                    />
               </div>
          )
     }
}

export default Drawing;