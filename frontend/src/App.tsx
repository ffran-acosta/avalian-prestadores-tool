import { Navbar } from './components'
import { Dashboard, LoginPage, Profile, RegisterPage } from './pages';
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
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>      
      </Router>
    </>

  )
}

export default App
