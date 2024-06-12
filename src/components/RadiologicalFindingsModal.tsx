import React from 'react'
import { Modal, Form } from 'react-bootstrap'

const RadiologicalFindingsModal = (props: any) => {
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
                    <Form>
                        <textarea name="radiological-findings" className='form-control' placeholder='Radiological Findings' /> <br />
                        <input className='btn btn-danger' type="submit" value="Save" />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default RadiologicalFindingsModal
