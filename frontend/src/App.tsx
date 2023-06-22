import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components';
import { LoginPage, PrestadorDetail, PrestadoresList, RegisterPage, Profile } from './pages';
import { useStore } from './store';

const App: React.FC = () => {
  const { isLoggedIn } = useStore();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/prestadores" /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        {isLoggedIn ? (
          <>
            <Route path="/prestadores" element={<PrestadoresList />} />
            <Route path="/prestadores/:id" element={<PrestadorDetail />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : null}
      </Routes>
    </Router>
  );
};

export default App;