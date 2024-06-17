import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { firestore } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface TreatmentModalProps {
    show: boolean;
    onHide: () => void;
    patientId: string;
}

const TreatmentModal: React.FC<TreatmentModalProps> = (props) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const planDetails = formData.get('treatment-plan-details') as string;
        const status = formData.get('status') ? true : false;

        try {
            const patientRef = doc(firestore, 'patients', props.patientId);
            const snap = await getDoc(patientRef);
            const data = snap.data();
            const TreatmentPlan = data?.TreatmentPlan || [];

            TreatmentPlan.push({
                'Plan Details': planDetails,
                'Status': status
            });

            await updateDoc(patientRef, {
                ...data,
                TreatmentPlan
            });

            props.onHide();
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Treatment Plan
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* <input type='text' className='form-control' placeholder='Plan Details' name='treatment-plan-details' /> <br /> */}
                    <textarea name="treatment-plan-details" placeholder='Plan Details' className='form-control' /> <br />
                    <label className='px-2'>Status</label>
                    <input type="checkbox" name="status" /> <br /> <br />
                    <input type="submit" className='btn btn-danger' value='Add' />
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TreatmentModal;
