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
          {moment().format('YYYY-MM-DD') === moment(nextAppointment.date_time).format('YYYY-MM-DD') ? `Today at ${moment(nextAppointment.date_time).format('hh:mm a')}` : `${moment(nextAppointment.date_time).format('dddd MM/DD/YYYY')} at ${moment(nextAppointment.date_time).format('hh:mm a')}`}
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