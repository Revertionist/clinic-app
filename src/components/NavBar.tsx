import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const NavBar: React.FC = () => {
  return (
    <Navbar className='no-print justify-content-center' bg="secondary" data-bs-theme="dark">
        <Navbar.Brand href="/" className=''>
          <img src="dr_hari_dental_care_logo.png" style={{height:'60px', width:'100'}} />
        </Navbar.Brand>
        <div className='navbar-fade'></div>
    </Navbar>
  );
}

export default NavBar;
