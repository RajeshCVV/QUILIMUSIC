import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Finances from './pages/Finances';
import Reports from './pages/Reports';
import { trialService } from './data/trialService';
import { useState, useEffect } from 'react';

function App() {
  const [isTrialValid, setIsTrialValid] = useState(trialService.isTrialValid());

  useEffect(() => {
    const timer = setInterval(() => {
      const valid = trialService.isTrialValid();
      if (!valid) setIsTrialValid(false);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isTrialValid) {
    return (
      <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', gap: '2rem', background: '#0F172A', color: 'white' }}>
        <h1 style={{ color: 'white' }}>Trial Expired / Demo Finalizado</h1>
        <p>Tu acceso de 72 horas al Quili Music Management System ha expirado.</p>
        <div className="glass-card" style={{ color: '#0F172A' }}>
          <h3>Contacta con Multivela Studio</h3>
          <p>Para obtener la versión completa, contacta a soporte.</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="classes" element={<Classes />} />
          <Route path="finances" element={<Finances />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
