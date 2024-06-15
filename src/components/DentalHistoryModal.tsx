import React from 'react'
import { Modal, Form } from 'react-bootstrap'
import { firestore } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface DentalHistoryModalProps {
    show: boolean;
    onHide: () => void;
    patientId: string;
}

const DentalHistoryModal: React.FC<DentalHistoryModalProps> = (props) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const chiefComplaint = formData.get('chief-complaint') as string;
        const illnessHistory = formData.get('illness-history') as string;
        const dentalHistory = formData.get('dental-history') as string;

        try {
            const patientRef = doc(firestore, 'patients', props.patientId);
            await updateDoc(patientRef, {
                'ExaminationData.Dental History': {
                    'Chief Complaint': chiefComplaint,
                    'History Of Present Illness': illnessHistory,
                    'Past Dental History': dentalHistory,
                },
            });
            alert("Dental History added sucessfully");
            props.onHide();
        } catch (error) {
            alert(error)
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
                        Dental History
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <input className='form-control' type='text' placeholder='Chief Complaint' name='chief-complaint' /> <br />
                        <input className='form-control' type='text' placeholder='History of Present Illness' name='illness-history' /> <br />
                        <input className='form-control' type='text' placeholder='Past Dental History' name='dental-history' /> <br />
                        <input type='submit' className='btn btn-danger' value="Save" />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DentalHistoryModal
