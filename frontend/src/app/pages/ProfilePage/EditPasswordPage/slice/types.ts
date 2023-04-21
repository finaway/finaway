/* --- STATE --- */
export interface EditPasswordPageState {
  loadings: {
    updating: boolean;
  };
  errors: {
    old_password?: string[];
    password?: string[];
    password_confirmation?: string[];
  };
}

export interface EditPasswordPageUpdateError {
  errors: EditPasswordPageState['errors'];
}
