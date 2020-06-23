import React, {useState, useEffect} from 'react'
import patientClientManager from '../../modules/patientClientManager'
import appointmentManager from '../../modules/appointmentManager'
import HomeCalendar from './HomeCalendar'
import HomeUpcomingEvents from './HomeUpcomingEvents'
import HomeAppointmentContainer from './HomeAppointment/HomeAppointmentContainer'
import HomeClientContainer from './HomeClientContainer'
import moment from 'moment'
import './ProviderHome.css'

const ProviderHome = ({routerProps, formSubmitted, setFormSubmitted}) => {
    const [caseload, setCaseload] = useState(null);
    const [appointments, setAppointments] = useState(null);
    const [nextAppointment, setNextAppointment] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment())
    const [selectedDateAppointments, setSelectedDateAppointments] = useState(null)
    const [appointmentFormOpen, changeAppointmentFormOpen]=useState(false)
    const [draggedDivData, setDraggedDivData] = useState(null)

    function getClients(){
        patientClientManager.getProviderClients().then(resp=>{
            setCaseload(resp)
        });
    };

    function getAppointments(){
        appointmentManager.getAppointments().then(resp=>{

            const sorted = resp.sort(function(a, b) {
                return new Date(a.date_time) - new Date(b.date_time) ;
            });
            setAppointments(sorted)
            setNextAppointment(sorted.filter(appt => new Date(appt.date_time) > new Date())[0])
            console.log("Appointments sorted", sorted)
        });
    };

    useEffect(()=>{
        getClients()
        getAppointments()
        setTimeout(()=>{
            setFormSubmitted(false)
        }, 500)
    },[formSubmitted])

    useEffect(()=>{
        if(appointments){
            setSelectedDateAppointments(appointments.filter(appt=> {
                return selectedDate.format('YYYY-MM-DD') === moment(appt.date_time).format('YYYY-MM-DD')
            }))
        }
    }, [selectedDate, appointments])
    

    return (
        <section className='homeContainer'> 
            <div>
                <HomeCalendar setSelectedDate={setSelectedDate}/>
                <HomeUpcomingEvents nextAppointment={nextAppointment}/>
            </div>
            <HomeAppointmentContainer selectedDate={selectedDate} selectedDateAppointments={selectedDateAppointments} caseload={caseload} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} appointmentFormOpen={appointmentFormOpen} changeAppointmentFormOpen={changeAppointmentFormOpen} draggedDivData={draggedDivData}/>
            <HomeClientContainer caseload={caseload} routerProps={routerProps} setDraggedDivData={setDraggedDivData} formSubmitted={formSubmitted}/>
        </section>
    )
};

export default ProviderHome;