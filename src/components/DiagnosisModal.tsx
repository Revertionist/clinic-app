import React from 'react'
import { Modal, Form } from 'react-bootstrap'

const DiagnosisModal = (props: any) => {
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
          Diagnosis
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <textarea name="diagnosis" placeholder='Diagnosis' className='form-control' /> <br />
          <input type="submit" className='btn btn-danger' value="Save" />
        </Form>
      </Modal.Body>
    </Modal>
    </div>
  )
}

export default DiagnosisModal
