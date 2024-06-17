import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { firestore } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface TreatmentNoteModalProps {
    show: boolean;
    onHide: () => void;
    patientid: string;
}

const TreatmentNoteModal: React.FC<TreatmentNoteModalProps> = (props) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const treatmentDate = formData.get('treatment-date') as string;
        const treatmentDone = formData.get('treatment-done') as string;
        const remarks = formData.get('remarks') as string;

        try {
            const patientRef = doc(firestore, 'patients', props.patientid);
            const snap = await getDoc(patientRef);
            const data = snap.data();
            const TreatmentNote = data?.TreatmentNote || [];

            TreatmentNote.push({
                'Date': treatmentDate,
                'Treatment Done': treatmentDone,
                'Remarks': remarks
            });

            await updateDoc(patientRef, {
                ...data,
                TreatmentNote
            });

            props.onHide();
        } catch (error) {
            alert(error);
        }
    };
    const { show, onHide } = props;
    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Treatment Note
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <input className='form-control' type="date" name="treatment-date" required /> <br />
                        <textarea name="treatment-done" className='form-control' placeholder='Treatment Done' required /> <br />
                        <input className='form-control' placeholder='Remarks' type="text" name="remarks" required /> <br />
                        <input type="submit" className='btn btn-danger' value='Add' />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TreatmentNoteModal;