import React, {useState, useEffect} from 'react'
import patientClientManager from '../../modules/providerClientManager'
import appointmentManager from '../../modules/appointmentManager'
import HomeCalendar from './HomeCalendar'
import HomeUpcomingEvents from './HomeUpcomingEvents'
import HomeAppointmentContainer from './HomeAppointment/HomeAppointmentContainer'
import HomeClientContainer from './HomeClientContainer'
import moment from 'moment'
import './ProviderHome.css'

const ProviderHome = ({routerProps, formSubmitted, setFormSubmitted}) => {
    const [caseload, setCaseload] = useState(null);
    const [unassignedClients, setUnassignedClients] = useState(null)
    const [appointments, setAppointments] = useState(null);
    const [nextAppointment, setNextAppointment] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment())
    const [selectedDateAppointments, setSelectedDateAppointments] = useState(null)
    const [appointmentFormOpen, changeAppointmentFormOpen]=useState(false)
    const [draggedDivData, setDraggedDivData] = useState(null)

    function getProviderClients(){
        patientClientManager.getProviderClients().then(resp=>{
            setCaseload(resp)
        });
    };
    function getUnassignedClients(){
        patientClientManager.getUnassignedClients().then(resp=>{
            setUnassignedClients(resp)
        });
    };

    function getAppointments(){
        appointmentManager.getAppointments().then(resp=>{
            console.log(typeof resp)
            console.log(resp)
            if(!resp['detail']){
                const sorted = resp.sort(function(a, b) {
                    return new Date(a.date_time) - new Date(b.date_time) ;
                });
                setAppointments(sorted)
                setNextAppointment(sorted.filter(appt => new Date(appt.date_time) > new Date())[0])
            }
        });
    };

    useEffect(()=>{
        getProviderClients()
        getUnassignedClients()
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
                <HomeUpcomingEvents nextAppointment={nextAppointment} setFormSubmitted={setFormSubmitted} formSubmitted={formSubmitted}/>
            </div>
            <div className='appointmentClientContainer'>
            <HomeAppointmentContainer selectedDate={selectedDate} selectedDateAppointments={selectedDateAppointments} caseload={caseload} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} appointmentFormOpen={appointmentFormOpen} changeAppointmentFormOpen={changeAppointmentFormOpen} draggedDivData={draggedDivData}/>
            <HomeClientContainer caseload={caseload} unassignedClients={unassignedClients} routerProps={routerProps} setDraggedDivData={setDraggedDivData} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}/>
            </div>
        </section>
    )
};

export default ProviderHome;