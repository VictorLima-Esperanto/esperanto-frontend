import type { AgendaItem } from '../models/AgendaModels';

export interface LiveAgendaCardProps {
  nextLive?: Date | null;
  weekItems: AgendaItem[];
}
