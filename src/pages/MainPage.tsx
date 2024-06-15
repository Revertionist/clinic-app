import { Container } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../lib/firebase'
import { useEffect, useState } from 'react'
import TableData from '../components/TableData';
import LoadingSpinner from '../components/Spinner';

function MainPage() {
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getPatients = async () => {

            const snap = await getDocs(collection(firestore, "patients"))
            const resp = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setLoading(false)
            console.log(resp)
            return setPatients(resp)
        }

        getPatients()
    }, [])

    return (
        <div>
            {loading ? (<LoadingSpinner />) :
                (<Container style={{ alignItems: 'center' }}>
                    <h1>Patient List</h1>
                    <hr />
                    <TableData dataValues={patients} />
                </Container>)}
        </div>
    )
}

export default MainPage

