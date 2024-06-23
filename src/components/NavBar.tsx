import Navbar from 'react-bootstrap/Navbar';
import { Form, Button, Nav } from 'react-bootstrap';

function NavBar() {
  
  return (
    <Navbar className='no-print' bg="dark" data-bs-theme="dark" fixed="top">
      <Navbar.Brand className='px-5' href="/">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        
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