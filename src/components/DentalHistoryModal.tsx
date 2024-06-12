import React from 'react'
import { Modal, Form } from 'react-bootstrap'

const DentalHistoryModal = (props: any) => {
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
                        Dental History
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <input className='form-control' type='text' placeholder='Chief Complaint' value='chief-complaint' /> <br />
                        <input className='form-control' type='text' placeholder='History of Present Illness' value='illness-history' /> <br />
                        <input className='form-control' type='text' placeholder='Past Dental History' value='dental-history' /> <br />
                        <input type='submit' className='btn btn-danger' value="Save" />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DentalHistoryModal
