import React, { useState, useEffect } from 'react'
import {Icon} from 'semantic-ui-react';
import { CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import HomeAppointmentFormModal from './HomeAppointmentFormModal'
import HomeDroppedAppointment from './HomeDroppedAppointment'
import appointmentManager from '../../../modules/appointmentManager'

const HomeAppointmentList = ({selectedDate, selectedDateAppointments, caseload, formSubmitted, setFormSubmitted, draggedDivData}) => {

    const [appointmentFormOpen, changeAppointmentFormOpen]=useState(false)
    const [droppedAppointmentOpen, changeDroppedAppointmentOpen]=useState(false)
    const [droppedTime, setDroppedTime] = useState(null)
    const [idToHide, setIdToHide] = useState(null)

    function toggleForm(){
        changeAppointmentFormOpen(!appointmentFormOpen)
        document.getElementById('greyBackground').classList.toggle('hidden')
    }

    function droppedFormToggle(){
        changeDroppedAppointmentOpen(!droppedAppointmentOpen)
        document.getElementById('droppedGreyBackground').classList.toggle('hidden')
    }

    function hoverDrag(e){
        e.preventDefault()
        document.getElementById(e.target.id).style.backgroundColor = 'var(--mainDarkBlue)'
        setTimeout(()=>{
            document.getElementById(e.target.id).style.backgroundColor = 'white'
        },100)
    };

    function handleCancelAppointment(appointment){
        if(window.confirm(`Are you sure you would like to cancel this appointment with ${appointment.client.user.first_name}`)===true){
            appointmentManager.deleteAppointment(appointment).then(resp=>{
                setFormSubmitted(true)
            })
        }
    }

    function generateTimeDivs(){
        function drop(e){
            e.preventDefault()
            const client_id = e.dataTransfer.getData('client_id')
            const clientCard = document.getElementById(client_id)
            clientCard.style.display = 'block'
            const clone = clientCard.cloneNode(true)
            clone.id = `${client_id}-clone`
            setIdToHide(clone.id)
            e.target.appendChild(clone)
            const dateTime = `${selectedDate.format('YYYY-MM-DD')}T${e.target.id}`
            setDroppedTime(dateTime)
            droppedFormToggle()
            document.getElementById(e.target.id).style.backgroundColor = 'white'
            
        }

        function dragOver(e){
            e.preventDefault()
            document.getElementById(e.target.id).style.backgroundColor = 'var(--mainDarkBlue)'
        }

        const timeDivs = []
        for(let i=8; i<21; i ++){
            for(let j=0; j<=30; j+=30){
                const hour = (i<10 ? `0${i}`: `${i}`)
                const minute = (j<10 ? `0${j}` : `${j}` )
                const exactAppointment = selectedDateAppointments ? selectedDateAppointments.filter(appt=>moment(appt.date_time).format('HH:mm').toString() === `${hour}:${minute}`)[0] : null;
                if(selectedDateAppointments && exactAppointment){
                    timeDivs.push(
                        <div className='timelineDivs timelineAppointment lightBlueDiv clickable' 
                        id={`blahbblah----${exactAppointment.id}`} 
                        key={`${hour}:${minute}`} 
                        > 
                        {i<12 ? `${i}:${minute} am`: `${i===12 ? i : i-12}:${minute} pm`} 
                    <h4>{exactAppointment.client.user.first_name}</h4>
                    <p>email: {exactAppointment.client.user.email}</p>
                    <CloseOutlined className='cancelAppointment' onClick={()=>handleCancelAppointment(exactAppointment)}/>
                    </div>
                    )
                    if(exactAppointment.duration === 60 && j===0){
                        j=-30;
                        i=i+1;
                    } else if (exactAppointment.duration === 60 && j===30){
                        j=0;
                        i=i+1;
                    }else if (exactAppointment.duration === 90){
                        i=i+1
                    }
                } else{

                    timeDivs.push(
                        <div className='timelineDivs' 
                        id={`${hour}:${minute}`} 
                        key={`${hour}:${minute}`} 
                        onDragLeave={e=>document.getElementById(e.target.id).style.backgroundColor = 'white'}
                        onDrop={drop}
                        onDragOver={dragOver}
                        > 
                            {i<12 ? `${i}:${minute} am`: `${i===12 ? i : i-12}:${minute} pm`} 
                        </div>
                    )
                }
                
            };
        };
        return timeDivs;
    };

    useEffect(()=>{
        generateTimeDivs()
    },[formSubmitted])

    
    return (
        <section className='homeAppointmentContainer boxContainer'>
            <HomeAppointmentFormModal appointmentFormOpen={appointmentFormOpen} changeAppointmentFormOpen={changeAppointmentFormOpen} selectedDate={selectedDate} caseload={caseload} setFormSubmitted={setFormSubmitted}/>
            <div className='appointmentContainerHeader centerContent'>
                <div>
                    <h3>Appointments</h3>
                    <p> {selectedDate.format("dddd, MMMM Do YYYY")} </p>  
                </div>
                <div className='circleButtonBorder'>
                <div className='circleButton clickable'>
                    <Icon name='add to calendar' size='large' id='homeAddAppointment' onClick={toggleForm}/>
                </div>
                </div>
            </div>
            <div className='timeDivsContainer'>
                {generateTimeDivs()}
            </div>
            <HomeDroppedAppointment droppedFormToggle={droppedFormToggle} droppedAppointmentOpen={droppedAppointmentOpen} setFormSubmitted={setFormSubmitted} draggedDivData={draggedDivData} droppedTime={droppedTime} idToHide={idToHide}/>
        </section>
    );
};

export default HomeAppointmentList;