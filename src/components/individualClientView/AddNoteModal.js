import React, {useEffect, useState} from 'react'
import {Transition, TextArea, Button} from 'semantic-ui-react'
import moment from 'moment'
import noteManager from '../../modules/noteManager'

const HomeAppointmentFormModal = ({client, noteFormOpen, changeNoteFormOpen, setFormSubmitted}) => {
    const [formValues, setFormValues] = useState({})
    const [noteTemplates, setNoteTemplates] = useState(null)



    function getNoteTemplates(){
        noteManager.getNoteTemplates().then(resp=>console.log(resp))
    }

    const handleFieldChange = (evt) => {
        const stateToChange = { ...formValues };
        stateToChange[evt.target.id] = evt.target.value;
        setFormValues(stateToChange);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const formData = new FormData();
        formData.append('client_id', client.id);
        formData.append('date_time', moment().format());
        formData.append('note_template_id', 1);
        formData.append('content', formValues.content);
      
      noteManager.postNewNote(formData).then((noteReturn) => {
          console.log(noteReturn)
          setFormSubmitted(true)
          changeNoteFormOpen(false)
          document.getElementById('greyBackground').classList.toggle('hidden')
      })
      
    }
    
    useEffect(()=>{
        getNoteTemplates()
    },[])

    return (
        
        <div id='greyBackground' className='hidden'>
        <Transition visible={noteFormOpen} animation='drop' duration={500}>
            <div className='noteFormModal'>
                <form className='innerContent' onSubmit={handleSubmit}>
                    <h3 className='title'>New Note</h3>
                    <TextArea id='content' onChange={handleFieldChange}/>
                    <div className='apptFormButtons field'>
                        <Button type='submit'>
                                Save
                        </Button>
                        <Button onClick={(e)=>{
                            e.preventDefault()
                            changeNoteFormOpen(false)
                            document.getElementById('greyBackground').classList.toggle('hidden')
                        }}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </Transition>
        </div>
    )
};

export default HomeAppointmentFormModal;