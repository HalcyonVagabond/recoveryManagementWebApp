import React, { useState, useEffect } from "react";
import "./Login.css"
import authManager from "../../modules/authManager.js";
import { Form, FormGroup, Input, Button } from 'reactstrap'
import { Header, Icon } from 'semantic-ui-react'

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

    function redirectWhenLoggedIn() {
        if (loggedIn) {
            routerProps.history.push('/home')
        };
    };

    useEffect(() => {
        redirectWhenLoggedIn()
    }, [loggedIn])

    return (
        <div id='greyBackground'>
            <section id='creationForm'>
                <Header as='h2' icon>
                    <Icon className='loginIcon' name='address card outline' />
                    Cooperative Recovery
                    <Header.Subheader>
                        Login to your provider account
                    </Header.Subheader>
                </Header>
                <Form onSubmit={handleLogin}>
                    <FormGroup>
                        <Input
                            onChange={handleFieldChange}
                            type="text"
                            id="email"
                            placeholder="email"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            onChange={handleFieldChange}
                            type="password"
                            id="password"
                            placeholder="Password"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button type="Submit">Login</Button>
                    </FormGroup>
                </Form>
                <a href="http://localhost:3000/register">Register</a>
            </section>
        </div>
    );
};

export default Login;