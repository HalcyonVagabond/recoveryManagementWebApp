import React, { useState } from 'react'
import { Modal, Button } from 'antd'

const NoteCard = () => {

    const [visible, setState] = useState(false)

    const showModal = () => {
        setState(true);
    };

    const handleOk = e => {
        setState(false);
    };

    const handleCancel = e => {
        setState(false);
    };

    const text ="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    return (
        <div>
          <Button type="primary" onClick={showModal}>
            Details
          </Button>
          <Modal
            title="Title or Type of Note"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <h3>Patient: Bon Scott</h3>
            <h3>Provider: Dr. Author Person</h3>
            <h4>05/15/2020</h4>
            <p>{text}</p>
          </Modal>
        </div>
      );
};

export default NoteCard;