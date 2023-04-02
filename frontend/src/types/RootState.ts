import { AppState } from 'app/global-stores/app/types';
import { AuthState } from 'app/global-stores/auth/types';
import { LoginPageState } from 'app/pages/LoginPage/slice/types';
import { ExpensePageState } from 'app/pages/ExpensePage/slice/types';
import { RouterState } from 'app/global-stores/router/types';
import { SignUpPageState } from 'app/pages/SignUpPage/slice/types';
import { ForgotPasswordPageState } from 'app/pages/ForgotPasswordPage/slice/types';
import { EditProfilePageState } from 'app/pages/ProfilePage/EditProfilePage/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  app: AppState;
  auth: AuthState;
  loginPage: LoginPageState;
  signupPage: SignUpPageState;
  expensePage: ExpensePageState;
  router: RouterState;
  forgotPasswordPage?: ForgotPasswordPageState;
  editProfilePage?: EditProfilePageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
