export type Priority = 'P1' | 'P2' | 'P3' | 'P4';

export interface Task {
  id: string;
  name: string;
  assignee: string | null;
  dueDate: Date | null;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
}