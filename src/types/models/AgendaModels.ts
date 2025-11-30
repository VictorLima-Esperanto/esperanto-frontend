export interface AgendaItem {
  date: Date;
  label?: string;
  status?: 'done' | 'live' | 'none';
}
