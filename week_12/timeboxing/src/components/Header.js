import React from 'react';

//import Button from './Button'; week 8 lesson 2
//import Drawing from './Drawing'; week 8 lesson 2

/* class Header extends React.Component {
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
} */  //week 8 lesson 2

const Header = ({children}) => {
     if (React.Children.count(children) < 1) {
          throw new Error('header has to have at least one child');
     }
     return (
          <header className="Header" id='userGreetings'>
               {children}
          </header>
     )
}

export default Header;