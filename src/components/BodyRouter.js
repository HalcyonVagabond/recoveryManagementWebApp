import React from 'react';
import { Switch, Route, Redirect, useHistory  } from 'react-router-dom'
import Login from './loginSignup/Login'
import IndividualClientView from './individualClientView/IndividualClientView'


const BodyRouter = ({loggedIn, setIsLoggedIn}) => {
    let history = useHistory();
    window.addEventListener("storage", () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("providerId");
        setIsLoggedIn(false);
        history.push("/login");
    });

    const credentials = sessionStorage.getItem('token');

    return(
        <Switch>
            <Route exact path="/"
                render={routerProps =>
                credentials ? (
                  <Redirect exact to='/home'/>
                ) : (
                  <Redirect exact to='/login' />
                )}
            />
            <Route exact path="/login" render={routerProps =>
                credentials ? (
                  <Redirect exact to='/home'/>
                ) : (
                  <Login routerProps={routerProps} loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn}/>
                )}           
            />
            <Route exact path="/home" render={routerProps => 
                credentials ? (
                    <h1>Logged In and Home</h1>
                  ) : (
                    <Redirect exact to='/login'/>
                  )}
            />
            <Route exact path="/client" render={routerProps => 
                credentials ? (
                    <IndividualClientView routerProps={routerProps}/>
                  ) : (
                    <Redirect exact to='/login'/>
                  )}
            />

            
            <Route render={props => <Redirect exact to="/" />} />
        </Switch>
    );
};

export default BodyRouter;
