import { dataService } from '../data/dataService';
import { Plus, Calendar as CalendarIcon, Clock, User, GraduationCap, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classData, studentData, teacherData] = await Promise.all([
          dataService.getClassesWithDetails(),
          dataService.getAll('STUDENTS'),
          dataService.getAll('TEACHERS')
        ]);
        setClasses(classData);
        setStudents(studentData);
        setTeachers(teacherData);
      } catch (error) {
        console.error('Error fetching classes:', error);
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
        <p>Cargando Agenda...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="flex-between">
        <h2>Agenda de Clases</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="flex-center gap-2" 
          style={{ background: 'var(--brand-amber)', color: 'var(--brand-navy)', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700 }}
        >
          <Plus size={18} />
          Agendar Nueva Clase
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '0' }}>
           <div style={{ padding: '1.5rem', borderBottom: '1px solid #F1F5F9' }}>
              <h3 style={{ fontSize: '1rem' }}>Semana de {format(new Date(), 'dd MMMM, yyyy')}</h3>
           </div>
           
           <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {classes.length > 0 ? classes.map(c => (
                <div key={c.id || c._id} className="flex-between" style={{ padding: '1.2rem', background: '#F8FAFC', borderLeft: '4px solid var(--brand-amber)', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ width: '80px', textAlign: 'center' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{c.startTime}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.date}</div>
                    </div>
                    <div>
                      <div className="flex-center gap-1" style={{ justifyContent: 'flex-start', fontWeight: 600 }}>
                        <User size={14} className="text-muted" /> {c.student?.name}
                      </div>
                      <div className="flex-center gap-1" style={{ justifyContent: 'flex-start', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <GraduationCap size={14} /> Prof. {c.teacher?.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', marginTop: '0.4rem', fontStyle: 'italic' }}>"{c.topic}"</div>
                    </div>
                  </div>
                  <div className="badge badge-paid" style={{ fontSize: '0.7rem' }}>Programada</div>
                </div>
              )) : <p>No hay clases agendadas.</p>}
            </div>
           </div>
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ background: 'var(--brand-navy)', color: 'white' }}>
            <h3 style={{ color: 'white', fontSize: '1rem', marginBottom: '1rem' }}>Motor de Agendamiento</h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,2255,255,0.7)', lineHeight: 1.6 }}>
              Selecciona un docente para ver sus huecos de disponibilidad real. El sistema bloqueará automáticamente los horarios ya ocupados.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Classes;
