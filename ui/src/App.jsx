import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Learn from './components/Learn';
import Chat from './components/Chat';
import Card from './components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;