import  { useEffect } from 'react';
import  { refreshTokenService } from './services/auth/refreshTokenService.ts';
import  { Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import  Login from './pages/loginScreens/Login.tsx';
import  VerifyCode from './pages/loginScreens/VerifyCode.tsx';
import  Home from './pages/Home.tsx';

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      refreshTokenService()
        .then(() => console.log("Token atualizado"))
        .catch((err) => console.error("Erro ao renovar token:", err));
      }, 55 * 60 * 1000);

      return () => clearInterval(interval);
    }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/verify' element={<VerifyCode /> } />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App;