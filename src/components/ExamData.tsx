import { Accordion, Button } from 'react-bootstrap'
import React from 'react';
import DentalHistoryModal from './DentalHistoryModal';
import MedicalHistoryModal from './MedicalHistoryModal';
import ClinicalExaminationModal from './ClinicalExaminationModal';
import RadiologicalFindingsModal from './RadiologicalFindingsModal';
import DiagnosisModal from './DiagnosisModal';

interface ExamDataProps {
  patientId: string;
}

const ExamData: React.FC<ExamDataProps> = ({ patientId }) => {
  const [dentalModalShow, setDentalModalShow] = React.useState(false);
  const [medicalModalShow, setMedicalModalShow] = React.useState(false);
  const [clinicalModalShow, setClinicalModalShow] = React.useState(false);
  const [radiologicalModalShow, setRadiologicalModalShow] = React.useState(false);
  const [diagnosisModalShow, setDiagnosisModalShow] = React.useState(false);

  return (
    <div className='px-5'>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Dental History</Accordion.Header>
          <Accordion.Body>
            <Button onClick={() => setDentalModalShow(true)}>Add Dental History</Button>
            <DentalHistoryModal
              show={dentalModalShow}
              onHide={() => setDentalModalShow(false)}
              patientId={patientId}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Medical History</Accordion.Header>
          <Accordion.Body>
            <Button onClick={() => setMedicalModalShow(true)}>Add Medical History</Button>
            <MedicalHistoryModal
              show={medicalModalShow}
              onHide={() => setMedicalModalShow(false)}
              patientId={patientId}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Clinical Examination</Accordion.Header>
          <Accordion.Body>
            <Button onClick={() => setClinicalModalShow(true)}>Add Clinical Examination</Button>
            <ClinicalExaminationModal
              show={clinicalModalShow}
              onHide={() => setClinicalModalShow(false)}
              patientId={patientId}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Radiological Findings</Accordion.Header>
          <Accordion.Body>
            <Button onClick={() => setRadiologicalModalShow(true)}>Add Radiological Findings</Button>
            <RadiologicalFindingsModal
              show={radiologicalModalShow}
              onHide={() => setRadiologicalModalShow(false)}
              patientId={patientId}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Diagnosis</Accordion.Header>
          <Accordion.Body>
            <Button onClick={() => setDiagnosisModalShow(true)}>Add Diagnosis</Button>
            <DiagnosisModal
              show={diagnosisModalShow}
              onHide={() => setDiagnosisModalShow(false)}
              patientId={patientId}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Treatment Plan</Accordion.Header>
          <Accordion.Body>
            <Button>Add Treatment Plan</Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default ExamData
