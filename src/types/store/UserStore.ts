import type { User } from '../models/UserModels';

export interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
}
