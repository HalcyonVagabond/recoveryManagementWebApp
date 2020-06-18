import React, {useState, useEffect} from 'react'
import patientClientManager from '../../modules/patientClientManager'
import appointmentManager from '../../modules/appointmentManager'
import HomeCalendar from './HomeCalendar'
import HomeUpcomingEvents from './HomeUpcomingEvents'
import HomeAppointmentContainer from './HomeAppointmentContainer'
import HomeClientContainer from './HomeClientContainer'
import moment from 'moment'
import './ProviderHome.css'

const ProviderHome = () => {
    const [caseload, setCaseload] = useState(null);
    const [appointments, setAppointments] = useState(null);
    const [nextAppointment, setNextAppointment] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment())
    const [selectedDateAppointments, setSelectedDateAppointments] = useState(null)
    

    function getClients(){
        patientClientManager.getProviderClients().then(resp=>{
            setCaseload(resp)
            console.log("Clients", resp)
        });
    };

    function getAppointments(){
        appointmentManager.getAppointments().then(resp=>{

            const sorted = resp.sort(function(a, b) {
                return new Date(a.date_time) - new Date(b.date_time) ;
            });
            setAppointments(sorted)
            setSelectedDateAppointments(sorted.filter(appt=> moment().format('YYYY-MM-DD') === moment(appt.date_time).format('YYYY-MM-DD')))
            setNextAppointment(sorted.filter(appt => new Date(appt.date_time) > new Date())[0])
            console.log("Appointments", resp)
        });
    };

    useEffect(()=>{
        getClients()
        getAppointments()
    },[])

    useEffect(()=>{
        console.log("selected date", selectedDate)
    }, [selectedDate])
    

    return (
        <section className='homeContainer'> 
            <div>
                <HomeCalendar setSelectedDate={setSelectedDate}/>
                <HomeUpcomingEvents nextAppointment={nextAppointment}/>
            </div>
            <HomeAppointmentContainer selectedDate={selectedDate} />
            <HomeClientContainer caseload={caseload}/>
        </section>
    )
};

export default ProviderHome;