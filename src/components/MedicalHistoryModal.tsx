import React, { useState, ChangeEvent, useEffect } from 'react'
import { Modal, Form, FormSelect } from 'react-bootstrap'
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
                        <FormSelect
                            aria-label="Default select example"
                            className='form-control'
                            name='cardiovascular'
                            value={formData.cardiovascular}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Respiratory:
                        <FormSelect
                            aria-label="Default select example"
                            name='respiratory'
                            value={formData.respiratory}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Gastrointestinal:
                        <FormSelect
                            aria-label="Default select example"
                            name='gastrointestinal'
                            value={formData.gastrointestinal}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Neutral:
                        <FormSelect
                            aria-label="Default select example"
                            name='neutral'
                            value={formData.neutral}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Hepatic:
                        <FormSelect
                            aria-label="Default select example"
                            name='hepatic'
                            value={formData.hepatic}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Renal:
                        <FormSelect
                            aria-label="Default select example"
                            name='renal'
                            value={formData.renal}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Endocrine:
                        <FormSelect
                            aria-label="Default select example"
                            name='endocrine'
                            value={formData.endocrine}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Diabetes:
                        <FormSelect
                            aria-label="Default select example"
                            name='diabetes'
                            value={formData.diabetes}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Allergies:
                        <textarea
                            name="allergies"
                            className='form-control'
                            placeholder='Allergic To'
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
