import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
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

    const titleValues = ["Patient Name", "Phone Number", "Date Of Birth", "Treatment Status"];
    const headValues = ["patientName", "contact", "dateOfBirth"];
    return (
        <Table hover>
            <thead>
                <tr>
                    {titleValues.map((value: string, index: number) => (
                        <th key={index}>{value}</th>
                    ))}
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
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TableData;
