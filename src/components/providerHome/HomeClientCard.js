import React, {useState} from 'react'
import {Tooltip} from 'reactstrap'
import {Icon} from 'semantic-ui-react'
import providerClientManager from '../../modules/providerClientManager'

const HomeClientCard = ({routerProps, clientProvider, setDraggedDivData, setFormSubmitted}) => {
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

    function handleUnassign(){
        if(window.confirm('Are you sure you want to unassign this client?')){
            providerClientManager.deleteProviderClient(clientProvider.id).then(resp=>{
                setFormSubmitted(true)
            })
        }
    }

    function dragStart(e){
        const target = e.target;
        setDraggedDivData(clientProvider)
        e.dataTransfer.setData('client_id', target.id);

    };
    

    return (
        <div
            draggable={true}
            onDragStart={dragStart}
            // onDragOver={dragOver}
            key={clientProvider.client_id}
            id={clientProvider.client_id}
            className='homeClientCard caseloadCard lightBlueDiv .ant-alert'
        >
            <p className='cardClientName' onClick={clickDetails} >{`${clientProvider.client.user.first_name} ${clientProvider.client.user.last_name} `}</p>

            <Icon name='minus square' className='clickable' id={`clientDetails-${clientProvider.client_id}`} onClick={handleUnassign}/>
            <Tooltip placement="top" isOpen={tooltipOpen} target={`clientDetails-${clientProvider.client_id}`} toggle={toggle}>
              Unassign Client
            </Tooltip>
        </div>
    )
};

export default HomeClientCard;