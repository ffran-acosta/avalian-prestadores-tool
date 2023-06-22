import { Navbar } from './components'
import { LoginPage, PrestadorDetail, PrestadoresList, RegisterPage, Profile } from './pages';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/singup' element={<RegisterPage />}></Route>
          <Route path='/prestadores' element={<PrestadoresList/>}></Route>
          <Route path="/prestadores/:id" element={<PrestadorDetail />} />
          <Route path='/profile' element={<Profile />}></Route>
          {/* <Route path='/dashboard' element={<Dashboard />}></Route> */}
        </Routes>      
      </Router>
    </>

  )
}

export default App
