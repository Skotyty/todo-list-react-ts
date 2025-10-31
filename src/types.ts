export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

export const Filter = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
} as const;

export type Filter = (typeof Filter)[keyof typeof Filter];
