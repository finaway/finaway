import { AuthActions } from 'app/global-stores/auth';
import { AxiosError } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { axios } from 'utils/axios';
import { LoginPageActions } from '.';

type LoginResponse = {
  data: {
    user: {
      id: number;
      email: string;
      name: string;
    };
    token: string;
  };
};

function* login(action: ReturnType<typeof LoginPageActions.login>) {
  try {
    const response = yield axios.post<LoginResponse>(
      '/auth/login',
      action.payload,
    );

    yield put(AuthActions.setUser(response.data.data.user));
    yield put(AuthActions.setToken(response.data.data.token));
  } catch (err) {
    yield put(LoginPageActions.loginError(err as AxiosError | Error));
  }
}

export function* Saga() {
  yield takeLatest(LoginPageActions.login.type, login);
}
