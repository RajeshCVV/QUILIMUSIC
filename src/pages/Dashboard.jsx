import { dataService } from '../data/dataService';
import { Users, Calendar, Wallet, TrendingUp, Music2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpiData, classData] = await Promise.all([
          dataService.getDashboardKPIs(),
          dataService.getClassesWithDetails()
        ]);
        setKpis(kpiData);
        setClasses(classData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '50vh', flexDirection: 'column', gap: '1rem' }}>
        <Loader2 className="animate-spin" size={40} />
        <p>Cargando Dashboard...</p>
      </div>
    );
  }

  const cards = [
    { label: 'Alumnos Activos', value: kpis?.activeStudents || 0, icon: <Users />, color: 'var(--brand-navy)' },
    { label: 'Clases Hoy', value: kpis?.classesToday || 0, icon: <Calendar />, color: 'var(--brand-amber)' },
    { label: 'Pagos Pendientes', value: kpis?.pendingPayments || 0, icon: <Wallet />, color: 'var(--brand-red)' },
    { label: 'Ingresos (Saldado)', value: `$${(kpis?.totalIncome || 0).toLocaleString()}`, icon: <TrendingUp />, color: 'var(--brand-teal)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {cards.map((card, i) => (
          <div key={i} className="glass-card kpi-card">
            <div className="flex-between">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{card.label}</span>
              <div style={{ color: card.color }}>{card.icon}</div>
            </div>
            <div className="kpi-value">{card.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <section className="glass-card">
          <h3>Agenda del Día</h3>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {classes.length > 0 ? classes.map(c => (
              <div key={c.id || c._id} className="flex-between" style={{ padding: '1rem', background: '#F1F5F9', borderRadius: '8px' }}>
                <div className="flex-center gap-2">
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E2E8F0', overflow: 'hidden' }}>
                    <img src={c.student?.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{c.student?.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.topic}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: 'var(--brand-amber)' }}>{c.startTime}</div>
                  <div style={{ fontSize: '0.8rem' }}>Prof. {c.teacher?.name.split(' ')[0]}</div>
                </div>
              </div>
            )) : <p>No hay clases para hoy.</p>}
          </div>
        </section>

        <section className="glass-card">
          <h3>Alertas Pendientes</h3>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex-center gap-2" style={{ color: 'var(--brand-red)', fontSize: '0.9rem' }}>
              <Music2 size={16} />
              <span>Inasistencia: Sofía M. ayer</span>
            </div>
            <div className="flex-center gap-2" style={{ color: 'var(--brand-red)', fontSize: '0.9rem' }}>
              <Wallet size={16} />
              <span>Pago vencido: Julian D.</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
