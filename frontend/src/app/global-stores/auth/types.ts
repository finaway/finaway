/* --- STATE --- */
export interface AuthState {
  user: User | null;
  token: string | null;
}

interface User {
  id: number;
  email: string;
  name: string;
}
