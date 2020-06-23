import React, { useState, useEffect } from 'react'
import { PageHeader, Menu, Collapse, Pagination, Spin } from 'antd';
import { Grid, Icon, Button } from 'semantic-ui-react'
import {UncontrolledCollapse, Card, CardBody} from 'reactstrap'
import { CalendarOutlined, SettingOutlined, AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import ClientNoteCard from './ClientNoteCard'
import EditNoteModal from './EditNoteModal'
import AddNoteModal from './AddNoteModal'
import moment from 'moment'

const { SubMenu } = Menu

const PatientNotes = ({client, clientNotes, setFormSubmitted, routerProps}) => {
    const [noteFormOpen, changeNoteFormOpen] = useState(false)
    
    function toggleForm(){
        changeNoteFormOpen(!noteFormOpen)
        document.getElementById('greyBackground').classList.toggle('hidden')
    }

    function createNoteDivs(){
        console.log("Client Notes",clientNotes)
        if(clientNotes === null){
            return <Spin size='large' />
        } else if (clientNotes == undefined){
            return (<h3 style={{color: 'black'}}>Client has no notes</h3>)
        } else {
            return (
                clientNotes.map(note=>{
                    function editButtonConditional(){
                        if(note.provider_id == sessionStorage.getItem('providerId')){
                            return <EditNoteModal client={client} setFormSubmitted={setFormSubmitted} note={note}/>
                        }
                    }
                    return(
                        <div key={`note${note.id}Container`}>
                        <Grid key={note.id} id={`note${note.id}`} columns={4} padded className={`${note.provider.provider_type.name.toLowerCase()}Note`}>
                            <Grid.Column>
                                {moment(note.date_time).format('MM/DD/YYYY h:mm a')}
                            </Grid.Column>
                            <Grid.Column>
                                Note Type
                            </Grid.Column>
                            <Grid.Column>
                                {note.provider.user.first_name} {note.provider.user.last_name}
                            </Grid.Column>
                            <Grid.Column>
                                {note.provider.provider_type.name}
                            </Grid.Column>
                        </Grid>
                        <UncontrolledCollapse toggler={`#note${note.id}`}>
                        <Card>
                          <CardBody>     
                            {note.content}
                          </CardBody>
                          {editButtonConditional()}
                        </Card>
                      </UncontrolledCollapse>
                      </div>
                    )
                })
            )
        }
    }

    const [current, changeCurrent] = useState('date')

    const handleClick = e => {
        console.log('click ', e);
        changeCurrent(e.key)
    };

    useEffect(()=>{
        createNoteDivs()
    },[clientNotes])

    return (
        <section className='clientNotesContainer boxContainer'>
            <article className='noteListHeader'>
            <PageHeader
                className="site-page-header"
                onBack={() => routerProps.history.goBack()}
                title="Notes"
                subTitle="Use the searchbar to filter content"
            />
                <div className='circleButton clickable'>
                    <Icon name='file alternate' size='large' id='homeAddAppointment' onClick={toggleForm}/>
                </div>
            </article>
            <Menu className='notesSearchbar' onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="date" icon={<CalendarOutlined />}>
                    Date
            </Menu.Item>
                <Menu.Item key="title" icon={<AppstoreOutlined />}>
                    Title
            </Menu.Item>
                <SubMenu icon={<SettingOutlined />} title="Practitioner Type">
                    <Menu.ItemGroup>
                        <Menu.Item key="setting:1">Medical</Menu.Item>
                        <Menu.Item key="setting:2">Psychiatrist</Menu.Item>
                        <Menu.Item key="setting:3">Therapist</Menu.Item>
                        <Menu.Item key="setting:4">Social Worker</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item key="type" icon={<MailOutlined />}>
                    Note Type
                </Menu.Item>
            </Menu>
            <article className='noteListContainer innerContent'>
            <div className='noteList'>
                {createNoteDivs()}
            </div>
            <Pagination className='notesPagination' defaultCurrent={1} total={50} />
            </article>
            <AddNoteModal client={client} noteFormOpen={noteFormOpen} changeNoteFormOpen={changeNoteFormOpen} setFormSubmitted={setFormSubmitted} />
        </section>
    );

};

export default PatientNotes;

