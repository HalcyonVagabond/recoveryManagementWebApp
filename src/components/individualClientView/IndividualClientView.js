import React from 'react'
import ClientInfo from './ClientInfo'
import ClientNoteList from './ClientNoteList'
import './IndividualClientView.css'

const PatientView = () => {
    return (
        <>
            <ClientInfo/>
            <ClientNoteList/>
        </>

    );
};

export default PatientView;