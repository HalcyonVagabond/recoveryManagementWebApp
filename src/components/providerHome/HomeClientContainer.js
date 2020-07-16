import React, {useState, useEffect} from 'react'
import {Input, Spin, PageHeader, Avatar} from 'antd'
import HomeClientCard from './HomeClientCard'
import HomeUnassignedClientCard from './HomeUnassignedClientCard'

const {Search} = Input;

const HomeClientContainer = ({routerProps, caseload, unassignedClients, setDraggedDivData, formSubmitted, setFormSubmitted}) => {

    const [searchTerm, setSearchTerm] = useState(null);
    const [seeOtherClients, changeSeeOtherClients] = useState(false)

    function handleSearch(value) {
        setSearchTerm(value)
    };

    function displayOtherClients () {

        if (!unassignedClients) {
            return (
                <>
                <h1>Loading Unassigned Clients</h1>
                <Spin size="large" />
                </>
            );
        } else if (unassignedClients && !searchTerm){
            return (
                unassignedClients.map(unassignedClient=><HomeUnassignedClientCard key={unassignedClient.id} unassignedClient={unassignedClient} routerProps={routerProps} setDraggedDivData={setDraggedDivData} setFormSubmitted={setFormSubmitted}/>)
            );
        } else if (unassignedClients && searchTerm){
            const filtered = unassignedClients.filter(client=>client.user.first_name === searchTerm || client.user.last_name === searchTerm)
            return (
                filtered.map(unassignedClient=><HomeUnassignedClientCard key={unassignedClient.id} unassignedClient={unassignedClient} routerProps={routerProps} setDraggedDivData={setDraggedDivData} setFormSubmitted={setFormSubmitted}/>)
            );
        }
    };

    function displayCaseLoad () {
        if (!caseload) {
            return (
                <>
                <h1>Loading clients</h1>
                <Spin size="large" />
                </>
            );
        } else if (caseload && !searchTerm){
            return (
                caseload.map(clientProvider=><HomeClientCard key={clientProvider.client_id} clientProvider={clientProvider} routerProps={routerProps} setDraggedDivData={setDraggedDivData} setFormSubmitted={setFormSubmitted}/>)
            );
        } else if (caseload && searchTerm){
            const filtered = caseload.filter(client=>client.client.user.first_name.toLowerCase().includes(searchTerm) || client.client.user.last_name.toLowerCase().includes(searchTerm))
            return (
                filtered.map(clientProvider=><HomeClientCard key={clientProvider.client_id} clientProvider={clientProvider} routerProps={routerProps} setDraggedDivData={setDraggedDivData} setFormSubmitted={setFormSubmitted}/>)
            );
        }
    };

    function displayConditional(){
        return !seeOtherClients ? displayCaseLoad() : displayOtherClients()
    };

    function headerTitle(){
        if(!seeOtherClients){
            return 'My Clients'
        } else {
            return 'Unassigned'
        }
    };

    useEffect(()=>{
        displayConditional()
    },[caseload, searchTerm, formSubmitted])

    useEffect(()=>{
        displayConditional()
    }, [seeOtherClients])

    return (
        <article className='homeClientContainer boxContainer centerContent'>
            <div className='clientToggleButton'
                onClick={()=>{
                changeSeeOtherClients(!seeOtherClients)
             }}>
            <PageHeader  title={headerTitle()} avatar={{ src: require('../../images/profileIcon.png')}} />
             </div>
                <div className='clientSearchbar'>
                <Search placeholder="search client" onSearch={handleSearch} enterButton />
                </div>
            <div className='clientListContainer'>
                {displayConditional()}
            </div>
            <div style={{margin: '5px', padding: '10px', backgroundColor: 'white', borderRadius: '2px'}}>
            <div className='greenDiv ant-alert clickable' draggable={true}>
                <h4>Add Meeting</h4>
                <p>Drag and drop to add a meeting to your calendar</p>
            </div>
            <div className='yellowDiv ant-alert clickable' draggable={true}>   
                <h4>Add To Do Item</h4>
                <p>Drag and drop to add a "To Do" to your calendar</p>
            </div>
            </div>
        </article>
    )
};

export default HomeClientContainer;