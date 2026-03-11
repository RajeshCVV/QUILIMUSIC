import { dataService } from '../data/dataService';
import { FileDown, Filter, Calendar, Users, GraduationCap, Archive, Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';

const Reports = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentData, teacherData, classData] = await Promise.all([
          dataService.getAll('STUDENTS'),
          dataService.getAll('TEACHERS'),
          dataService.getClassesWithDetails()
        ]);
        setStudents(studentData);
        setTeachers(teacherData);
        setClasses(classData);
      } catch (error) {
        console.error('Error fetching data for reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const exportToExcel = () => {
    const reportData = classes.map(c => ({
      Fecha: c.date,
      Hora: c.startTime,
      Estudiante: c.student?.name,
      Docente: c.teacher?.name,
      Especialidad: c.teacher?.specialty,
      Tema: c.topic,
      Estado: c.status
    }));

    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clases");
    XLSX.writeFile(wb, `Reporte_QuiliMusic_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '50vh', flexDirection: 'column', gap: '1rem' }}>
        <Loader2 className="animate-spin" size={40} />
        <p>Generando Datos de Reporte...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="flex-between">
        <h2>Reportes Inteligentes</h2>
        <button 
          onClick={exportToExcel}
          className="flex-center gap-2" 
          style={{ background: 'var(--brand-teal)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700 }}
        >
          <FileDown size={18} />
          Exportar a Excel
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card">
          <div className="flex-center gap-3" style={{ justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ padding: '0.8rem', background: '#F1F5F9', borderRadius: '12px' }}><Users /></div>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Alumnos Registrados</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{students.length}</p>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex-center gap-3" style={{ justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ padding: '0.8rem', background: '#F1F5F9', borderRadius: '12px' }}><GraduationCap /></div>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Plantilla Docente</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{teachers.length}</p>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex-center gap-3" style={{ justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ padding: '0.8rem', background: '#F1F5F9', borderRadius: '12px' }}><Calendar /></div>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Clases Ejecutadas (Mes)</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{classes.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
