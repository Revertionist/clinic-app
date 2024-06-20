import Navbar from 'react-bootstrap/Navbar';
import { Form, Button, Nav } from 'react-bootstrap';
import React from 'react';
import PatientModal from './PatientModal';

function NavBar() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Navbar.Brand className='px-5' href="/">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link onClick={() => setModalShow(true)}>Add Patient</Nav.Link>
        <PatientModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Nav>

      <Form className="px-5 d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-danger">Search</Button>
      </Form>
    </Navbar>
  );
}

export default NavBar;