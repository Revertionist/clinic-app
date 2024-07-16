import { Routes, Route } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'
import PatientDetails from './pages/PatientDetails'
import TreatmentNoteData from './components/TreatmentNoteData'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "20px" }}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path="/:id" element={<PatientDetails />} />
          <Route path="/:id/treatment_note" element={<TreatmentNoteData />} />
        </Routes>
      </div>
    </>

  )
}

export default App
