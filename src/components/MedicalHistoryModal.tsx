import { Modal, Form, FormSelect } from 'react-bootstrap'

const MedicalHistoryModal = (props: any) => {
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
                    <Form>
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
                        <input type="submit" className='btn btn-danger' value="Save" />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MedicalHistoryModal