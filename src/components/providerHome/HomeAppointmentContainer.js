import React, { useState, useEffect } from 'react'
import {Icon} from 'semantic-ui-react';
import moment from 'moment';
import HomeAppointmentFormModal from './HomeAppointmentFormModal'


const HomeAppointmentList = ({selectedDate, selectedDateAppointments, caseload, formSubmitted, setFormSubmitted}) => {

    const [appointmentFormOpen, changeAppointmentFormOpen]=useState(false)
    
    function toggleForm(){
        changeAppointmentFormOpen(!appointmentFormOpen)
        console.log(appointmentFormOpen)
    }

    function hoverDrag(e){
        e.preventDefault()
        console.log(e)
        document.getElementById(e.target.id).style.backgroundColor = 'var(--mainDarkBlue)'
    };

    function generateTimeDivs(){
        function drop(e){
            e.preventDefault()
            const client_id = e.dataTransfer.getData('client_id')
            const clientCard = document.getElementById(client_id)
            clientCard.style.display = 'block'
            e.target.appendChild(clientCard)
        }

        function dragOver(e){
            e.preventDefault()
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
                        id={exactAppointment.id} 
                        key={`${hour}:${minute}`} 
                        > 
                        {i<=12 ? `${i}:${minute} am`: `${i-12}:${minute} pm`} 
                    <p>{exactAppointment.client.user.first_name}</p>
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
                        onDragEnter={e=>document.getElementById(e.target.id).style.backgroundColor = 'var(--mainDarkBlue)'}
                        onDragLeave={e=>document.getElementById(e.target.id).style.backgroundColor = 'white'}
                        onDrop={drop}
                        onDragOver={dragOver}
                        > 
                            {i<=12 ? `${i}:${minute} am`: `${i-12}:${minute} pm`} 
                        </div>
                    )
                }
                
            };
        };
        return timeDivs;
    };

    // console.log(document.getElementsByClassName('timelineDivs'))

    // document.getElementsByClassName('timelineDivs').forEach(div=>{
    //     div.addEventListener('dragover',(e)=>{
    //         e.preventDefault();
    //         this.style.backgroundColor = 'lightgrey'
    //     })
    // })

    
    return (
        <section className='homeAppointmentContainer boxContainer'>
            <HomeAppointmentFormModal appointmentFormOpen={appointmentFormOpen} changeAppointmentFormOpen={changeAppointmentFormOpen} selectedDate={selectedDate} caseload={caseload} setFormSubmitted={setFormSubmitted}/>
            <div className='appointmentContainerHeader centerContent'>
                <div>
                    <h3>Appointments</h3>
                    <p> {selectedDate.format("dddd, MMMM Do YYYY")} </p>  
                </div>
                <div className='circleButton clickable'>
                    <Icon name='add to calendar' size='large' id='homeAddAppointment' onClick={toggleForm}/>
                </div>
            </div>
            <div className='timeDivsContainer'>
                {generateTimeDivs()}
            </div>
        </section>
    );
};

export default HomeAppointmentList;