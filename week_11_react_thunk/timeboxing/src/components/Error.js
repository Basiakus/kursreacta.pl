import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage.js'

class Error extends Component {
     state = {
          hasError: false
     }

     static getDerivedStateFromError(error) {
          // Update state so the next render will show the fallback UI.
          return { hasError: true };
     }
     componentDidCatch(error, info) {
          // You can also log the error to an error reporting service
          console.log('wystąpił błąd:', error, info);
     }
     render() {
          const { message, children } = this.props;
          const { hasError } = this.state;
          return (
               <ErrorMessage message={message} hasError={hasError} children={children}/>
          )
     }
}

export default Error;