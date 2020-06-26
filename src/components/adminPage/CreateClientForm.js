import React, {useState, useEffect} from "react"
import {Input, DatePicker} from 'antd'
import moment from 'moment'
import providerClientManager from '../../modules/providerClientManager'

const CreateClientForm = ({routerProps}) => {

const [clientInfo, setClientInfo] = useState({})

const dropDownHandler = (e, value) => {
    const stateToChange = { ...clientInfo };
    stateToChange['gender'] = value
    setClientInfo(stateToChange)
}

const setCalendarDate = (value) =>{
    const stateToChange = { ...clientInfo };
    stateToChange['birth_date'] = value.format('YYYY-MM-DD');
    setClientInfo(stateToChange)
}

  const handleFieldChange = (evt) => {
    const stateToChange = {...clientInfo}
    const realId = evt.target.id.split('-')[1]
    stateToChange[realId] = evt.target.value
    setClientInfo(stateToChange)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
    //   This is how our content type is known
      const formData = {}
      formData['first_name'] = clientInfo.first_name
      formData['last_name'] = clientInfo.last_name
      formData['username'] = clientInfo.first_name + clientInfo.last_name + clientInfo.birth_date
      formData['email'] = clientInfo.email
      formData['phone_number'] = clientInfo.phone_number
      formData['address'] = clientInfo.address
      formData['height'] = clientInfo.height
      formData['weight'] = clientInfo.weight
      formData['gender'] = clientInfo.gender
      formData['birth_date'] = clientInfo.birth_date
      formData['password'] = clientInfo.password
      formData['is_staff'] = 0
    providerClientManager.createNewClient(formData).then((clientReturn) => {
        window.confirm('Client created successfully!')
        document.getElementById("createClient").reset();
    })
    };

  return (
       <section className='adminForm'>

   <form id='createClient' className='innerContent' onSubmit={handleSubmit} >
            <h1>Create a Client</h1>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="client-first_name" placeholder="First Name" maxLength="50" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="client-last_name" placeholder="Last Name" maxLength="50" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="email" id="client-email" placeholder="Email" maxLength="50" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="client-phone_number" placeholder="Phone Number" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="password" id="client-password" placeholder="Password" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="client-address" placeholder="Address" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="client-height" placeholder="Height" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="number" id="client-weight" placeholder="Weight" required />
            </fieldset>
            <fieldset>
            <DatePicker id='birth_date' onSelect={setCalendarDate} />
            </fieldset>
            <fieldset>
                <select onSelect={dropDownHandler} type="text" id="client-gender" placeholder="Gender" required >
                    <option disabled selected>Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
            </fieldset>
            <fieldset>
                <button className='clickable' type="Submit">Add Client</button>
            </fieldset>
        </form>
        </section>

  );
};

export default CreateClientForm;