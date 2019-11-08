import React from 'react';
//import uuid from 'uuid';
import '../styles/components/LoginForm.scss';

class LoginForm extends React.Component {
     constructor(props) {
          super(props);
          this.emailRef = React.createRef();
          this.passwordRef = React.createRef();
     }
     handleSubmit = (event) => {
          event.preventDefault();
          this.props.onLoginAttempt({
               "email": this.emailRef.current.value,
               "password": this.passwordRef.current.value
          });
          this.emailRef.current.value ='podaj swój email';
          this.passwordRef.current.value ='';
     }
     render() {
          return (
               <form className='LoginForm' onSubmit={this.handleSubmit}>
                    {
                         this.props.errorMessage ? <div className="LoginForm__errorMessage">{this.props.errorMessage}</div> : null
                    }
                    <label>
                         email
               <input type="text" ref={this.emailRef} defaultValue={"basiakus@gmail.com"}/>
                    </label>
                    <br />
                    <label>
                         hasło
               <input type="password" ref={this.passwordRef} defaultValue={"myPassword"} />
                    </label>
                    <br />
                    <button >Zaloguj się</button>
               </form>
          )
     }
}

export default LoginForm;