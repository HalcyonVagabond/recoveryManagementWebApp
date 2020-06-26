import React, {useState} from 'react'
import {Transition, Button} from 'semantic-ui-react'
import moment from 'moment'
import appointmentManager from '../../../modules/appointmentManager'

const HomeDroppedAppointmentModal = ({droppedAppointmentOpen, droppedFormToggle, selectedDate, setFormSubmitted, draggedDivData, droppedTime, idToHide}) => {
    const [formValues, setFormValues] = useState({duration: 30})

    const handleFieldChange = (evt) => {
        const stateToChange = { ...formValues };
        stateToChange[evt.target.id] = evt.target.value;
        setFormValues(stateToChange);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('client_id', draggedDivData.client_id);
        formData.append('date_time', moment(droppedTime).format());
        formData.append('duration', formValues.duration);
      
      appointmentManager.postNewAppointment(formData).then((appointmentReturn) => {
          setFormSubmitted(true)
          droppedFormToggle()
      })
      
    }

    
    return (
        
        <div id='droppedGreyBackground' className='hidden'>
        <Transition visible={droppedAppointmentOpen} animation='drop' duration={500}>
            <div className='appointmentFormContainer'>
            <div className='innerContent'>
                <form className='innermostContent' onSubmit={handleSubmit}>
                    <h3 className='title'>Create Appointment</h3>
                    <h4>{draggedDivData ? `Client: ${draggedDivData.client.user.first_name} ${draggedDivData.client.user.last_name}` :  'Client:'}</h4>
                    <br/>
                    <h5>{droppedTime ? `${moment(droppedTime).format("dddd, MMMM Do YYYY, h:mm a")}` : 'Time:'}</h5>
                    <select id='duration' className='field' placeholder='Duration' onChange={handleFieldChange} required>
                        <option value={30}>30 minutes</option>
                        <option value={60}>60 minutes</option>
                        <option value={90}>90 minutes</option>
                    </select>
                    <div className='apptFormButtons field'>
                    
                        <Button type='submit'>
                                Save
                        </Button>
                        <Button onClick={(e)=>{
                            e.preventDefault()
                            droppedFormToggle()
                            setFormSubmitted(true)
                            document.getElementById(idToHide).classList.toggle('hidden')
                            }}>
                            Cancel
                        </Button>
                    </div>
                </form>
                </div>
            </div>
        </Transition>
        </div>
    )
};

export default HomeDroppedAppointmentModal;