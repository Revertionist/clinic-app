import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Card, ListGroup } from 'react-bootstrap';
import { firestore } from '../lib/firebase';
import { doc, getDoc } from "firebase/firestore";
import ExamData from '../components/ExamData';
import LoadingSpinner from '../components/Spinner';

interface PatientData {
    pnrNo: string;
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
    ExaminationData: any;
}

const PatientDetails: React.FC = () => {
    const { id = "" } = useParams<{ id: string }>();
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
        return <LoadingSpinner />;
    }

    return (
        <div>
            <Container style={{ alignItems: 'center' }}>
                <h1>Patient Details</h1>
                <hr /><br />
                <Container fluid>
                    <Row style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                        <Col>
                            <Card style={{ backgroundColor: "black" }}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><b>PNR No</b>: {patientData.pnrNo}</ListGroup.Item>
                                    <ListGroup.Item><b>Patient Name</b>: {patientData.patientName}</ListGroup.Item>
                                    <ListGroup.Item><b>Date Of Birth</b>: {patientData.dateOfBirth}</ListGroup.Item>
                                    <ListGroup.Item><b>Gender</b>: {patientData.gender}</ListGroup.Item>
                                    <ListGroup.Item><b>Blood Group</b>: {patientData.bloodGroup}</ListGroup.Item>
                                    <ListGroup.Item><b>Marital Status</b>: {patientData.maritalStatus}</ListGroup.Item>
                                    <ListGroup.Item><b>Occupation</b>: {patientData.occupation}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ backgroundColor: "black" }}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><b>Nationality</b>: {patientData.nationality}</ListGroup.Item>
                                    <ListGroup.Item><b>Address</b>: {patientData.address}</ListGroup.Item>
                                    <ListGroup.Item><b>Phone Number</b>: {patientData.contact}</ListGroup.Item>
                                    <ListGroup.Item><b>E-Mail</b>: {patientData.email}</ListGroup.Item>
                                    <ListGroup.Item><b>Guardian</b>: {patientData.guardian}</ListGroup.Item>
                                    <ListGroup.Item><b>Treatment Status</b>: {patientData.status ? 'Completed' : 'Planned'}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <br />
                    <hr />
                    <br />
                    <ExamData
                        patientid={id}
                        ExaminationData={patientData.ExaminationData}
                    />
                </Container>
            </Container>

        </div>
    );
}

export default PatientDetails;