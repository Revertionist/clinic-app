import React from 'react'
import { Modal, Form } from 'react-bootstrap'
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

interface RadioplogicalFindingsModalProps {
    show: boolean;
    onHide: () => void;
    patientid: string;
    onDataUpdate: () => {}
}

const RadiologicalFindingsModal: React.FC<RadioplogicalFindingsModalProps> = (props) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const radiologicalFindings = formData.get('radiological-findings') as string;

        try {
            const patientRef = doc(firestore, 'patients', props.patientid);
            await updateDoc(patientRef, {
                'ExaminationData.Radiological Findings': radiologicalFindings,
            });
            props.onDataUpdate();
            props.onHide()
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
                        Radiological Findings
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <textarea name="radiological-findings" className='form-control' placeholder='Radiological Findings' /> <br />
                        <input className='btn btn-danger' type="submit" value="Save" />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default RadiologicalFindingsModal