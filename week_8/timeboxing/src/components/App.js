import  React, { Suspense }from 'react';
//import AuthenticatedApp from './AuthenticatedApp';
import AuthenticationContext from '../contexts/AuthenticationContext';
import LoginForm from './LoginForm';
import Error from './Error';
import '../styles/components/App.scss';
import fetchAudenticationApi from '../api/fetchAudenticationApi';
const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));

class App extends React.Component {

   state = {
      accessToken: null,
      previusAttemptloginFailed: false,
      expireTime: null
   }

   isUserLogIn = () => {
      return this.state.accessToken;
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
                  <AuthenticationContext.Provider 
                     value={
                        {
                           accessToken: this.state.accessToken,
                           onLogout: this.handleLogout
                        }
                     }
                  >
                  <Suspense fallback='... loading'>
                     <AuthenticatedApp handleLogout={this.handleLogout}/>
                  </Suspense>
                  </AuthenticationContext.Provider>
                  :
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
