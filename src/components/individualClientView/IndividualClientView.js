import React, {useState, useEffect} from 'react'
import ClientInfo from './ClientInfo'
import ClientNoteList from './ClientNoteList'
import './IndividualClientView.css'
import clientManager from '../../modules/clientManager'
import noteManager from '../../modules/noteManager'
import providerClientManager from '../../modules/providerClientManager'

const PatientView = ({routerProps, clientId, formSubmitted, setFormSubmitted}) => {
    const [client, setClient] = useState(null)
    const [clientNotes, setClientNotes] = useState(null)
    const [clientProviders, setClientProviders] = useState(null)

    function getClientAndNotes(){
        clientManager.retrieveClient(clientId).then(resp=>{
            setClient(resp)
            noteManager.getClientNotes(clientId).then(noteResp=>setClientNotes(noteResp))
    })
    };

    function getClientsProviders(){
        providerClientManager.getClientsProviders(clientId).then(resp=>{
            setClientProviders(resp)
        })
    }

    useEffect(()=>{
        getClientAndNotes()
    }, [formSubmitted])

    useEffect(()=>{
        getClientsProviders()
    }, [])

    return (
        <>
            <ClientInfo client={client} clientProviders={clientProviders}/>
            <ClientNoteList client={client} clientNotes={clientNotes} setFormSubmitted={setFormSubmitted} routerProps={routerProps}/>
        </>

    );
};

export default PatientView;