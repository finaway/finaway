/* --- STATE --- */
export interface LoginPageState {
  message: string;
  errors: {
    message?: string;
  };
  loading: boolean;
}

export interface LoginError {
  message: string;
}
