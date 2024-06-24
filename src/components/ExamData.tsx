import React, { useEffect } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import DentalHistoryModal from './DentalHistoryModal';
import MedicalHistoryModal from './MedicalHistoryModal';
import ClinicalExaminationModal from './ClinicalExaminationModal';
import RadiologicalFindingsModal from './RadiologicalFindingsModal';
import DiagnosisModal from './DiagnosisModal';
import ExaminationDetailsCard from './ExaminationDetailsCard';
import TreatmentModal from './TreatmentModal';
import TreatmentPlanTable from './TreatmentPlanTable';
import { firestore } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface ExamDataProps {
  patientid: string;
  ExaminationData: any;
}

const ExamData: React.FC<ExamDataProps> = ({ patientid }) => {
  const [dentalModalShow, setDentalModalShow] = React.useState(false);
  const [medicalModalShow, setMedicalModalShow] = React.useState(false);
  const [clinicalModalShow, setClinicalModalShow] = React.useState(false);
  const [radiologicalModalShow, setRadiologicalModalShow] = React.useState(false);
  const [diagnosisModalShow, setDiagnosisModalShow] = React.useState(false);
  const [treatmentModalShow, setTreatmentModalShow] = React.useState(false);
  const [treatmentPlan, setTreatmentPlan] = React.useState([]);
  const [forceRerender, setForceRerender] = React.useState(false);
  const [examinationDetails, setExaminationDetails] = React.useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const getTreatmentPlan = async () => {
      const patientRef = doc(firestore, 'patients', patientid);
      const snap = await getDoc(patientRef);
      const data = snap.data();
      setTreatmentPlan(data?.TreatmentPlan || []);

      setExaminationDetails(data?.ExaminationData || {});
    };
    getTreatmentPlan();
  }, [patientid, forceRerender]);

  const refreshPlan = async () => {
    const patientRef = doc(firestore, 'patients', patientid);
    const snap = await getDoc(patientRef);
    const data = snap.data();
    console.log(data)
    setTreatmentPlan(data?.TreatmentPlan || []);
    setExaminationDetails(data?.ExaminationData || {});
    setForceRerender(prev => !prev);
  };

  return (
    <div className='px-5'>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header><b>Dental History</b></Accordion.Header>
          <Accordion.Body>
            <ExaminationDetailsCard
              ExaminationData={examinationDetails}
              examinationType="Dental History"
            /> <br />
            <Button variant='outline-danger' onClick={() => setDentalModalShow(true)}>Add Dental History</Button>
            <DentalHistoryModal
              show={dentalModalShow}
              onHide={() => setDentalModalShow(false)}
              patientid={patientid}
              onDataUpdate={refreshPlan}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header><b>Medical History</b></Accordion.Header>
          <Accordion.Body>
            <ExaminationDetailsCard
              ExaminationData={examinationDetails}
              examinationType="Medical History"
            /> <br />
            <Button variant='outline-danger' onClick={() => setMedicalModalShow(true)}>Add Medical History</Button>
            <MedicalHistoryModal
              show={medicalModalShow}
              onHide={() => setMedicalModalShow(false)}
              patientid={patientid}
              onDataUpdate={refreshPlan}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header><b>Clinical Examination</b></Accordion.Header>
          <Accordion.Body>
            <ExaminationDetailsCard
              ExaminationData={examinationDetails}
              examinationType="Clinical Examination"
            /> <br />
            <Button variant='outline-danger' onClick={() => setClinicalModalShow(true)}>Add Clinical Examination</Button>
            <ClinicalExaminationModal
              show={clinicalModalShow}
              onHide={() => setClinicalModalShow(false)}
              patientid={patientid}
              onDataUpdate={refreshPlan}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="3">
          <Accordion.Header><b>Radiological Findings</b></Accordion.Header>
          <Accordion.Body>
            <ExaminationDetailsCard
              ExaminationData={examinationDetails}
              examinationType="Radiological Findings"
            /> <br />
            <Button variant='outline-danger' onClick={() => setRadiologicalModalShow(true)}>Add Radiological Findings</Button>
            <RadiologicalFindingsModal
              show={radiologicalModalShow}
              onHide={() => setRadiologicalModalShow(false)}
              patientid={patientid}
              onDataUpdate={refreshPlan}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="4">
          <Accordion.Header><b>Diagnosis</b></Accordion.Header>
          <Accordion.Body>
            <ExaminationDetailsCard
              ExaminationData={examinationDetails}
              examinationType="Diagnosis"
            /> <br />
            <Button variant='outline-danger' onClick={() => setDiagnosisModalShow(true)}>Add Diagnosis</Button>
            <DiagnosisModal
              show={diagnosisModalShow}
              onHide={() => setDiagnosisModalShow(false)}
              patientid={patientid}
              onDataUpdate={refreshPlan}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="5">
          <Accordion.Header><b>Treatment Plan</b></Accordion.Header>
          <Accordion.Body>
            <TreatmentPlanTable
              treatmentPlan={treatmentPlan}
              patientid={patientid}
              onDataUpdate={refreshPlan}
            />
            <Button variant='outline-danger' onClick={() => setTreatmentModalShow(true)}>Add Treatment Plan</Button>
            <TreatmentModal
              show={treatmentModalShow}
              onHide={() => setTreatmentModalShow(false)}
              patientid={patientid}
              onDataUpdate={refreshPlan}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="5">
          <Accordion.Header><b>Treatment Note</b></Accordion.Header>
          <Accordion.Body>
            <Button variant='outline-danger' onClick={() => { navigate(`/${patientid}/treatment_note`) }}>View Treatment Note</Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> <br />
      <Button onClick={() => { navigate('/') }} variant='outline-danger'>Go Back</Button>
    </div>
  );
};

export default ExamData;