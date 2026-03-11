import express from 'express';
import cors from 'cors';
import connectToDatabase from './db.js';
import { Student, Teacher, Class, Payment, Absence } from './models.js';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Database connection on every request (serverless)
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// --- Students Routes ---
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/api/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// --- Teachers Routes ---
app.get('/api/teachers', async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});

app.post('/api/teachers', async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.json(teacher);
});

// --- Classes Routes ---
app.get('/api/classes', async (req, res) => {
  const classes = await Class.find().populate('studentId').populate('teacherId');
  res.json(classes);
});

app.post('/api/classes', async (req, res) => {
  const newClass = new Class(req.body);
  await newClass.save();
  res.json(newClass);
});

// --- Payments Routes ---
app.get('/api/payments', async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

app.post('/api/payments', async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.json(payment);
});

// --- Absences Routes ---
app.get('/api/absences', async (req, res) => {
  const absences = await Absence.find();
  res.json(absences);
});

// --- Dashboard Logic ---
app.get('/api/dashboard', async (req, res) => {
  const students = await Student.find();
  const classes = await Class.find();
  const payments = await Payment.find();
  
  const today = new Date().toISOString().split('T')[0];
  
  const activeStudents = students.filter(s => s.paymentStatus !== 'Vencido').length;
  const classesToday = classes.filter(c => c.date === today).length;
  const pendingPayments = payments.filter(p => p.status === 'Pendiente').length;
  const totalIncome = payments.filter(p => p.status === 'Saldado').reduce((acc, p) => acc + p.amount, 0);

  res.json({ activeStudents, classesToday, pendingPayments, totalIncome });
});

// Seed Data Route (for initial setup)
app.get('/api/seed', async (req, res) => {
  // Clear existing
  await Student.deleteMany({});
  await Teacher.deleteMany({});
  await Class.deleteMany({});
  await Payment.deleteMany({});
  await Absence.deleteMany({});

  // Add initial teachers
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

  // Add initial students
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

  // Initial Class
  await Class.create({
    studentId: s1._id,
    teacherId: t1._id,
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '11:00',
    topic: 'Escalas menores y arpegios',
    status: 'Programada'
  });

  // Initial Payment
  await Payment.create({
    studentId: s1._id,
    amount: 350000,
    date: '2024-03-01',
    concept: 'Mensualidad Marzo',
    status: 'Saldado'
  });

  res.json({ message: 'Database seeded successfully' });
});

export default app;
