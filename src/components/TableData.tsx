import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
                            <input type="checkbox" checked={user.status} readOnly />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TableData;
