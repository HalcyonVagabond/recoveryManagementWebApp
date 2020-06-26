import React, {useEffect, useState} from 'react'
import {Transition, TextArea, Button} from 'semantic-ui-react'
import moment from 'moment'
import noteManager from '../../modules/noteManager'

const HomeAppointmentFormModal = ({client, setFormSubmitted, note}) => {
    const [formValues, setFormValues] = useState({})
    const [noteTemplates, setNoteTemplates] = useState(null)
    const [editFormOpen, setEditFormOpen] = useState(false)



    function getNoteTemplates(){
        noteManager.getNoteTemplates().then(resp=>setNoteTemplates(resp))
    }

    const handleFieldChange = (evt) => {
        const stateToChange = { ...formValues };
        stateToChange[evt.target.id] = evt.target.value;
        setFormValues(stateToChange);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const editedNote = {}
        editedNote['id'] =  note.id;
        editedNote['client_id'] =  client.id;
        editedNote['date_time'] =  moment().format();
        editedNote['note_template_id'] =  1;
        editedNote['content'] =  formValues.content;

        noteManager.updateNote(editedNote, note.id).then((noteReturn) => {
            setFormSubmitted(true)
            setEditFormOpen(false)
            document.getElementById(`greyBackground-${note.id}`).classList.toggle('hidden')
        })
    }

    
    useEffect(()=>{
        getNoteTemplates()
    },[])

    return (
    <>
        <Button onClick={()=>{
            setEditFormOpen(true);
            document.getElementById(`greyBackground-${note.id}`).classList.toggle('hidden')
        }}>
            Edit
        </Button>
        <div id={`greyBackground-${note.id}`} className='greyBackground hidden'>
        <Transition visible={editFormOpen} animation='drop' duration={500}>
            <div className='noteFormModal'>
                <form className='innerContent' onSubmit={handleSubmit}>
                <h3 className='title'>Edit Note</h3>
                    <TextArea id='content' onChange={handleFieldChange}>
                        {note.content}
                    </TextArea>
                    <div className='apptFormButtons field'>
                        <Button type='submit'>
                                Save
                        </Button>
                        <Button onClick={(e)=>{
                            e.preventDefault()
                            setEditFormOpen(false)
                            document.getElementById(`greyBackground-${note.id}`).classList.toggle('hidden')
                        }}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </Transition>
        </div>
    </>
    )
};

export default HomeAppointmentFormModal;