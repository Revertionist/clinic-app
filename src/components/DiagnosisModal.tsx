import { FC } from 'react';
import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

interface DiagnosisModalProps {
  show: boolean;
  onHide: () => void;
  patientId: string;
}

const DiagnosisModal: FC<DiagnosisModalProps> = (props) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const diagnosis = formData.get('diagnosis') as string;

    try {
      const patientRef = doc(firestore, 'patients', props.patientId);
      await updateDoc(patientRef, {
        'ExaminationData.Diagnosis': diagnosis
      });
      alert('Diagnosis added successfully');
      props.onHide();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Diagnosis
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <textarea name="diagnosis" placeholder='Diagnosis' className='form-control' /> <br />
            <input type="submit" className='btn btn-danger' value="Save" />
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DiagnosisModal;
