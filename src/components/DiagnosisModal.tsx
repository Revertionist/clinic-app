import { FC } from 'react';
import React, { useState, ChangeEvent } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

interface DiagnosisModalProps {
  show: boolean;
  onHide: () => void;
  patientid: string;
  onDataUpdate: () => {}
}

interface FormData {
  diagnosis: string
}

const DiagnosisModal: FC<DiagnosisModalProps> = (props) => {
  const [formData, setFormData] = useState<FormData>({
    diagnosis: ''
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const patientRef = doc(firestore, 'patients', props.patientid);
      await updateDoc(patientRef, {
        'ExaminationData.Diagnosis': formData.diagnosis
      });
      props.onDataUpdate();
      props.onHide();
    } catch (error) {
      alert(error);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value
    });
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
            <textarea name="diagnosis" placeholder='Diagnosis' className='form-control' value={formData.diagnosis} onChange={handleChange}/> <br />
            <input type="submit" className='btn btn-danger' value="Save" />
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DiagnosisModal;