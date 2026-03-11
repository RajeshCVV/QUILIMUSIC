import { dataService } from '../data/dataService';
import { DollarSign, Wallet, ArrowUpCircle, User, CreditCard, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Finances = () => {
  const [kpis, setKpis] = useState(null);
  const [payments, setPayments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpiData, paymentData, teacherData, studentData] = await Promise.all([
          dataService.getDashboardKPIs(),
          dataService.getAll('PAYMENTS'),
          dataService.getAll('TEACHERS'),
          dataService.getAll('STUDENTS')
        ]);
        setKpis(kpiData);
        setPayments(paymentData);
        setTeachers(teacherData);
        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching financial data:', error);
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
        <p>Cargando Finanzas...</p>
      </div>
    );
  }

  const totalPayroll = teachers.reduce((acc, t) => acc + (t.hoursWorked * t.hourlyRate), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card flex-between" style={{ borderLeft: '4px solid var(--brand-teal)' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ingresos Totales (Saldados)</p>
            <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>${(kpis?.totalIncome || 0).toLocaleString()}</h2>
          </div>
          <ArrowUpCircle size={40} className="text-teal" />
        </div>

        <div className="glass-card flex-between" style={{ borderLeft: '4px solid var(--brand-red)' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pagos Pendientes</p>
            <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>$700,000</h2>
          </div>
          <Wallet size={40} className="text-red" />
        </div>

        <div className="glass-card flex-between" style={{ borderLeft: '4px solid var(--brand-navy)' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Egresos Proyectados (Nómina)</p>
            <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>${totalPayroll.toLocaleString()}</h2>
          </div>
          <DollarSign size={40} style={{ color: 'var(--brand-navy)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
        <section className="glass-card" style={{ padding: 0 }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #F1F5F9' }}>
            <h3>Historial de Pagos</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
             <thead style={{ background: '#F8FAFC', fontSize: '0.85rem' }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Alumno</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Concepto</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Monto</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Estado</th>
                </tr>
             </thead>
             <tbody>
                {payments.map(p => {
                  const s = students.find(st => (st.id || st._id) === p.studentId);
                  return (
                    <tr key={p.id || p._id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '0.9rem' }}>
                      <td style={{ padding: '1rem' }}>{s?.name}</td>
                      <td style={{ padding: '1rem' }}>{p.concept}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>${p.amount.toLocaleString()}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                         <span className={`badge ${p.status === 'Saldado' ? 'badge-paid' : 'badge-pending'}`}>
                            {p.status}
                         </span>
                      </td>
                    </tr>
                  );
                })}
             </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Finances;
