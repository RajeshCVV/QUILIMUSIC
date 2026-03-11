import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Student, Teacher, Class, Payment } from './api/models.js';
import connectToDatabase from './api/db.js';

dotenv.config();

const seed = async () => {
  try {
    await connectToDatabase();
    
    // Clear existing
    console.log('Clearing old data...');
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Class.deleteMany({});
    await Payment.deleteMany({});

    console.log('Creating teachers...');
    const t1 = await Teacher.create({
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
    });

    const t2 = await Teacher.create({
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
    });

    console.log('Creating students...');
    const s1 = await Student.create({
      name: 'Mateo Valencia',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      age: 14,
      skills: ['Oído absoluto', 'Lectura rítmica'],
      hoursHistory: 48,
      paymentStatus: 'Saldado',
      email: 'mateo@example.com'
    });

    const s2 = await Student.create({
      name: 'Sofía Martínez',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      age: 9,
      skills: ['Excelente entonación'],
      hoursHistory: 12,
      paymentStatus: 'Pendiente',
      email: 'sofia.m@example.com'
    });

    console.log('Creating classes...');
    await Class.create({
      studentId: s1._id,
      teacherId: t1._id,
      date: new Date().toISOString().split('T')[0],
      startTime: '10:00',
      endTime: '11:00',
      topic: 'Escalas menores y arpegios',
      status: 'Programada'
    });

    console.log('Creating payments...');
    await Payment.create({
      studentId: s1._id,
      amount: 350000,
      date: '2024-03-01',
      concept: 'Mensualidad Marzo',
      status: 'Saldado'
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
