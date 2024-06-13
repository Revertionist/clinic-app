import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Card, ListGroup } from 'react-bootstrap';
import { firestore } from '../lib/firebase';
import { doc, getDoc } from "firebase/firestore";
import ExamData from '../components/ExamData';

interface PatientData {
    patientName: string;
    contact: string;
    dateOfBirth: string;
    status: boolean;
    gender: string;
    bloodGroup: string;
    maritalStatus: string;
    occupation: string;
    nationality: string;
    address: string;
    email: string;
    guardian: string;
}

const PatientDetails: React.FC = () => {
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
            <Row>
                <Col>
                    <Card style={{ marginLeft: "100px", width: '40rem', backgroundColor: "black" }}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Patient Name: {patientData.patientName}</ListGroup.Item>
                            <ListGroup.Item>Phone Number: {patientData.contact}</ListGroup.Item>
                            <ListGroup.Item>Gender: {patientData.gender}</ListGroup.Item>
                            <ListGroup.Item>Blood Group: {patientData.bloodGroup}</ListGroup.Item>
                            <ListGroup.Item>Nationality: {patientData.nationality}</ListGroup.Item>
                            <ListGroup.Item>Occupation: {patientData.occupation}</ListGroup.Item>
                            <ListGroup.Item>Marital Status: {patientData.maritalStatus}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '40rem', backgroundColor: "black" }}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Date Of Birth: {patientData.dateOfBirth}</ListGroup.Item>
                            <ListGroup.Item>Treatment Status: {patientData.status ? 'Active' : 'Inactive'}</ListGroup.Item>
                            <ListGroup.Item>Address: {patientData.address}</ListGroup.Item>
                            <ListGroup.Item>Contact: {patientData.contact}</ListGroup.Item>
                            <ListGroup.Item>E-Mail: {patientData.email}</ListGroup.Item>
                            <ListGroup.Item>Guardian: {patientData.guardian}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Container fluid>
                <br />
                <hr />
                <br />
                <ExamData
                    patientId={id}
                />
            </Container>

        </div>
    );
}

export default PatientDetails;
