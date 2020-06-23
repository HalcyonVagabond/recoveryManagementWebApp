import React, {useEffect, useState} from 'react'
import {Transition, Dropdown, Button} from 'semantic-ui-react'
import {DatePicker} from 'antd'
import moment from 'moment'
import appointmentManager from '../../../modules/appointmentManager'

const HomeEditAppointment = ({editFormOpen, changeEditFormOpen, selectedDate, caseload, setFormSubmitted, editFormAppointment, setEditFormAppointment}) => {
    const [formValues, setFormValues] = useState({date: selectedDate.format("YYYY-MM-DD"), duration: editFormAppointment ? editFormAppointment.duration : 30, client_id: editFormAppointment ? editFormAppointment.client_id : ""})
    const [time, setTime] = useState({hour: editFormAppointment ? moment(editFormAppointment.date_time).format('hh').toString() : '12', 
                                        minute: editFormAppointment ? moment(editFormAppointment.date_time).format('mm').toString() : '00', 
                                        am_pm: editFormAppointment ? moment(editFormAppointment.date_time).format('a') : 'pm'})

    const handleFieldChange = (evt) => {
        const stateToChange = { ...formValues };
        stateToChange[evt.target.id] = evt.target.value;
        setFormValues(stateToChange);
    };
    const handleTimeChange = (evt) => {
        console.log('Here Changing Time!', evt.target.value)
        if(evt.target.id === 'hour' && (parseInt(evt.target.value)===12)){
            const stateToChange = { ...time };
            stateToChange[evt.target.id] = evt.target.value;
            stateToChange['am_pm'] = 'pm';
            setTime(stateToChange);
        } else if (evt.target.id === 'hour' && (parseInt(evt.target.value)>8)){
            const stateToChange = { ...time };
            stateToChange[evt.target.id] = evt.target.value;
            stateToChange['am_pm'] = 'am';
            setTime(stateToChange);
        }else if(evt.target.id === 'hour' && (parseInt(evt.target.value)<8)) {
            const stateToChange = { ...time };
            stateToChange[evt.target.id] = evt.target.value;
            stateToChange['am_pm'] = 'pm';
            setTime(stateToChange);
        }else {
            const stateToChange = { ...time };
            stateToChange[evt.target.id] = evt.target.value;
            setTime(stateToChange);
        }
    };
    const setCalendarDate = (value) =>{
        const stateToChange = { ...formValues };
        stateToChange['date'] = value.format('YYYY-MM-DD');
        setFormValues(stateToChange)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`${formValues.date}T${(time.am_pm === 'pm' && parseInt(time.hour<12)) ? (parseInt(time.hour) + 12).toString(): time.hour}:${time.minute}${moment().format('Z')}`)
        const formData = new FormData();
        formData.append('client_id', editFormAppointment.client_id);
        formData.append('date_time', `${formValues.date}T${(time.am_pm == 'pm' && parseInt(time.hour)<12) ? (parseInt(time.hour) + 12).toString(): time.hour}:${time.minute}${moment().format('Z')}`);
        formData.append('duration', formValues.duration);
      
        if(editFormAppointment){
            appointmentManager.updateAppointment(formData, editFormAppointment.id).then((resp)=>{
                console.log("From update appt!", resp)
                setFormSubmitted(true)
                changeEditFormOpen(false)
                setEditFormAppointment(null)
                document.getElementById('greyBackground-edit').classList.toggle('hidden')
            })
        } else {
            appointmentManager.postNewAppointment(formData).then((appointmentReturn) => {
                console.log(appointmentReturn)
                setFormSubmitted(true)
                changeEditFormOpen(false)
                document.getElementById('greyBackground-edit').classList.toggle('hidden')
            })
        }
      
    }
    
    const hourOptions = () =>{
        const hourArray=[]
    for(let i=1; i<=12; i++){  
        hourArray.push(
        <option key={i} value={i<10 ? `0${i}` : `${i}`}>{i<10 ? `0${i}` : i}</option>
            )}
        return hourArray
    } 
    const selectedDateFunc = () => selectedDate
    function timeOfDayOptions(){
        if(time.am_pm === 'am'){
            return 'am'
        } else {
            return 'pm'
        }
    };

    const defaultValues = {

        duration(){
            return editFormAppointment ? editFormAppointment.duration : 30
        },
        hour(){
            return time.hour
        },
        minute(){
            return time.minute
        }
    }

    useEffect(()=>{
        selectedDateFunc()
        console.log(selectedDate)
    },[selectedDate])

    useEffect(()=>{
        timeOfDayOptions()
    },[time, editFormAppointment])
    useEffect(()=>{
        defaultValues.hour()
        defaultValues.minute()
    },[editFormAppointment])
    
    return (
        
        <div id='greyBackground-edit' className='greyBackground hidden'>
        <Transition visible={editFormOpen} animation='drop' duration={500}>
            <div className='appointmentFormContainer'>
                <form className='innerContent' onSubmit={handleSubmit}>
                    <h3 className='title'>{editFormAppointment ? 'Update Appointment' : 'Create Appointment'}</h3>
                    <h4>{editFormAppointment?`${editFormAppointment.client.user.first_name} ${editFormAppointment.client.user.last_name} ${moment().diff(moment(editFormAppointment.client.birth_date), 'years')} y.o. ${editFormAppointment.client.gender}`:null}</h4>
                    <DatePicker id='date_time' className='field' defaultValue={selectedDateFunc} onSelect={setCalendarDate}/>
                    <h5 className='field'>Select Time: </h5>
                    <div className='timeSelectContainer' style={{'display': 'flex'}}>
                      <select id='hour' onChange={handleTimeChange} className='timeSelect' placeholder='Hour' required defaultValue={defaultValues.hour()}>
                        {hourOptions()}
                      </select>
                      <select id='minute' onChange={handleTimeChange} className='timeSelect' placeholder='Minute' required defaultValue={defaultValues.minute()}>
                        <option value='00'>00</option>
                        <option value='30'>30</option>
                      </select>
                      <p id='am_pm' className='timeSelect'>
                        {timeOfDayOptions()}
                      </p>
                    </div>
                    <select id='duration' className='field' placeholder='Duration' onChange={handleFieldChange} required defaultValue={editFormAppointment ? editFormAppointment.duration : 30}>
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
                            changeEditFormOpen(false)
                            setEditFormAppointment(null)
                            setFormSubmitted(true)
                            document.getElementById('greyBackground-edit').classList.toggle('hidden')
                            }}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </Transition>
        </div>
    )
};

export default HomeEditAppointment;