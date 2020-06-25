import React, {useEffect, useState} from 'react'
import {Transition, Dropdown, Button} from 'semantic-ui-react'
import {DatePicker} from 'antd'
import moment from 'moment'
import appointmentManager from '../../../modules/appointmentManager'

const HomeAppointmentFormModal = ({appointmentFormOpen, changeAppointmentFormOpen, selectedDate, caseload, setFormSubmitted}) => {
    const [formValues, setFormValues] = useState({date: selectedDate.format("YYYY-MM-DD"), duration: 30})
    const [time, setTime] = useState({hour: '12', minute: '00', am_pm: 'pm'})

    const handleFieldChange = (evt) => {
        const stateToChange = { ...formValues };
        stateToChange[evt.target.id] = evt.target.value;
        setFormValues(stateToChange);
    };
    const handleClientChange = (event, data) => {
        console.log(event)
        const stateToChange = { ...formValues };
        stateToChange['client_id'] = data.value;
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
        formData.append('client_id', formValues.client_id);
        formData.append('date_time', `${formValues.date}T${(time.am_pm == 'pm' && parseInt(time.hour)<12) ? (parseInt(time.hour) + 12).toString(): time.hour}:${time.minute}:00${moment().format('Z')}`);
        formData.append('duration', formValues.duration);
      
      appointmentManager.postNewAppointment(formData).then((appointmentReturn) => {
          console.log(appointmentReturn)
          setFormSubmitted(true)
          changeAppointmentFormOpen(false)
          document.getElementById('greyBackground').classList.toggle('hidden')
      })
      
    }

    function caseloadOptions(){
        if(caseload){
            return caseload.map(providerClient=>{
                const clientUser = providerClient.client.user
                   return ({
                    key: providerClient.client_id,
                    text: `${clientUser.first_name} ${clientUser.last_name} ${moment().diff(moment(providerClient.client.birth_date), 'years')} y.o. ${providerClient.client.gender}`,
                    value: providerClient.client_id
                    })
            
            })
        } else {
            return [{key: `loading`, text: `loading`, value: `loading`}]
        }
    }

    const clientOptions = caseloadOptions()
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

    useEffect(()=>{
        selectedDateFunc()
        console.log(selectedDate)
    },[selectedDate])

    useEffect(()=>{
        timeOfDayOptions()
    },[time])
    
    return (
        
        <div id='greyBackground' className='hidden'>
        <Transition visible={appointmentFormOpen} animation='drop' duration={500}>
            <div className='appointmentFormContainer'>
            <div className='innerContent'>
                <form className='innermostContent' onSubmit={handleSubmit}>
                    <h3 className='title'>Create Appointment</h3>
                    <Dropdown id='client_id' className='field' options={clientOptions} placeholder='Select Client' search selection onChange={handleClientChange} required />
                    <DatePicker id='date_time' className='field' defaultValue={selectedDateFunc} onSelect={setCalendarDate}/>
                    <h5 className='field'>Select Time: </h5>
                    <div className='timeSelectContainer' style={{'display': 'flex'}}>
                      <select id='hour' onChange={handleTimeChange} className='timeSelect' placeholder='Hour' required>
                        {hourOptions()}
                      </select>
                      <select id='minute' onChange={handleTimeChange} className='timeSelect' placeholder='Minute' defaultValue='minute' required>
                        <option value='00'>00</option>
                        <option value='30'>30</option>
                      </select>
                      <p id='am_pm' className='timeSelect'>
                        {timeOfDayOptions()}
                      </p>
                    </div>
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
                            changeAppointmentFormOpen(false)
                            document.getElementById('greyBackground').classList.toggle('hidden')
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

export default HomeAppointmentFormModal;