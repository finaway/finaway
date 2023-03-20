/* --- STATE --- */
export interface SignUpPageState {
  errors: {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
  };
  loading: boolean;
}
