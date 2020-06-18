import React, { useEffect } from 'react'
import { Spin } from 'antd';
import { Button, Card, Image } from 'semantic-ui-react'
import moment from 'moment';

const homeUpcomingEvents = ({nextAppointment}) => {

    function loadingConditional(){
        if (!nextAppointment){
            return (
                <>
                <h3>Loading Next Appointment</h3>
                <Spin size="large" />
                </>
            )
        } else {
            return (
                <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={require('../../images/alarmClock.png')}
        />
        <Card.Header>{nextAppointment.client.user.first_name} {nextAppointment.client.user.last_name}</Card.Header>
        <Card.Meta>Next Appointment</Card.Meta>
        <Card.Description>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
            )
        }
    };

    // useEffect(()=>{
    //     loadingConditional()
    // }, [nextAppointment]);

    return (
        <article className='homeUpcomingEventsContainer boxContainer'>
            {loadingConditional()}
        </article>
    );
};

export default homeUpcomingEvents;