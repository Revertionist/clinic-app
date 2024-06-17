import React from "react";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";

interface User {
    id: string;
    patientName: string;
    contact: string;
    dateOfBirth: string;
    status: boolean;
}

interface TableDataProps {
    dataValues: User[];
}

const TableData: React.FC<TableDataProps> = ({ dataValues }) => {
    const [users, setUsers] = useState(dataValues);
    const navigate = useNavigate();

    const handleCheckboxClick = async (userId: string, currentStatus: boolean) => {
        const newStatus = !currentStatus;

        try {
            const patientRef = doc(firestore, 'patients', userId);
            await updateDoc(patientRef, {
                status: newStatus
            });
        } catch (error) {
            alert(error);
        }
    }

    const handleDeletion = async (userId: string) => {
        try {
            const patientRef = doc(firestore, 'patients', userId);
            await deleteDoc(patientRef)
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            alert(error)
        }

    }

    const titleValues = ["Patient Name", "Phone Number", "Date Of Birth", "Treatment Status"];
    const headValues = ["patientName", "contact", "dateOfBirth"];
    return (
        <Table hover>
            <thead>
                <tr>
                    {titleValues.map((value: string, index: number) => (
                        <th key={index}>{value}</th>
                    ))}
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {dataValues.map((user: User) => (
                    <tr key={user.id} >
                        {headValues.map((attribute: string, index: number) => (
                            <td onClick={() => navigate(`/${user.id}`)} key={index}>{user[attribute as keyof User]}</td>
                        ))}
                        <td>
                            <input type="checkbox" checked={user.status} onChange={() => handleCheckboxClick(user.id, user.status)} />
                        </td>
                        <td>
                            <Button variant='outline-danger' onClick={() => { handleDeletion(user.id) }}>X</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TableData;