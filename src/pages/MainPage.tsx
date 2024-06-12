import React from 'react'
import Button from 'react-bootstrap/Button';
import PatientModal from '../components/PatientModal';
import { Container } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../lib/firebase'
import { useEffect, useState } from 'react'
import TableData from '../components/TableData';

function MainPage() {
    const [modalShow, setModalShow] = React.useState(false);
    const [patients, setPatients] = useState([])

    useEffect(() => {
        const getPatients = async () => {

            const snap = await getDocs(collection(firestore, "patients"))
            const resp = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            console.log(resp)
            return setPatients(resp)
        }

        getPatients()
    }, [])

    return (
        <div>
            <Container fluid>
                <TableData dataValues={patients} />
                <Button variant='danger' onClick={() => setModalShow(true)}>Add Patient</Button>
                <PatientModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Container>
        </div>
    )
}

export default MainPage
