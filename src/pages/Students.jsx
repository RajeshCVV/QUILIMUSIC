import { dataService } from '../data/dataService';
import { Search, UserPlus, MoreVertical, Music, Wallet, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await dataService.getAll('STUDENTS');
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    if (status === 'Saldado') return 'badge-paid';
    if (status === 'Pendiente') return 'badge-pending';
    return 'badge-overdue';
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '50vh', flexDirection: 'column', gap: '1rem' }}>
        <Loader2 className="animate-spin" size={40} />
        <p>Cargando Estudiantes...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="flex-between">
        <div className="glass-card flex-center gap-2" style={{ padding: '0.5rem 1rem', width: '300px' }}>
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Buscar estudiante..." 
            style={{ border: 'none', background: 'none', outline: 'none', width: '100%' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex-center gap-2" style={{ background: 'var(--brand-navy)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 600 }}>
          <UserPlus size={18} />
          Nuevo Estudiante
        </button>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '1rem 1.5rem' }}>Estudiante</th>
              <th>Edad</th>
              <th>Habilidades Musicales</th>
              <th>Hrs. Totales</th>
              <th>Estatus Pago</th>
              <th style={{ padding: '1rem 1.5rem' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id || student._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div className="flex-center gap-2" style={{ justifyContent: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E2E8F0', overflow: 'hidden' }}>
                      <img src={student.photo} alt={student.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{student.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{student.email}</div>
                    </div>
                  </div>
                </td>
                <td>{student.age} años</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {student.skills.map(skill => (
                      <span key={skill} className="flex-center gap-1" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: '#E2E8F0', borderRadius: '4px' }}>
                        <Music size={10} /> {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{student.hoursHistory}h</td>
                <td>
                  <span className={`badge ${getStatusClass(student.paymentStatus)}`}>
                    {student.paymentStatus}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <button style={{ color: 'var(--text-muted)' }}><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
