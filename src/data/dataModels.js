/**
 * QMMS Data Models & Constants
 */

export const PAYMENT_STATUS = {
  PAID: 'Saldado',
  PENDING: 'Pendiente',
  OVERDUE: 'Vencido'
};

export const CLASS_STATUS = {
  SCHEDULED: 'Programada',
  COMPLETED: 'Completada',
  CANCELLED: 'Cancelada',
  ABSENT: 'Inasistencia'
};

export const TRIAL_DURATION_MS = 72 * 60 * 60 * 1000; // 72 hours
