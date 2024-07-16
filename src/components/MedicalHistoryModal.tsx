import React, { useState, ChangeEvent, useEffect } from 'react'
import { Modal, Form, textarea } from 'react-bootstrap'
import { firestore } from '../lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

interface MedicalHistoryModalProps {
    show: boolean;
    onHide: () => void;
    patientid: string;
    onDataUpdate: () => void;
}

interface FormData {
    cardiovascular: string,
    respiratory: string,
    gastrointestinal: string,
    neutral: string,
    hepatic: string,
    renal: string,
    endocrine: string,
    diabetes: string,
    allergies: string
}

const MedicalHistoryModal: React.FC<MedicalHistoryModalProps> = (props) => {
    const [formData, setFormData] = useState<FormData>({
        cardiovascular: '',
        respiratory: '',
        gastrointestinal: '',
        neutral: '',
        hepatic: '',
        renal: '',
        endocrine: '',
        diabetes: '',
        allergies: ''
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const patientRef = doc(firestore, 'patients', props.patientid);
            await updateDoc(patientRef, {
                'ExaminationData.Medical History': formData
            });
            props.onDataUpdate();
            props.onHide();
        } catch (error) {
            alert(error);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
                        cardiovascular: data.ExaminationData?.['Medical History']?.['cardiovascular'] || '',
                        respiratory: data.ExaminationData?.['Medical History']?.['respiratory'] || '',
                        gastrointestinal: data.ExaminationData?.['Medical History']?.['gastrointestinal'] || '',
                        neutral: data.ExaminationData?.['Medical History']?.['neutral'] || '',
                        hepatic: data.ExaminationData?.['Medical History']?.['hepatic'] || '',
                        renal: data.ExaminationData?.['Medical History']?.['renal'] || '',
                        endocrine: data.ExaminationData?.['Medical History']?.['endocrine'] || '',
                        diabetes: data.ExaminationData?.['Medical History']?.['diabetes'] || '',
                        allergies: data.ExaminationData?.['Medical History']?.['allergies'] || '',
                    });
                } else {
                    setFormData({
                        cardiovascular: '',
                        respiratory: '',
                        gastrointestinal: '',
                        neutral: '',
                        hepatic: '',
                        renal: '',
                        endocrine: '',
                        diabetes: '',
                        allergies: ''
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
                        Medical History
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        Cardiovascular:
                        <textarea
                            className='form-control'
                            className='form-control'
                            name='cardiovascular'
                            value={formData.cardiovascular}
                            onChange={handleChange} />
                        <br />
                        Respiratory:
                        <textarea
                            className='form-control'
                            name='respiratory'
                            value={formData.respiratory}
                            onChange={handleChange}
                        /> <br />
                        Gastrointestinal:
                        <textarea
                            className='form-control'
                            name='gastrointestinal'
                            value={formData.gastrointestinal}
                            onChange={handleChange}
                        /><br />
                        Neutral:
                        <textarea
                            className='form-control'
                            name='neutral'
                            value={formData.neutral}
                            onChange={handleChange}
                        /> <br />
                        Hepatic:
                        <textarea
                            className='form-control'
                            name='hepatic'
                            value={formData.hepatic}
                            onChange={handleChange}
                        /> <br />
                        Renal:
                        <textarea
                            className='form-control'
                            name='renal'
                            value={formData.renal}
                            onChange={handleChange}
                        /> <br />
                        Endocrine:
                        <textarea
                            className='form-control'
                            name='endocrine'
                            value={formData.endocrine}
                            onChange={handleChange}
                        /> <br />
                        Diabetes:
                        <textarea
                            className='form-control'
                            name='diabetes'
                            value={formData.diabetes}
                            onChange={handleChange}
                        /> <br />
                        Allergies:
                        <textarea
                            name="allergies"
                            className='form-control'
                            value={formData.allergies}
                            onChange={handleChange}
                        /> <br />
                        <input type="submit" className='btn btn-danger' value="Save" />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MedicalHistoryModal;
