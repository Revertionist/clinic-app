import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { firestore } from '../lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import DeletionConfirmation from './DeletionConfirmation';

interface TreatmentPlanTableProps {
    treatmentPlan: Array<{
        "Plan Details": string;
        "Status": boolean;
    }>;
    patientid: string;
    onDataUpdate: () => void
}

const TreatmentPlanTable: React.FC<TreatmentPlanTableProps> = ({ onDataUpdate, treatmentPlan, patientid }) => {
    const [modalShow, setModalShow] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const handleCheckboxClick = async (index: number, currentStatus: boolean) => {
        const newStatus = !currentStatus;

        try {
            const patientRef = doc(firestore, 'patients', patientid);
            const patientDoc = await getDoc(patientRef);
            if (patientDoc.exists()) {
                const patientData = patientDoc.data();
                const updatedTreatmentPlan = [...patientData?.TreatmentPlan];
                updatedTreatmentPlan[index].Status = newStatus;

                await updateDoc(patientRef, {
                    TreatmentPlan: updatedTreatmentPlan
                });
            }
            onDataUpdate();
        } catch (error) {
            alert(error);
        }
    };

    const handleDeletion = async (index: number) => {
        try {
            const patientRef = doc(firestore, 'patients', patientid);
            const patientDoc = await getDoc(patientRef);
            if (patientDoc.exists()) {
                const patientData = patientDoc.data();
                const updatedTreatmentPlan = [...patientData?.TreatmentPlan];
                updatedTreatmentPlan.splice(index, 1);

                await updateDoc(patientRef, {
                    TreatmentPlan: updatedTreatmentPlan
                });
            }
            onDataUpdate()
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Plan Data</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {treatmentPlan.map((plan, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{plan['Plan Details']}</td>
                            <td>
                                <input type="checkbox" checked={plan.Status} onChange={() => handleCheckboxClick(index, plan.Status)} />
                            </td>
                            <td>
                                <Button variant='outline-danger' onClick={() => { setSelectedIndex(index); setModalShow(true); }}>X</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DeletionConfirmation
                show={modalShow}
                onHide={() => setModalShow(false)}
                onDelete={() => { if (selectedIndex !== null) handleDeletion(selectedIndex); }}
            />
        </div>
    );
};

export default TreatmentPlanTable;
