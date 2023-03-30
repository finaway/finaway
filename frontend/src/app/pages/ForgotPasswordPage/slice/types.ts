/* --- STATE --- */
export interface ForgotPasswordPageState {
  errors: {
    email?: string;
  };
  loading: boolean;
}
