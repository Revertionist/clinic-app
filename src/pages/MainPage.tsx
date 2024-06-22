import { Button, Container } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../lib/firebase'
import { useEffect, useState } from 'react'
import TableData from '../components/TableData';
import LoadingSpinner from '../components/Spinner';
import PatientModal from '../components/PatientModal';

type Patient = {
    id: string;
    patientName: string;
    contact: string;
    dateOfBirth: string;
    status: boolean;
};

function MainPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [forceRerender, setForceRerender] = useState(false);

    useEffect(() => {
        const getPatients = async () => {

            const snap = await getDocs(collection(firestore, "patients"));
            const resp = snap.docs.map((doc) => {
                const data = doc.data();
                return {
                    ...data,
                    id: doc.id,
                    patientName: data.patientName || "",
                    contact: data.contact || "",
                    dateOfBirth: data.dateOfBirth || "",
                    status: data.status !== undefined ? data.status : false,
                } as Patient;
            });
            setLoading(false);
            setPatients(resp);
        };
        getPatients();
    }, [forceRerender]);

    const refreshPlan = async () => {
        setLoading(true)
        const snap = await getDocs(collection(firestore, "patients"));
        const resp = snap.docs.map((doc) => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
                patientName: data.patientName || "",
                contact: data.contact || "",
                dateOfBirth: data.dateOfBirth || "",
                status: data.status !== undefined ? data.status : false,
            } as Patient;
        });
        setLoading(false);
        setPatients(resp);
        setForceRerender(prev => !prev);
    };

    return (
        <>
            {loading ? (<LoadingSpinner />) :
                (<Container style={{ alignItems: 'center' }}>
                    <h1>Patient List</h1>
                    <hr />
                    <TableData
                        dataValues={patients}
                    /> <br />
                    <Button onClick={() => setModalShow(true)} variant='outline-danger'>Add Patient</Button>
                    <PatientModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        onDataUpdate={refreshPlan}
                    />
                </Container>)}
        </>
    );
}

export default MainPage;