import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Stack, Container, Button } from 'react-bootstrap';
import { firestore } from '../lib/firebase';
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import ExamData from '../components/ExamData';

interface PatientData {
    patientName: string;
    contact: string;
    dateOfBirth: string;
    status: boolean;
    gender: string;
    bloodGroup: string;
    matitalStatus: string;
    occupation: string;
    nationality: string;
    address: string;
    email: string;
    guardian: string;
}

const PatientDetails: React.FC = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>(); 
    const [patientData, setPatientData] = useState<PatientData | null>(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            const docRef = doc(firestore, "patients", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPatientData(docSnap.data() as PatientData); 
            } else {
                console.log("No such document!");
            }
        };

        fetchPatientData();
    }, [id]);

    if (!patientData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <br />
            <Container fluid>
                <Row>
                    <Col>
                        <Stack gap={2}>
                            <div className='p-2 rounded bg-secondary text-white'>Patient Name: {patientData.patientName}</div>
                            <div className='p-2 rounded bg-secondary text-white'>Phone Number: {patientData.contact}</div>
                            <div className='p-2 rounded bg-secondary text-white'>Gender: {patientData.gender}</div>
                            <div className='p-2 rounded bg-secondary text-white'>Blood Group: {patientData.bloodGroup}</div>
                            <div className='p-2 rounded bg-secondary text-white'>Nationality: {patientData.nationality}</div>
                            <div className='p-2 rounded bg-secondary text-white'>Occupation: {patientData.occupation}</div>
                            <div className='p-2 rounded bg-secondary text-white'>Marital Status: {patientData.matitalStatus}</div>
                            
                        </Stack>
                    </Col>
                    <Col>
                        <Stack gap={2}>
                            <div className='p-2 rounded bg-secondary text-white'>Date Of Birth: {patientData.dateOfBirth}</div>
                            <div className='p-2 rounded bg-secondary text-white'>Treatment Status: {patientData.status ? 'Active' : 'Inactive'}</div>
                            <div className='p-2 rounded bg-secondary text-white'>Address: {patientData.address}</div>
                            <div className='p-2 rounded bg-secondary text-white'>Contact: {patientData.contact}</div>
                            <div className='p-2 rounded bg-secondary text-white'>E-Mail: {patientData.email}</div>
                            <div className='p-2 rounded bg-secondary text-white'>Guardian: {patientData.guardian}</div>
                        </Stack>
                    </Col>
                </Row>
                <br />
                <ExamData />
                <br />
                <Button variant='danger' onClick={()=>{navigate('/')}}>Go Back</Button>
            </Container>
        </div>
    );
}

export default PatientDetails;
