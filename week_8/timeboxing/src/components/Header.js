import React from 'react';
import Button from './Button';
import Drawing from './Drawing';

class Header extends React.Component {
     constructor(props) {
          super(props);
          this.ButtonOneRef = React.createRef();
          this.ButtonTwoRef = React.createRef();
     }
     handleButtonOne = () => {
          this.ButtonTwoRef.current.focus()
     }
     handleButtonTwo = () => {
          this.ButtonOneRef.current.focus()
     }

     render() {
          return (
               <>
                    <h1>header</h1>
                    <Button onClick={this.handleButtonOne} ref={this.ButtonOneRef} backgroundColor="lightBlue">
                         button 1
                    </Button>
                    <Button onClick={this.handleButtonTwo} ref={this.ButtonTwoRef} backgroundColor="lightYellow">
                         button 2
                    </Button>
                    <Drawing />
               </>
          )
     }

}

export default Header;