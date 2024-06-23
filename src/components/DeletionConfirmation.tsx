import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeletionConfirmationProps {
    show: boolean;
    onHide: () => void;
    onDelete: () => void;
}

const DeletionConfirmation: React.FC<DeletionConfirmationProps> = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirm Deletion
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure you want to delete this patient?</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
                <Button variant="danger" onClick={props.onDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeletionConfirmation;
