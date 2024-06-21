import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { Table, Container, Button } from 'react-bootstrap';
import TreatmentNoteModal from './TreatmentNoteModal';

const TreatmentNoteData: React.FC = () => {
    const { id = "" } = useParams<{ id: string }>();
    const [treatmentNote, setTreatmentNote] = useState([])
    const [isPrinting, setIsPrinting] = useState(false)
    const [treatmentNoteModalShow, setTreatmentNoteModalShow] = React.useState(false);

    useEffect(() => {
        const getTreatmentNote = async () => {
            const patientRef = doc(firestore, 'patients', id);
            const snap = await getDoc(patientRef);
            const data = snap.data();
            setTreatmentNote(data?.TreatmentNote || []);
        }
        getTreatmentNote()
    }, [])

    const handlePrint = () => {
        setIsPrinting(true);
        window.print();
        setIsPrinting(false);
    }

    const handleDeletion = async (index: number) => {
        try {
            const patientRef = doc(firestore, "patients", id)
            const patientDoc = await getDoc(patientRef)
            if (patientDoc.exists()) {
                const patientData = patientDoc.data()
                const updatedTreatmentNote = [...patientData.TreatmentNote]
                updatedTreatmentNote.splice(index, 1)

                await updateDoc(patientRef, {
                    TreatmentNote: updatedTreatmentNote
                })
            }
        } catch (error) {
            alert(error)
        }
    }

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
                            {!isPrinting && <th className="no-print">Delete</th>}
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
                                {!isPrinting && <th className="no-print"><Button onClick={() => { handleDeletion(index) }} variant='outline-danger'>X</Button></th>}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant='outline-danger' className='no-print' onClick={() => setTreatmentNoteModalShow(true)}>Add Treatment Note</Button>
                <TreatmentNoteModal
                    show={treatmentNoteModalShow}
                    onHide={() => setTreatmentNoteModalShow(false)}
                    patientid={id}
                /> <br />
                <Button className='no-print' onClick={handlePrint} variant='outline-danger'>Print</Button>
            </Container>
        </div>
    )
}

export default TreatmentNoteData
