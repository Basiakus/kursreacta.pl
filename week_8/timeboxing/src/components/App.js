import React from 'react';
import Header from './Header';
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
      previusAttemptloginFailed: false,
      expireTime: null
   }

   isUserLogIn = () => {
      return this.state.accessToken;
   }
   getLogedEmail = () => {
      return jwt.decode(this.state.accessToken).email;
   }
   handleLogout = () => {
      localStorage.clear();
      this.setState({
         accessToken: null,
         previusAttemptloginFailed: false,
         expireTime: null,
      });
      clearTimeout(this.setCoundownLogout);
      clearInterval(this.setCoundownInterval);
      console.log('clear timeout and interval');
   }
   setDataToLocalstorage = (key, value) => {
      const myStorage = window.localStorage;
      return myStorage.setItem(key, value);
   }
   getDataFromLocalStorage = (dataKey) => {
      const myStorage = window.localStorage;
      return myStorage.getItem(dataKey);
   }
   removeDataFromLocalStorage = (dataKey) => {
      const myStorage = window.localStorage;
      return myStorage.removeItem(dataKey);
   }
   handleLoginAttempt = (credencials) => {
      fetchAudenticationApi.login(credencials)
      .then(({accessToken}) => {
         this.setState({
            accessToken,
            previusAttemptloginFailed: false,
         })
      })
         .then(() => this.setDataToLocalstorage("accessToken", this.state.accessToken))
         .then(() => this.setCoundownLogout(3000))
         .then(() => this.setCoundownInterval())
      .catch(() => {
         this.setState({
            previusAttemptloginFailed: true,
         })
      })
   }
   setCoundownInterval = () => {
      this.intervalTime = window.setInterval(() => {
         let newSecondToLogOut = this.getDataFromLocalStorage("expireTime");
         if (newSecondToLogOut <= 0) clearInterval(this.intervalTime);
         let currentTime = newSecondToLogOut - 1; 
         //console.clear();
         //console.log(`pozostało ${currentTime}s. do wylogowania sesji`);
         this.setDataToLocalstorage("expireTime", currentTime);
      }, 1000)
   }
   setCoundownLogout = (time) => {
      this.setDataToLocalstorage("expireTime", time);
      this.timeoutTime = window.setTimeout(() => {
         this.setState({
            accessToken: null,
            previusAttemptloginFailed: false,
            expireTime: null,
         })
         localStorage.clear();
      }, time * 1000);
   }
   componentDidMount() {
      const accessTokenFromStorage = this.getDataFromLocalStorage('accessToken');
      const expireTimeFromStorage = this.getDataFromLocalStorage('expireTime');
      this.setState({
         accessToken: accessTokenFromStorage,
         expireTime: expireTimeFromStorage
      });
      this.setCoundownLogout(expireTimeFromStorage);
      this.setCoundownInterval();
   }

   componentWillUnmount() {
      clearTimeout(this.setCoundownLogout);
      clearInterval(this.setCoundownInterval);
      console.log('clear timeout')
   }
   
   render() {
      return (
         <React.StrictMode>
            <Error message="Wystąpił błąd w aplikacji">
               
               {this.isUserLogIn() ?
                  <>
                     <Header />
                     <header className="Header">
                        {`witaj ${this.getLogedEmail()}`}
                        <a className="Header__logout" href="#" onClick={this.handleLogout}>wyloguj</a>
                     </header>
                     <div className="App">
                        <Error message="Wystąpił błąd w TimeboxList">
                              <TimeboxList accessToken={this.state.accessToken}/>
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
