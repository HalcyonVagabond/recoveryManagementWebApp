import React, { useEffect } from 'react'
import { Spin } from 'antd';
import { Button, Card, Image } from 'semantic-ui-react'
import moment from 'moment';
import appointmentManager from '../../modules/appointmentManager'

const HomeUpcomingEvents = ({nextAppointment, formSubmitted, setFormSubmitted}) => {

    function handleCancel(){
      if(window.confirm(`Are you sure you want to cancel your appointment with ${nextAppointment.client.user.first_name}`)){
        appointmentManager.deleteAppointment(nextAppointment).then(()=>{
          window.confirm('Appointment canceled and client notified.')
          setFormSubmitted(true)
        })
      }
    }

    function sendReminderEmail(){
      if(window.confirm(`Send ${nextAppointment.client.user.first_name} a reminder for your appointment?`)){
        appointmentManager.reminderEmail(nextAppointment.id)
      };
    }

    function loadingConditional(){
        if (nextAppointment === null){
            return (
                <>
                <h3>Loading Next Appointment</h3>
                <Spin size="large" />
                </>
            )
        } else if(nextAppointment === undefined) {
            return (
              <h3>No Upcoming Appointments</h3>
            )
          
         } else{
            return (
                <Card style={{padding: '20px'}}>
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
        <Card.Description>
          <a href={`https://${nextAppointment.appointment_url}`} target='_blank'>Link to Appointment</a>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='blue' onClick={sendReminderEmail}>
           Send Reminder
          </Button>
          <Button basic color='red' onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Card.Content>
    </Card>
            )
        }
    };

    useEffect(()=>{
        loadingConditional()
    }, [formSubmitted]);

    return (
        <article className='homeUpcomingEventsContainer boxContainer'>
            {loadingConditional()}
        </article>
    );
};

export default HomeUpcomingEvents;