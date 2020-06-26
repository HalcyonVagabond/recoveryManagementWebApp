import React, {useState} from 'react'
import {Tooltip} from 'reactstrap'
import {Icon} from 'semantic-ui-react'
import providerClientManager from '../../modules/providerClientManager'

const HomeClientCard = ({routerProps, unassignedClient, setDraggedDivData, setFormSubmitted}) => {
    const user = unassignedClient.user

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => {
        if(!tooltipOpen){
                setTooltipOpen(!tooltipOpen);
        }else {
            setTooltipOpen(false);
        }
    }

    function clickDetails(e){
        routerProps.history.push(`/clients/${unassignedClient.id}`)
    }

    function handleClientAssignment(){
        if(window.confirm('Add client to your caseload?')){
            providerClientManager.createProviderClient({client_id: unassignedClient.id}).then(resp=>{
                setFormSubmitted(true)
            })
        }
    }

    return (
        <div
            key={unassignedClient.id}
            id={unassignedClient.id}
            className='homeClientCard yellowDiv'
        >
            <p className='cardClientName' onClick={clickDetails} >{`${user.first_name} ${user.last_name} `}</p>

            <Icon name='plus square' className='clickable' id={`clientDetails-${unassignedClient.id}`} onClick={handleClientAssignment} />
            <Tooltip placement="top" isOpen={tooltipOpen} target={`clientDetails-${unassignedClient.id}`} toggle={toggle}>
              Assign Client to Caseload
            </Tooltip>
        </div>
    )
};

export default HomeClientCard;