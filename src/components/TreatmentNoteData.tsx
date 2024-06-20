import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { Table, Container } from 'react-bootstrap';

const TreatmentNoteData: React.FC = () => {
    const { id = "" } = useParams<{ id: string }>();
    const [treatmentNote, setTreatmentNote] = useState([])

    useEffect(() => {
        const getTreatmentNote = async () => {
            const patientRef = doc(firestore, 'patients', id);
            const snap = await getDoc(patientRef);
            const data = snap.data();
            setTreatmentNote(data?.TreatmentNote || []);
        }
        getTreatmentNote()
    }, [])
    return (
        <div>
            <Container style={{ alignItems: 'center' }}>
                <h1>Treatment Note</h1> 
                <hr />
                <Table hover>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Treatment Done</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {treatmentNote.map((plan, index) => (
                            <tr key={index}>
                                <td>
                                    {plan['Date']}
                                </td>
                                <td>
                                    {plan['Treatment Done']}
                                </td>
                                <td>
                                    {plan['Remarks']}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default TreatmentNoteData
