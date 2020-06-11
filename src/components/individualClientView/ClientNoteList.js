import React, { useState } from 'react'
import { PageHeader, Menu, Collapse, Pagination} from 'antd';
import { CalendarOutlined ,SettingOutlined, AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import ClientNoteCard from './ClientNoteCard'


const { SubMenu } = Menu
const { Panel } = Collapse;

const PatientNotes = () => {

    const text = `
    EXAMPLE COLLATERAL (Family Therapy 311)
    1: Met with mom and client to facilitate a family session. Provided a safe place for mom and client to
    express their concerns and emotions.
    2: Mom requested to meet with clinician and client because she is having a difficult time with client at home.
    Provided a safe place for mom and client to express their concerns at home. Mom was able to express
    her emotions and client used his listening skills, however, disagreed with mom. Clinician guided mom
    and client to express their concerns in a positive way, and helped them reframe their negative words to
    help clarify their feelings. Discussed client’s increased aggression and disrespectful behaviors. Client
    was able to listen and share his frustrations with mom. Client was able to share he is being bullied at
    school. Discussed ways client and mom can support each other at home and created a safety plan due
    to the client’s increased violent behaviors. Discussed possible referral for a psychiatric evaluation for
    client.
    3: Clinician will follow up with an individual session with client and also possible medication evaluation
    referral.
        `;

    const [current, changeCurrent] = useState('date')

    const handleClick = e => {
        console.log('click ', e);
        changeCurrent(e.key)
    };

    return (
        <section className='patientNotesContainer'>
            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Notes"
                subTitle="Use the searchbar to filter content"
            />
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
                <Menu.Item key="type" icon={<MailOutlined/>}>
                    Note Type
        </Menu.Item>
            </Menu>
            <Collapse className='notesSection' accordion >
                <Panel className='note psychiatrist' header="05/20/2020 - - - Bon's Lithium Levels - - - Psychiatrist - - -1 " key="1" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
                <Panel className='note medical' header="This is panel header 1" key="2" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
                <Panel className='note sw' header="This is panel header 2" key="3" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
                <Panel className='note therapist' header="This is panel header 3" key="4" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
                <Panel className='note therapist' header="This is panel header 3" key="5" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
                <Panel className='note psychiatrist' header="05/20/2020 - - - Bon's Lithium Levels - - - Psychiatrist - - -1 " key="6" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
                <Panel className='note medical' header="This is panel header 1" key="7" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
                <Panel className='note sw' header="This is panel header 2" key="8" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
                <Panel className='note medical' header="This is panel header 1" key="9" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
                <Panel className='note psychiatrist' header="05/20/2020 - - - Bon's Lithium Levels - - - Psychiatrist - - -1 " key="10" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
                <Panel className='note psychiatrist' header="05/20/2020 - - - Bon's Lithium Levels - - - Psychiatrist - - -1 " key="11" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
                <Panel className='note sw' header="This is panel header 2" key="12" showArrow={false}>
                    <p>{text}</p>
                    <ClientNoteCard />
                </Panel>
            </Collapse>
            <Pagination className='notesPagination' defaultCurrent={1} total={50} />
        </section>
    );

};

export default PatientNotes;