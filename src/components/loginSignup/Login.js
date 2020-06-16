import React, { useState, useEffect } from "react";
import "./Login.css"
import authManager from "../../modules/authManager.js";

const Login = ({ routerProps, loggedIn, setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({});

  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    return authManager.loginUser(credentials)
      .then((parsedResponse) => {
        if (
          "valid" in parsedResponse &&
          parsedResponse.valid &&
          "token" in parsedResponse
        ) {
          sessionStorage.setItem("token", parsedResponse.token);
          sessionStorage.setItem("providerId", parsedResponse.provider_id)
          setIsLoggedIn(true);
        }
      });
  };

  function redirectWhenLoggedIn(){
      if (loggedIn){
        routerProps.history.push('/home')
      };
  };

  useEffect(()=>{
      redirectWhenLoggedIn()
  },[loggedIn])

  return (
    <div id='greyBackground'>
      <section id='creationForm'>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <fieldset>
          <label htmlFor="username">username</label>
          <input
            onChange={handleFieldChange}
            type="text"
            id="username"
            placeholder="username"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleFieldChange}
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <button type="Submit">Login</button>
        </fieldset>
      </form>
      <a href="http://localhost:3000/register">Register</a>
      </section>
    </div>
  );
};

export default Login;