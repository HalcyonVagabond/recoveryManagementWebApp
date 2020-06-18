import React, {useState} from 'react'
import { Calendar, Alert } from 'antd';
import moment from 'moment';

const HomeCalendar = ({setSelectedDate}) => {
    const [value, setValue] = useState(moment())
    const [selectedValue, changeSelectedValue] = useState(moment())


    const onSelect = value => {
        changeSelectedValue(value)
        setSelectedDate(moment(value).format('YYYY-MM-DD'))
    };

    const onPanelChange = value => {
      setValue(value)
    };

    return (
      <article className='homeCalendarContainer boxContainer'>
        <Alert
          message={`You selected date: ${selectedValue && selectedValue.format("dddd, MMMM Do YYYY, h:mm a")}`}
        />
        <Calendar fullscreen={false} value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
      </article>
    );
  

};

export default HomeCalendar;