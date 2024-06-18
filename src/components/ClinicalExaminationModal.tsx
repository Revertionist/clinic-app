import React from 'react'
import { Modal, Form } from 'react-bootstrap'
import { firestore } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface ClinicalExaminationModalProps {
    show: boolean;
    onHide: () => void;
    patientid: string;
    onDataUpdate: () => {}
}

const ClinicalExaminationModal: React.FC<ClinicalExaminationModalProps> = (props) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const extraOralExam = formData.get('extra-oral-examination') as string;
        const intraOralExam = formData.get('intra-oral-examination') as string;

        try {
            const patientRef = doc(firestore, 'patients', props.patientid);
            await updateDoc(patientRef, {
                'ExaminationData.Clinical Examination': {
                    'Extra Oral Examination': extraOralExam,
                    'Intra Oral Examination': intraOralExam,
                },
            });
            props.onDataUpdate()
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
                        Clinical Examination
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <textarea name="extra-oral-examination" className='form-control' placeholder='Extra Oral Examination' /> <br />
                        <textarea name="intra-oral-examination" className='form-control' placeholder='Intra Oral Examination' /> <br />
                        <input type="submit" className='btn btn-danger' value="Save" />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ClinicalExaminationModal