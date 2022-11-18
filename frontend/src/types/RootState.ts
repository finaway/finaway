import { AuthState } from 'app/global-stores/auth/types';
import { LoginPageState } from 'app/pages/LoginPage/slice/types';
import { ExpensePageState } from 'app/pages/ExpensePage/slice/types';
import { RouterState } from 'app/global-stores/router/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  auth: AuthState;
  loginPage: LoginPageState;
  expensePage: ExpensePageState;
  router: RouterState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
