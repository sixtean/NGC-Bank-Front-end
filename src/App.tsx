import { Routes, Route } from 'react-router-dom';
import Login from './screens/Login.tsx';
import Home from './screens/Home.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App;