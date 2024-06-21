import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

interface RadiologicalFindingsModalProps {
    show: boolean;
    onHide: () => void;
    patientid: string;
    onDataUpdate: () => void;
}

interface FormData {
    radiologicalFindings: string;
}

const RadiologicalFindingsModal: React.FC<RadiologicalFindingsModalProps> = (props) => {
    const [formData, setFormData] = useState<FormData>({
        radiologicalFindings: '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const patientRef = doc(firestore, 'patients', props.patientid);
            await updateDoc(patientRef, {
                'ExaminationData.Radiological Findings': formData.radiologicalFindings,
            });
            props.onDataUpdate();
            props.onHide();
        } catch (error) {
            alert(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (props.patientid) {
                const patientRef = doc(firestore, 'patients', props.patientid);
                const patientSnap = await getDoc(patientRef);

                if (patientSnap.exists()) {
                    const data = patientSnap.data();
                    setFormData({
                        radiologicalFindings: data.ExaminationData?.['Radiological Findings'] || '',
                    });
                } else {
                    setFormData({
                        radiologicalFindings: '',
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
                        Radiological Findings
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <textarea
                            name="radiologicalFindings"
                            className="form-control"
                            placeholder="Radiological Findings"
                            value={formData.radiologicalFindings}
                            onChange={handleChange}
                        /> <br />
                        <input className="btn btn-danger" type="submit" value="Save" />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default RadiologicalFindingsModal;
