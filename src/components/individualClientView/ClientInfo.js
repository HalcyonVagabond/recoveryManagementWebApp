import React, { useState } from 'react'
import { Card, Avatar, Collapse } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import moment from 'moment'

const { Meta } = Card;
const { Panel } = Collapse;

const PatientInfo = ({client}) => {

    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

    return (
        <section className='patientInfoContainer'>
            <Card
                cover={
                    <img
                        alt="example"
                        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fprofile-picture-vector-illustration-vector-id587805156%3Fk%3D6%26m%3D587805156%26s%3D170667a%26w%3D0%26h%3DAc3SYBYxtwXm5aYP8CjKRCxt3HrzaCE5aZpOjN35IU0%3D&f=1&nofb=1"
                    />
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_153382.png&f=1&nofb=1" />}
                    title={client ? `${client.user.first_name} ${client.user.last_name}` : ""}
                    description={client? `${moment().diff(moment(client.birth_date), 'years')} y.o. ${client.gender}` : ""}
                />
            </Card>
            <Collapse accordion>
                <Panel header="Patient Information" key="1">
                    <p>{text}</p>
                </Panel>
                <Panel header="Current Providers" key="2">
                    <p>{text}</p>
                </Panel>
                <Panel header="Medication" key="3">
                    <p>{text}</p>
                </Panel>
                <Panel header="Insurance" key="4">
                    <p>{text}</p>
                </Panel>
            </Collapse>

        </section>
    );

};

export default PatientInfo;