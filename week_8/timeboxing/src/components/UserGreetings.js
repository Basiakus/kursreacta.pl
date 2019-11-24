import React from 'react';
import jwt from "jsonwebtoken";
import AuthenticationContext from '../contexts/AuthenticationContext';


const UserGreetings = (props) => {
     return (
          <AuthenticationContext.Consumer>
               {
                    ({ accessToken }) => <>witaj {getLogedEmail(accessToken)}</>
               }
          </AuthenticationContext.Consumer>
     );
}

export default UserGreetings;


const getLogedEmail = (accessToken) => {
     return jwt.decode(accessToken).email;
}