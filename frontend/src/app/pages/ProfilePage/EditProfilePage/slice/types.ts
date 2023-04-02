export interface EditProfilePageState {
  loadings: {
    updating: boolean;
  };
  errors: {
    name?: string[];
  };
}

export interface EditProfilePageUpdateError {
  errors: EditProfilePageState['errors'];
}
