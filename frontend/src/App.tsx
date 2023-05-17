import { Navbar } from './components'
import { LoginPage, RegisterPage } from './pages';
import './index.css';


const App: React.FC = () => {

  return (
    <>
      <Navbar />
      <LoginPage />
      <RegisterPage />
    </>

  )
}

export default App
