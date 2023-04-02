import { api } from 'api';
import { AuthActions } from 'app/global-stores/auth';
import { AxiosError } from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { LoginPageActions } from '.';

function* login(action: ReturnType<typeof LoginPageActions.login>) {
  try {
    const response = yield call(api.auth.login, action.payload);

    yield put(LoginPageActions.loginSuccess(response));
    yield put(AuthActions.setToken(response.data.data.token));
    yield put(AuthActions.setUser(response.data.data.user));
  } catch (err) {
    yield put(LoginPageActions.loginError(err as AxiosError | Error));
  }
}

export function* Saga() {
  yield takeLatest(LoginPageActions.login.type, login);
}
