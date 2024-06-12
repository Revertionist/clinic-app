import { Routes, Route } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'
import PatientDetails from './pages/PatientDetails'

function App() {

  return (
    <Routes>
      <Route path='/'element={<MainPage />} />
      <Route path="/:id" element={<PatientDetails />}/>
    </Routes>
    
  )
}

export default App
