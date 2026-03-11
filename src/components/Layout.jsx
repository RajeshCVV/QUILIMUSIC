import { Outlet, NavLink } from 'react-router-dom';
import { 
  Music, Users, GraduationCap, Calendar, 
  BarChart3, FileText, Clock, AlertTriangle 
} from 'lucide-react';
import { trialService } from '../data/trialService';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [timeLeft, setTimeLeft] = useState(trialService.getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(trialService.getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { to: '/', icon: <BarChart3 />, label: 'Dashboard' },
    { to: '/students', icon: <Users />, label: 'Estudiantes' },
    { to: '/teachers', icon: <GraduationCap />, label: 'Docentes' },
    { to: '/classes', icon: <Calendar />, label: 'Agenda' },
    { to: '/finances', icon: <Music />, label: 'Finanzas' },
    { to: '/reports', icon: <FileText />, label: 'Reportes' },
  ];

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="flex-center gap-2" style={{ marginBottom: '3rem' }}>
          <Music size={32} className="text-amber" />
          <h2 style={{ color: 'white', fontSize: '1.5rem' }}>QuiliMusic</h2>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `flex-center gap-2` + (isActive ? ' active-nav' : ' nav-link')
              }
              style={{ 
                justifyContent: 'flex-start', 
                padding: '0.8rem 1rem', 
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="glass-card" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '1rem' }}>
          <div className="flex-center gap-1" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
            <Clock size={14} />
            <span>Trial Expira en:</span>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, textAlign: 'center', marginTop: '0.5rem' }}>
            {trialService.formatTimeLeft(timeLeft)}
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="flex-between" style={{ marginBottom: '2rem' }}>
          <h1>SISTEMA DE GESTIÓN MUSICAL</h1>
          <div className="flex-center gap-2">
            <div className="glass-card flex-center gap-2" style={{ padding: '0.5rem 1rem' }}>
              <AlertTriangle size={18} className="text-amber" />
              <span style={{ fontSize: '0.9rem' }}>3 Pagos Vencidos</span>
            </div>
          </div>
        </header>
        <Outlet />
      </main>

      <style>{`
        .nav-link:hover { background: rgba(255,255,255,0.05); }
        .active-nav { background: var(--brand-amber); color: var(--brand-navy) !important; font-weight: 600; }
        .nav-link { color: rgba(255,255,255,0.7) !important; }
      `}</style>
    </div>
  );
};

export default Layout;
