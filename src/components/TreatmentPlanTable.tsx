import React from 'react'
import { Table } from 'react-bootstrap'
import { firestore } from '../lib/firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

interface TreatmentPlanTableProps {
    treatmentPlan: Array<{
        "Plan Details": string,
        "Status": boolean
    }>,
    patientId: string
}

const TreatmentPlanTable: React.FC<TreatmentPlanTableProps> = (props) => {
    const handleCheckboxClick = async (patientId: string, index: number, currentStatus: boolean) => {
        const newStatus = !currentStatus;

        try {
            const patientRef = doc(firestore, 'patients', patientId);
            const patientDoc = await getDoc(patientRef);
            if (patientDoc.exists()) {
                const patientData = patientDoc.data();
                const updatedTreatmentPlan = [...patientData.TreatmentPlan];
                updatedTreatmentPlan[index].Status = newStatus;

                await updateDoc(patientRef, {
                    TreatmentPlan: updatedTreatmentPlan
                });
            }
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Plan Data</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {props.treatmentPlan.map((plan, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{plan['Plan Details']}</td>
                            <td>
                                <input type="checkbox" checked={plan.Status} onChange={() => handleCheckboxClick(props.patientId, index, plan.Status)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TreatmentPlanTable
