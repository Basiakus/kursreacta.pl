import React, { useContext } from 'react';
import jwt from "jsonwebtoken";
import AuthenticationContext from '../contexts/AuthenticationContext';


function UserGreetings() {
     const { accessToken } = useContext(AuthenticationContext);
     return (
          <>witaj {getLogedEmail(accessToken)}</>
     );
}

export default UserGreetings;


const getLogedEmail = (accessToken) => {
     return jwt.decode(accessToken).email;
}