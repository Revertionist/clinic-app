import { FC } from 'react';
import { Modal, Form, FormSelect } from 'react-bootstrap';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

interface PatientModalProps {
    show: boolean;
    onHide: () => void;
    onDataUpdate: () => void;
    firstpatient: boolean;
}

const PatientModal: FC<PatientModalProps> = (props) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let pnr = '';
        if (props.firstpatient) {
            pnr = formData.get('pnr-no') as string;
        } else {
            pnr = "prev";
        }

        const person = {
            pnrNo: pnr,
            patientName: formData.get('patient-name') as string,
            dateOfBirth: formData.get('date-of-birth') as string,
            bloodGroup: formData.get('blood-group') as string,
            gender: formData.get('gender') as string,
            maritalStatus: formData.get('marital-status') as string,
            occupation: formData.get('occupation') as string,
            nationality: formData.get('nationality') as string,
            address: formData.get('address') as string,
            contact: formData.get('contact') as string,
            email: formData.get('email') as string,
            guardian: formData.get('guardian') as string,
            status: formData.get('status') ? true : false,
        };

        try {
            await addDoc(collection(firestore, "patients"), person);
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
                    Enter Patient Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {props.firstpatient && (
                        <div>
                            <input type="text" name='pnr-no' placeholder='PNR No.' className='form-control' required />
                            <br />
                        </div>
                    )}
                    <input type="text" name='patient-name' placeholder='Patient Name' className='form-control' required /> <br />
                    <input type="date" name="date-of-birth" className='form-control' required /> <br />
                    <FormSelect aria-label="Default select example" name="blood-group" className='form-control' required>
                        <option value="">Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="O+">O+</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </FormSelect> <br />
                    <FormSelect aria-label="Default select example" name="gender" className='form-control' required>
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </FormSelect> <br />
                    <FormSelect aria-label="Default select example" name="marital-status" className='form-control' required>
                        <option value="">Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </FormSelect> <br />
                    <input type="text" name='occupation' placeholder='Occupation' className='form-control' required /> <br />
                    <input type="text" name='nationality' placeholder='Nationality' className='form-control' required /> <br />
                    <textarea name="address" placeholder="Address" className='form-control' required /> <br />
                    <input type="text" name='contact' placeholder='Contact' className='form-control' required /> <br />
                    <input type="email" name='email' placeholder='E-Mail' className='form-control' required /> <br />
                    <input type="text" name='guardian' placeholder='Name of Spouse/Guardian' className='form-control' required /> <br />
                    <label className='px-2'>Treatment Status</label>
                    <input type="checkbox" name="status" className='form-check-input' /> <br /> <br />
                    <input type='submit' className='btn btn-danger' value="Save" />
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default PatientModal;
