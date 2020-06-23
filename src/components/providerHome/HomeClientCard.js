import React, {useState, useEffect} from 'react'
import {Tooltip} from 'reactstrap'


const HomeClientCard = ({routerProps, clientProvider, setDraggedDivData}) => {
    const client = clientProvider.client
    const user = clientProvider.client.user

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => {
        if(!tooltipOpen){
                setTooltipOpen(!tooltipOpen);
        }else {
            setTooltipOpen(false);
        }
    }

    function clickDetails(e){
        routerProps.history.push(`/clients/${clientProvider.client_id}`)
    }

    function dragStart(e){
        const target = e.target;
        console.log(e.target.value)
        setDraggedDivData(clientProvider)
        e.dataTransfer.setData('client_id', target.id);

    };
    // function dragOver(e){
    //     e.stopPropagation();
    // };

    return (
        <div
            draggable={true}
            onDragStart={dragStart}
            // onDragOver={dragOver}
            key={clientProvider.client_id}
            id={clientProvider.client_id}
            className='homeClientCard lightBlueDiv .ant-alert'
        >
            {`${clientProvider.client.user.first_name} ${clientProvider.client.user.last_name} `}

            <span style={{textDecoration: "underline", color:"var(--mainMediumBlue)"}} onClick={clickDetails} id={`clientDetails-${clientProvider.client_id}`}>details</span>
            <Tooltip placement="top" isOpen={tooltipOpen} target={`clientDetails-${clientProvider.client_id}`} toggle={toggle}>
              View {user.first_name}'s details
            </Tooltip>
        </div>
    )
};

export default HomeClientCard;