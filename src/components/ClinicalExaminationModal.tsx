import React from 'react'
import { Modal, Form } from 'react-bootstrap'

const ClinicalExaminationModal = (props: any) => {
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
                    <Form>
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
