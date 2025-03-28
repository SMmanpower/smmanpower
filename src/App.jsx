import { Buffer } from 'buffer';
window.Buffer = Buffer;
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './components/Admin'
import WorkerTable from './components/WorkerTable'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} /> 
         <Route path='/workers'  element={<ProtectedRoute><WorkerTable/></ProtectedRoute>}/>
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


