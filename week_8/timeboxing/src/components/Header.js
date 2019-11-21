import React from 'react';
import Button from './Button';


class Header extends React.Component {
     constructor(props) {
          super(props);
     }
     render() {
          return (
               <>
                    <h1>header</h1>
                    <Button backgroundColor={"lightBlue"}>
                         button 1
                    </Button>
               </>
          )
     }

}

export default Header;