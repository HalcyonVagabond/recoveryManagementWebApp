import React, { useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Login from './loginSignup/Login'
import ProviderHome from './providerHome/ProviderHome'
import IndividualClientView from './individualClientView/IndividualClientView'


const BodyRouter = ({ loggedIn, setIsLoggedIn }) => {

  const [formSubmitted, setFormSubmitted] = useState(false)

  let history = useHistory();
  window.addEventListener("storage", () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("providerId");
    setTimeout(()=>{
      setIsLoggedIn(false);
      history.push("/login");
    }, 200)
  });

  const credentials = sessionStorage.getItem('token');

  return (
    <Switch>
      <Route exact path="/"
        render={routerProps =>
          credentials ? (
            <Redirect exact to='/home' />
          ) : (
              <Redirect exact to='/login' />
            )}
      />
      <Route exact path="/login" render={routerProps =>
        credentials ? (
          <Redirect exact to='/home' />
        ) : (
            <Login routerProps={routerProps} loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn} />
          )}
      />
      <Route exact path="/home" render={routerProps =>
        credentials ? (
          <ProviderHome routerProps={routerProps} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}/>
        ) : (
            <Redirect exact to='/login' />
          )}
      />
      <Route exact path="/client" render={routerProps =>
        credentials ? (
          <IndividualClientView routerProps={routerProps} />
        ) : (
            <Redirect exact to='/login' />
          )}
      />
      <Route
        path="/clients/:clientId(\d+)"
        render={(routerProps) => 
          credentials ? (
            <IndividualClientView 
            routerProps={routerProps} 
            clientId={parseInt(routerProps.match.params.clientId)}
            formSubmitted={formSubmitted}
            setFormSubmitted={setFormSubmitted}
            />
          ) : (
              <Redirect exact to='/login' />
            )}
        
      />
      <Route render={props => <Redirect exact to="/" />} />
    </Switch>
  );
};

export default BodyRouter;
