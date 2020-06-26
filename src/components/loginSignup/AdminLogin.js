import React, { useState, useEffect } from "react";
import "./Login.css"
import authManager from "../../modules/authManager.js";
import { Form, FormGroup, Input, Button } from 'reactstrap'
import { Header, Icon } from 'semantic-ui-react'

const AdminLogin = ({ routerProps, loggedIn, setIsLoggedIn }) => {
    const [credentials, setCredentials] = useState({});

    const handleFieldChange = (evt) => {
        const stateToChange = { ...credentials };
        stateToChange[evt.target.id] = evt.target.value;
        setCredentials(stateToChange);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        return authManager.loginAdmin(credentials)
            .then((parsedResponse) => {
                if (
                    "valid" in parsedResponse &&
                    parsedResponse.valid &&
                    "token" in parsedResponse && 
                    "admin" in parsedResponse
                ) {
                    sessionStorage.setItem("token", parsedResponse.token);
                    sessionStorage.setItem("adminId", parsedResponse.admin)
                    setIsLoggedIn(true);
                }
            });
    };

    function redirectWhenLoggedIn() {
        if (loggedIn) {
            routerProps.history.push('/admin')
        };
    };

    useEffect(() => {
        redirectWhenLoggedIn()
    }, [loggedIn])

    return (
        <div id='greyBackground'>
            <section id='creationForm' className='boxContainer'>
                <div className='innerContent'>
                <Header as='h2' icon>
                    <Icon className='loginIcon' name='settings' />
                    Evolving Recovery
                    <Header.Subheader>
                        Login to your admin account
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
                <p className='clickable' style={{textDecoration: 'underline', color: 'blue'}}onClick={()=>routerProps.history.push('/login')}>provider login</p>
                </div>
            </section>
        </div>
    );
};

export default AdminLogin;