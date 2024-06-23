import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  
  return (
    <Navbar className='no-print justify-content-center' bg="dark" data-bs-theme="dark" fixed="top">
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
    </Navbar>
  );
}

export default NavBar;