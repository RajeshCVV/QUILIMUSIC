import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: String,
  age: Number,
  skills: [String],
  hoursHistory: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['Saldado', 'Pendiente', 'Vencido'], default: 'Saldado' },
  email: { type: String, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: String,
  specialty: String,
  instruments: [String],
  hourlyRate: Number,
  hoursWorked: { type: Number, default: 0 },
  availability: { type: Map, of: [String] },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const ClassSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: String,
  topic: String,
  status: { type: String, default: 'Programada' },
  notes: String
}, { timestamps: true });

const PaymentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  concept: String,
  status: { type: String, enum: ['Saldado', 'Pendiente', 'Vencido'], default: 'Saldado' }
}, { timestamps: true });

const AbsenceSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  type: { type: String, enum: ['STUDENT', 'TEACHER'] },
  reason: String,
  suggestedReschedule: String,
  resolved: { type: Boolean, default: false },
  date: { type: String, required: true }
}, { timestamps: true });

export const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
export const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
export const Class = mongoose.models.Class || mongoose.model('Class', ClassSchema);
export const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
export const Absence = mongoose.models.Absence || mongoose.model('Absence', AbsenceSchema);
