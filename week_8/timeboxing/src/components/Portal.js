import { Component } from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.getElementById('portal');

class Portal extends Component {
     constructor(props) {
          super(props);
          this.element = document.createElement('div');
     }
     componentDidMount() {
          portalRoot.appendChild(this.element);
     }

     componentWillUnmount() {
          portalRoot.removeChild(this.element);
     }
     
     
     render() {
          return (
               ReactDOM.createPortal(
                    this.props.children,
                    portalRoot
               )
          )
     }
}

export default Portal;