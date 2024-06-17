import React from 'react'
import { Modal, Form, FormSelect } from 'react-bootstrap'
import { firestore } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface MedicalHistoryModalProps {
    show: boolean;
    onHide: () => void;
    patientid: string;
}

const MedicalHistoryModal: React.FC<MedicalHistoryModalProps> = (props) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cardiovascular = formData.get('cardiovascular') as string;
        const respiratory = formData.get('respiratory') as string;
        const gastrointestinal = formData.get('gastrointestinal') as string;
        const neutral = formData.get('neutral') as string;
        const hepatic = formData.get('hepatic') as string;
        const renal = formData.get('renal') as string;
        const endocrine = formData.get('endocrine') as string;
        const diabetes = formData.get('diabetes') as string;
        const allergies = formData.get('allergies') as string

        try {
            const patientRef = doc(firestore, 'patients', props.patientid);
            await updateDoc(patientRef, {
                'ExaminationData.Medical History': {
                    'Cardiovascular': cardiovascular,
                    'Respiratory': respiratory,
                    'Gastrointestinal': gastrointestinal,
                    'Neutral': neutral,
                    'Hepatic': hepatic,
                    'Renal': renal,
                    'Endocrine': endocrine,
                    'Diabetes': diabetes,
                    'Allergic To': allergies,
                }
            });
            alert("Medical History added sucessfully");
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
                        Medical History
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        Cardiovascular:
                        <FormSelect aria-label="Default select example" className='form-control' name='cardiovascular'>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Respiratory:
                        <FormSelect aria-label="Default select example" name='respiratory'>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Gastrointestinal:
                        <FormSelect aria-label="Default select example" name='gastrointestinal'>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Neutral:
                        <FormSelect aria-label="Default select example" name='neutral'>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Hepatic:
                        <FormSelect aria-label="Default select example" name='hepatic'>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Renal:
                        <FormSelect aria-label="Default select example" name='renal'>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Endocrine:
                        <FormSelect aria-label="Default select example" name='endocrine'>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        Diabetes:
                        <FormSelect aria-label="Default select example" name='diabetes'>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </FormSelect> <br />
                        <textarea name="allergies" className='form-control' placeholder='Allergic To' /> <br />
                        <input type="submit" className='btn btn-danger' value="Save" />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MedicalHistoryModal