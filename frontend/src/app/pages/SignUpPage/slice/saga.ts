import { AxiosError } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Actions as actions } from '.';
import { api } from 'api';
import { AuthActions } from 'app/global-stores/auth';

function* signUp(action: ReturnType<typeof actions.signUp>) {
  try {
    const response = yield call(api.auth.register, action.payload);
    yield put(actions.signUpSuccess(response.data));
    yield put(AuthActions.setToken(response.data.data.token));
    yield put(AuthActions.setUser(response.data.data.user));
  } catch (err) {
    yield put(actions.signUpError(err as AxiosError | Error));
  }
}

export function* Saga() {
  yield takeLatest(actions.signUp.type, signUp);
}
