import { Navbar } from './components'
import { LoginPage, RegisterPage } from './pages';
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
        </Routes>      
      </Router>
    </>

  )
}

export default App
