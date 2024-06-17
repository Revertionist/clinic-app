import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { firestore } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface DentalHistoryModalProps {
show: boolean;
onHide: () => void;
patientid: string;
}

interface FormData {
chiefComplaint: string;
illnessHistory: string;
dentalHistory: string;
}

const DentalHistoryModal: React.FC<DentalHistoryModalProps> = (props) => {
const [formData, setFormData] = useState<FormData>({
chiefComplaint: '',
illnessHistory: '',
dentalHistory: ''
});

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const patientRef = doc(firestore, 'patients', props.patientid);
        await updateDoc(patientRef, {
            'ExaminationData.Dental History': {
                'Chief Complaint': formData.chiefComplaint,
                'History Of Present Illness': formData.illnessHistory,
                'Past Dental History': formData.dentalHistory,
            },
        });
        alert("Dental History added successfully");
        props.onHide();
    } catch (error) {
        alert(error)
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
                    Dental History
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <input className='form-control' type='text' placeholder='Chief Complaint' name='chiefComplaint' value={formData.chiefComplaint} onChange={handleChange} /> <br />
                    <input className='form-control' type='text' placeholder='History of Present Illness' name='illnessHistory' value={formData.illnessHistory} onChange={handleChange} /> <br />
                    <input className='form-control' type='text' placeholder='Past Dental History' name='dentalHistory' value={formData.dentalHistory} onChange={handleChange} /> <br />
                    <input type='submit' className='btn btn-danger' value="Save" />
                </Form>
            </Modal.Body>
        </Modal>
    </div>
)
}

export default DentalHistoryModal;