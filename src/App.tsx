import { Routes, Route } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'
import PatientDetails from './pages/PatientDetails'
import NavBar from './components/NavBar'

function App() {

  return (
    <div>
      <NavBar />
      <div style={{paddingTop: "80px"}}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path="/:id" element={<PatientDetails />} />
        </Routes>
      </div>
    </div>

  )
}

export default App
