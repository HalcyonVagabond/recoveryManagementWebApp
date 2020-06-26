import React, {useState, useEffect} from "react"
import {Input, DatePicker} from 'antd'
import moment from 'moment'
import providerClientManager from '../../modules/providerClientManager'

const CreateClientForm = ({routerProps}) => {

const [providerInfo, setProviderInfo] = useState({})


const dropDownHandler = (value) => {
    const stateToChange = { ...providerInfo };
    stateToChange['provider_type_id'] = value
    setProviderInfo(stateToChange)
}

  const handleFieldChange = (evt) => {
    const stateToChange = {...providerInfo}
    stateToChange[evt.target.id] = evt.target.value
    setProviderInfo(stateToChange)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
    //   This is how our content type is known
      const formData = {}
      formData['first_name'] = providerInfo.first_name
      formData['last_name'] = providerInfo.last_name
      formData['username'] = providerInfo.first_name + providerInfo.last_name + providerInfo.provider_type_id
      formData['email'] = providerInfo.email
      formData['password'] = providerInfo.password
      formData['phone_number'] = providerInfo.phone_number
      formData['practice_name'] = providerInfo.practice_name
      formData['practice_address'] = providerInfo.practice_address
      formData['provider_type_id'] = providerInfo.provider_type_id
      formData['is_staff'] = 1
    providerClientManager.createNewProvider(formData).then((providerReturn) => {
        window.confirm('Provider created successfully!')
        document.getElementById("createProvider").reset();
    })
    };

  return (
       <section className='adminForm'>
   <form id='createProvider' className='innerContent' onSubmit={handleSubmit} >
            <h1>Create a Provider</h1>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="first_name" placeholder="First Name" maxLength="50" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="last_name" placeholder="Last Name" maxLength="50" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="email" id="email" placeholder="Email" maxLength="50" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="phone_number" placeholder="Phone Number" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="password" id="password" placeholder="Password" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="practice_name" placeholder="Practice Name" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="practice_address" placeholder="Practice Address" required />
            </fieldset>
            <fieldset>
                <select onChange={handleFieldChange} id="provider_type_id" placeholder="Provider Type" onSelect={dropDownHandler} required >
                    <option disabled selected>Provider Type</option>
                    <option value={1} >Medical Doctor</option>
                    <option value={2}>Psychiatrist</option>
                    <option value={3}>Psychologist</option>
                    <option value={4}>Therapist</option>
                    <option value={5}>Social Worker</option>
                    <option value={6}>Nurse</option>
                </select>
            </fieldset>
            <fieldset>
                <button className='clickable' type="Submit">Add Provider</button>
            </fieldset>
        </form>
        </section>
  );
};

export default CreateClientForm;