import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { firestore } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface TreatmentModalProps {
    show: boolean;
    onHide: () => void;
    patientid: string;
    onDataUpdate: () => {}
}

const TreatmentModal: React.FC<TreatmentModalProps> = (props) => {
    const [planDetails, setPlanDetails] = useState('');
    const [status, setStatus] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const patientRef = doc(firestore, 'patients', props.patientid);
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
            props.onDataUpdate();
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
                    <textarea
                        name="treatment-plan-details"
                        placeholder='Plan Details'
                        className='form-control'
                        value={planDetails}
                        onChange={(e) => setPlanDetails(e.target.value)}
                    />
                    <br />
                    <label className='px-2'>Status</label>
                    <input
                        type="checkbox"
                        name="status"
                        checked={status}
                        onChange={(e) => setStatus(e.target.checked)}
                    />
                    <br /> <br />
                    <input type="submit" className='btn btn-danger' value='Add' />
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TreatmentModal;