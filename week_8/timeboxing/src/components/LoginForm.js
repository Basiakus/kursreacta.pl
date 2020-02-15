import React, { useRef } from 'react';
//import uuid from 'uuid';
import '../styles/components/LoginForm.scss';

function LoginForm({ errorMessage, onLoginAttempt}) {

     const emailRef = useRef();
     const passwordRef = useRef();
     
     const handleSubmit = (event) => {
          event.preventDefault();
          onLoginAttempt({
               "email": emailRef.current.value,
               "password": passwordRef.current.value
          });
          emailRef.current.value ='podaj swój email';
          passwordRef.current.value ='';
     }
     return (
          <form className='LoginForm' onSubmit={handleSubmit}>
               {
                    errorMessage ? <div className="LoginForm__errorMessage">{errorMessage}</div> : null
               }
               <label>
                    email
          <input type="text" ref={emailRef} defaultValue={"basiakus@gmail.com"}/>
               </label>
               <br />
               <label>
                    hasło
          <input type="password" ref={passwordRef} defaultValue={"myPassword"} />
               </label>
               <br />
               <button >Zaloguj się</button>
          </form>
     )
}

export default LoginForm;