import React from 'react'
import { Alert } from 'antd';
import moment from 'moment';

const HomeAppointmentList = ({selectedDate}) => {

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
                timeDivs.push(
                    <div className='timelineDivs' 
                    id={`${hour}:${minute}`} 
                    key={`${hour}:${minute}`} 
                    onDragEnter={e=>document.getElementById(e.target.id).style.backgroundColor = 'var(--mainDarkBlue)'}
                    onDragLeave={e=>document.getElementById(e.target.id).style.backgroundColor = 'white'}
                    onDrop={drop}
                    onDragOver={dragOver}
                    > 
                        {i<=12 ? `${i}:${minute}am`: `${i-12}:${minute}pm`} 
                    </div>
                )
            };
        };
        return timeDivs;
    };

    console.log(document.getElementsByClassName('timelineDivs'))

    // document.getElementsByClassName('timelineDivs').forEach(div=>{
    //     div.addEventListener('dragover',(e)=>{
    //         e.preventDefault();
    //         this.style.backgroundColor = 'lightgrey'
    //     })
    // })

    return (
        <section className='homeAppointmentContainer boxContainer centerContent'>
            <h3>Appointments</h3>
            <p> {selectedDate.format("dddd, MMMM Do YYYY")} </p>
            {generateTimeDivs()}
        </section>
    );
};

export default HomeAppointmentList;