import React, {useState, useEffect} from 'react'
import {Input, Spin, PageHeader, Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment'

const {Search} = Input;

const HomeClientContainer = ({caseload}) => {

    const [searchTerm, setSearchTerm] = useState(null);

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
                caseload.map(clientProvider=>{

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
                    </div>
                    );
                })
            );
        }
    };

    useEffect(()=>{
        displayCaseLoad()
    },[caseload, searchTerm])

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