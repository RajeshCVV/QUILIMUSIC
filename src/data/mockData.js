import { PAYMENT_STATUS, CLASS_STATUS } from './dataModels';
import { addDays, subDays, setHours, setMinutes, format } from 'date-fns';

export const generateMockData = () => {
  const teachers = [
    {
      id: 't1',
      name: 'Carlos Rodríguez',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      specialty: 'Piano & Teoría',
      instruments: ['Piano', 'Teclado'],
      hourlyRate: 45000,
      hoursWorked: 120,
      availability: {
        'Monday': ['08:00-12:00', '14:00-18:00'],
        'Wednesday': ['08:00-12:00', '14:00-18:00'],
        'Friday': ['08:00-12:00', '14:00-16:00']
      }
    },
    {
      id: 't2',
      name: 'Elena Gómez',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      specialty: 'Canto & Coro',
      instruments: ['Voz'],
      hourlyRate: 50000,
      hoursWorked: 85,
      availability: {
        'Tuesday': ['09:00-13:00', '15:00-19:00'],
        'Thursday': ['09:00-13:00', '15:00-19:00']
      }
    },
    {
      id: 't3',
      name: 'Andrés Castro',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      specialty: 'Guitarra Eléctrica & Bajo',
      instruments: ['Guitarra', 'Bajo'],
      hourlyRate: 40000,
      hoursWorked: 110,
      availability: {
        'Monday': ['14:00-20:00'],
        'Tuesday': ['14:00-20:00'],
        'Wednesday': ['14:00-20:00'],
        'Thursday': ['14:00-20:00']
      }
    }
  ];

  const students = [
    {
      id: 's1',
      name: 'Mateo Valencia',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      age: 14,
      skills: ['Oído absoluto', 'Lectura rítmica'],
      hoursHistory: 48,
      paymentStatus: PAYMENT_STATUS.PAID,
      email: 'mateo@example.com'
    },
    {
      id: 's2',
      name: 'Sofía Martínez',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      age: 9,
      skills: ['Excelente entonación'],
      hoursHistory: 12,
      paymentStatus: PAYMENT_STATUS.PENDING,
      email: 'sofia.m@example.com'
    },
    {
      id: 's3',
      name: 'Julian Duque',
      photo: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400',
      age: 22,
      skills: ['Composición', 'Producción'],
      hoursHistory: 96,
      paymentStatus: PAYMENT_STATUS.PAID,
      email: 'julian@example.com'
    }
  ];

  const classes = [
    {
      id: 'c1',
      studentId: 's1',
      teacherId: 't1',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '10:00',
      endTime: '11:00',
      topic: 'Escalas menores y arpegios',
      status: CLASS_STATUS.SCHEDULED
    },
    {
      id: 'c2',
      studentId: 's2',
      teacherId: 't2',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '16:00',
      endTime: '17:00',
      topic: 'Ténica de respiración diafragmática',
      status: CLASS_STATUS.SCHEDULED
    }
  ];

  const absences = [
    {
      id: 'a1',
      classId: 'prev-c1',
      type: 'STUDENT',
      reason: 'Cita médica persistente',
      suggestedReschedule: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      resolved: false,
      date: format(subDays(new Date(), 1), 'yyyy-MM-dd')
    }
  ];

  const payments = [
    { id: 'p1', studentId: 's1', amount: 350000, date: '2024-03-01', concept: 'Mensualidad Marzo', status: PAYMENT_STATUS.PAID },
    { id: 'p2', studentId: 's2', amount: 350000, date: '2024-03-05', concept: 'Mensualidad Marzo', status: PAYMENT_STATUS.PENDING }
  ];

  return { teachers, students, classes, absences, payments };
};
