import { dataService } from '../data/dataService';
import { GraduationCap, Clock, BookOpen, Mail, Phone, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await dataService.getAll('TEACHERS');
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '50vh', flexDirection: 'column', gap: '1rem' }}>
        <Loader2 className="animate-spin" size={40} />
        <p>Cargando Docentes...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
      {teachers.map(teacher => (
        <div key={teacher.id || teacher._id} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="flex-center gap-3" style={{ justifyContent: 'flex-start' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: '#E2E8F0', overflow: 'hidden' }}>
              <img src={teacher.photo} alt={teacher.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>{teacher.name}</h3>
              <p className="text-amber" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{teacher.specialty}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="flex-center gap-2" style={{ justifyContent: 'flex-start', fontSize: '0.85rem' }}>
              <BookOpen size={16} className="text-muted" />
              <span>{teacher.instruments.join(', ')}</span>
            </div>
            <div className="flex-center gap-2" style={{ justifyContent: 'flex-start', fontSize: '0.85rem' }}>
              <Clock size={16} className="text-muted" />
              <span>{teacher.hoursWorked}h Laboradas</span>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '0.85rem', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Disponibilidad</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {teacher.availability && Object.entries(teacher.availability).map(([day, slots]) => (
                <div key={day} className="flex-between" style={{ fontSize: '0.8rem' }}>
                  <span style={{ fontWeight: 600 }}>{day}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{slots.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Teachers;
