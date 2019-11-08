import React from 'react';
import TimeboxList from './TimeboxList'; 
import EditableTimebox from './EditableTimebox'; 
import LoginForm from './LoginForm';
import Error from './Error';
import '../styles/components/App.scss';
import fetchAudenticationApi from '../api/fetchAudenticationApi';
import jwt from "jsonwebtoken";

class App extends React.Component {

   state = {
      accessToken: null,
      previusAttemptloginFailed: false
   }

   isUserLogIn = () => {
      console.log(this.state.accessToken)
      return this.state.accessToken;
   }
   getLogedEmail = () => {
      return jwt.decode(this.state.accessToken).email;
   }
   handleLogout = () => {
      this.setState({
         accessToken: null,
         previusAttemptloginFailed: false
      })
   }
   handleLoginAttempt = (credencials) => {
      console.log(credencials)
      fetchAudenticationApi.login(credencials)
      .then(({accessToken}) => {
         this.setState({
            accessToken,
            previusAttemptloginFailed: false
         })
      })
      .catch(() => {
         this.setState({
            previusAttemptloginFailed: true
         })
      })
   }
   render() {
      return (
         <React.StrictMode>
            <Error message="Wystąpił błąd w aplikacji">
               
               {this.isUserLogIn() ?
                  <>
                  <header className="Header">
                     {`witaj ${this.getLogedEmail()}`}
                     <a className="Header__logout" href="#" onClick={this.handleLogout}>wyloguj</a>
                  </header>
                  <div className="App">
                     <Error message="Wystąpił błąd w TimeboxList">
                        <TimeboxList />
                     </Error>
                     <Error message="Wystąpił błąd w EditableTimebox">
                        <EditableTimebox />
                     </Error>
                  </div>
               </> :
                  <LoginForm 
                     errorMessage={this.state.previusAttemptloginFailed ? "nie udało sie zalogować" : null}
                     onLoginAttempt={this.handleLoginAttempt}
                  />
               }
            </Error>
         </React.StrictMode>
      )
   }
}
   

export default App;
