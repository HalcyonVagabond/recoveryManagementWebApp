import React, {useState, useEffect} from 'react'
import {Input, Spin, PageHeader, Avatar} from 'antd'
import HomeClientCard from './HomeClientCard'

const {Search} = Input;

const HomeClientContainer = ({routerProps, caseload, setDraggedDivData, formSubmitted}) => {

    const [searchTerm, setSearchTerm] = useState(null);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    function dragStart(e){
        const target = e.target;
        e.dataTransfer.setData('client_id', target.id);
        
    };
    function dragOver(e){
        e.stopPropagation();
    };

    function displayCaseLoad () {
        if (!caseload) {
            return (
                <>
                <h1>Loading clients</h1>
                <Spin size="large" />
                </>
            );
        } else if (caseload && !searchTerm){
            return (
                caseload.map(clientProvider=><HomeClientCard key={clientProvider.client_id} clientProvider={clientProvider} routerProps={routerProps} setDraggedDivData={setDraggedDivData}/>)
            );
        }
    };

    useEffect(()=>{
        displayCaseLoad()
        console.log('supposed to reload clients')
    },[caseload, searchTerm, formSubmitted])

    return (
        <article className='homeClientContainer boxContainer centerContent'>
            <PageHeader  title='Client List' avatar={{ src: require('../../images/profileIcon.png')}} />
            <div className='clientListContainer'>
                <Search placeholder="search client" onSearch={value => console.log(value)} enterButton />
                {displayCaseLoad()}
            </div>
            <div className='greenDiv ant-alert clickable' draggable={true}>
                <h4>Add Meeting</h4>
                <p>Drag and drop to add a meeting to your calendar</p>
            </div>
            <div className='yellowDiv ant-alert clickable' draggable={true}>   
                <h4>Add To Do Item</h4>
                <p>Drag and drop to add a "To Do" to your calendar</p>
            </div>
        </article>
    )
};

export default HomeClientContainer;