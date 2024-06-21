import React, { useState, ChangeEvent, useEffect } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { firestore } from '../lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

interface ClinicalExaminationModalProps {
    show: boolean;
    onHide: () => void;
    patientid: string;
    onDataUpdate: () => void;
}

interface FormData {
    extraOralExam: string,
    intraOralExam: string
}

const ClinicalExaminationModal: React.FC<ClinicalExaminationModalProps> = (props) => {
    const [formData, setFormData] = useState<FormData>({
        extraOralExam: '',
        intraOralExam: ''
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const patientRef = doc(firestore, 'patients', props.patientid);
            await updateDoc(patientRef, {
                'ExaminationData.Clinical Examination': {
                    'Extra Oral Examination': formData.extraOralExam,
                    'Intra Oral Examination': formData.intraOralExam,
                },
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

    useEffect(() => {
        const fetchData = async () => {
            if (props.patientid) {
                const patientRef = doc(firestore, 'patients', props.patientid);
                const patientSnap = await getDoc(patientRef);

                if (patientSnap.exists()) {
                    const data = patientSnap.data();
                    setFormData({
                        extraOralExam: data.ExaminationData?.['Clinical Examination']?.['Extra Oral Examination'] || '',
                        intraOralExam: data.ExaminationData?.['Clinical Examination']?.['Intra Oral Examination'] || ''
                    });
                } else {
                    setFormData({
                        extraOralExam: '',
                        intraOralExam: ''
                    });
                }
            }
        };

        if (props.show) {
            fetchData();
        }
    }, [props.patientid, props.show]);

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
                        <textarea 
                            name="extraOralExam" 
                            className='form-control' 
                            placeholder='Extra Oral Examination' 
                            value={formData.extraOralExam}
                            onChange={handleChange} 
                        /> 
                        <br />
                        <textarea 
                            name="intraOralExam" 
                            className='form-control' 
                            placeholder='Intra Oral Examination' 
                            value={formData.intraOralExam}
                            onChange={handleChange} 
                        /> 
                        <br />
                        <input type="submit" className='btn btn-danger' value="Save" />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ClinicalExaminationModal
