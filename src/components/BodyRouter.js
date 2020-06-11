import React from 'react';
import { Switch, Route } from 'react-router-dom'
import IndividualClientView from './individualClientView/IndividualClientView'


const BodyRouter = () => {
    return(
        <Switch>
                <Route exact path="/client" render={routerProps => {
                    return (
                        <IndividualClientView routerProps={routerProps} />             
                    );
                }}
                />
        </Switch>
    );
};

export default BodyRouter;
