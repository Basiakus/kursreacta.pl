import React from 'react';
import Header from './Header';
import TimeboxListMenager from './container/TimeboxListMenager';
import CurrentTimebox from './CurrentTimebox'; 
import Error from './Error';
import InspiracionalQuoteContainer from './container/InspiracionalQuoteContainer';
import Portal from './Portal';
import UserGreetings from './UserGreetings';
import AuthenticationContext from '../contexts/AuthenticationContext';
const AuthenticatedApp = ({handleLogout}) => {
     return (
          <>
               <Portal>
                    <Header onLogout={handleLogout}>
                         <UserGreetings />
                         <AuthenticationContext.Consumer>
                              {
                                   ({ onLogout }) => <a className="Header__logout" href="#userGreetings" onClick={onLogout}>wyloguj</a>
                              }
                         </AuthenticationContext.Consumer>
                    </Header>
               </Portal>
               <div className="App">
                    <Error message="Wystąpił błąd w TimeboxList">
                         <TimeboxListMenager />
                    </Error>
                    <Error message="Wystąpił błąd w EditableTimebox">
                         <CurrentTimebox 
                              title='refaktoryzacja'
                              totalTimeInMinutes={1}
                         />
                    </Error>
                    <InspiracionalQuoteContainer />
               </div>
          </>
     )
}

export default AuthenticatedApp;