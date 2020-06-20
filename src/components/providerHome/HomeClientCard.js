import React, {useState, useEffect} from 'react'
import {Tooltip} from 'reactstrap'


const HomeClientCard = ({routerProps, clientProvider}) => {
    const client = clientProvider.client
    const user = clientProvider.client.user

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => {
        if(!tooltipOpen){
            setTimeout(()=>{
                setTooltipOpen(!tooltipOpen);
            }, 1000)
        }else {
            setTooltipOpen(false);
        }
        console.log("111111", client)
        console.log("22222", user)
    }

    function clickDetails(e){
        routerProps.history.push(`/clients/${clientProvider.client_id}`)
    }

    function dragStart(e){
        const target = e.target;
        e.dataTransfer.setData('client_id', target.id);
        setTimeout(()=>{
            target.style.display = 'none';
        },0);
    };
    function dragOver(e){
        e.stopPropagation();
    };

    return (
        <div
            draggable={true}
            onDragStart={dragStart}
            onDragOver={dragOver}
            key={clientProvider.client_id}
            id={clientProvider.client_id}
            className='homeClientCard lightBlueDiv .ant-alert'
        >
            {`${clientProvider.client.user.first_name} ${clientProvider.client.user.last_name} `}

            <span style={{textDecoration: "underline", color:"blue"}} onClick={clickDetails} id={`clientDetails-${clientProvider.client_id}`}>details</span>
            <Tooltip placement="top" isOpen={tooltipOpen} target={`clientDetails-${clientProvider.client_id}`} toggle={toggle}>
              View {user.first_name}'s details
            </Tooltip>
        </div>
    )
};

export default HomeClientCard;