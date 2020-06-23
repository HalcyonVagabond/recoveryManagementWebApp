import React, {useState, useEffect} from 'react'
import ClientInfo from './ClientInfo'
import ClientNoteList from './ClientNoteList'
import './IndividualClientView.css'
import clientManager from '../../modules/clientManager'
import noteManager from '../../modules/noteManager'

const PatientView = ({routerProps, clientId, formSubmitted, setFormSubmitted}) => {
    const [client, setClient] = useState(null)
    const [clientNotes, setClientNotes] = useState(null)
    
    function getClientAndNotes(){
        clientManager.retrieveClient(clientId).then(resp=>{
            setClient(resp)
            noteManager.getClientNotes(clientId).then(noteResp=>setClientNotes(noteResp))
    })
    };

    useEffect(()=>{
        getClientAndNotes()
    }, [formSubmitted])

    return (
        <>
            <ClientInfo client={client}/>
            <ClientNoteList client={client} clientNotes={clientNotes} setFormSubmitted={setFormSubmitted} routerProps={routerProps}/>
        </>

    );
};

export default PatientView;