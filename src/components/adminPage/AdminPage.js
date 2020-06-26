import React from "react"
import CreateProviderForm from './CreateProviderForm'
import CreateClientForm from './CreateClientForm'
import './AdminPage.css'

const AdminPage = ({routerProps}) => {

    return (
        <div className='adminFormsContainer boxContainer'>
        <CreateClientForm routerProps={routerProps} />
        <CreateProviderForm routerProps={routerProps} />
        </div>
    )
};
export default AdminPage;
