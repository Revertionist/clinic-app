import { Container } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../lib/firebase'
import { useEffect, useState } from 'react'
import TableData from '../components/TableData';
import NavBar from '../components/NavBar';

function MainPage() {
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
                <hr />
                <TableData dataValues={patients} />
            </Container>
        </div>
    )
}

export default MainPage
