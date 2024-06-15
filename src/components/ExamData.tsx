import { Accordion, Button } from 'react-bootstrap'
import React, { useEffect } from 'react';
import DentalHistoryModal from './DentalHistoryModal';
import MedicalHistoryModal from './MedicalHistoryModal';
import ClinicalExaminationModal from './ClinicalExaminationModal';
import RadiologicalFindingsModal from './RadiologicalFindingsModal';
import DiagnosisModal from './DiagnosisModal';
import ExaminationDetailsCard from './ExaminationDetailsCard';

interface ExamDataProps {
  patientId: string;
  ExaminationData: any;
}

const ExamData: React.FC<ExamDataProps> = ({ patientId, ExaminationData }) => {
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
            <ExaminationDetailsCard
              ExaminationData={ExaminationData}
              examinationType="Dental History"
            /> <br />
            <Button variant='outline-danger' onClick={() => setDentalModalShow(true)}>Add Dental History</Button>
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
            <ExaminationDetailsCard
              ExaminationData={ExaminationData}
              examinationType="Medical History"
            /> <br />
            <Button variant='outline-danger' onClick={() => setMedicalModalShow(true)}>Add Medical History</Button>
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
            <ExaminationDetailsCard
              ExaminationData={ExaminationData}
              examinationType="Clinical Examination"
            /> <br />
            <Button variant='outline-danger' onClick={() => setClinicalModalShow(true)}>Add Clinical Examination</Button>
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
            <ExaminationDetailsCard
              ExaminationData={ExaminationData}
              examinationType="Radiological Findings"
            /> <br />
            <Button variant='outline-danger' onClick={() => setRadiologicalModalShow(true)}>Add Radiological Findings</Button>
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
            <ExaminationDetailsCard
              ExaminationData={ExaminationData}
              examinationType="Diagnosis"
            /> <br />
            <Button variant='outline-danger' onClick={() => setDiagnosisModalShow(true)}>Add Diagnosis</Button>
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
            <Button variant='outline-danger'>Add Treatment Plan</Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default ExamData
