import { Issue } from '@/features/issues/types';

interface Alert {
  id: string;
  date: string;
}

export enum ScheduleStatus {
  NOT_RESOLVED = 'Não Resolvido',
  PROGRESS = 'Em andamento',
  PENDENT = 'Pendente',
  URGENT = 'Urgente',
  RESOLVED = 'Resolvido',
}

export interface Schedule {
  id: string;
  dateTime: string;
  description: string;
  status: ScheduleStatus;
  alerts: Array<Alert>;
  issue: Issue;
}
