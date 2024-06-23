import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import DeletionConfirmation from "./DeletionConfirmation";

interface Patient {
    id: string;
    patientName: string;
    contact: string;
    dateOfBirth: string;
    status: boolean;
}

interface TableDataProps {
    dataValues: Patient[];
}

const TableData: React.FC<TableDataProps> = ({ dataValues }) => {
    const [patients, setPatients] = useState(dataValues);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedPatientId, setSelectedPatientId] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const handleCheckboxClick = async (patientId: string, currentStatus: boolean) => {
        const newStatus = !currentStatus;

        try {
            const patientRef = doc(firestore, 'patients', patientId);
            await updateDoc(patientRef, { status: newStatus });
            setPatients(prevPatients =>
                prevPatients.map(patient =>
                    patient.id === patientId ? { ...patient, status: newStatus } : patient
                )
            );
        } catch (error) {
            alert(error);
        }
    };

    const handleDeletion = async (patientId: string) => {
        try {
            const patientRef = doc(firestore, 'patients', patientId);
            await deleteDoc(patientRef);
            setPatients(prevPatients => prevPatients.filter(patient => patient.id !== patientId));
            setModalShow(false);
        } catch (error) {
            alert(error);
        }
    };

    const titleValues = ["Patient Name", "Phone Number", "Date Of Birth", "Treatment Status"];
    const headValues = ["patientName", "contact", "dateOfBirth"];

    return (
        <>
            <Table hover>
                <thead>
                    <tr>
                        {titleValues.map((value, index) => (
                            <th key={index}>{value}</th>
                        ))}
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            {headValues.map((attribute, index) => (
                                <td key={index} onClick={() => navigate(`/${patient.id}`)}>
                                    {patient[attribute as keyof Patient]}
                                </td>
                            ))}
                            <td>
                                <input
                                    type="checkbox"
                                    checked={patient.status}
                                    onChange={() => handleCheckboxClick(patient.id, patient.status)}
                                />
                            </td>
                            <td>
                                <Button variant='outline-danger' onClick={() => { setSelectedPatientId(patient.id); setModalShow(true); }}>X</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <DeletionConfirmation
                show={modalShow}
                onHide={() => setModalShow(false)}
                onDelete={() => selectedPatientId && handleDeletion(selectedPatientId)}
            />
        </>
    );
};

export default TableData;
