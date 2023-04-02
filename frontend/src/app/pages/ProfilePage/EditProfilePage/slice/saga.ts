import { call, put, takeLatest } from 'redux-saga/effects';
import { editProfilePageActions as actions } from '.';
import { api } from 'api';
import { RouterActions } from 'app/global-stores/router';
import { AxiosError } from 'axios';
import { AuthActions } from 'app/global-stores/auth';

function* update(action: ReturnType<typeof actions.update>) {
  try {
    const response = yield call(api.profile.update, action.payload);
    yield put(actions.updateSuccess());
    yield put(AuthActions.setUser(response.data.data));
    yield put(RouterActions.push('/profile'));
  } catch (err) {
    yield put(actions.updateError(err as AxiosError | Error));
  }
}

export function* editProfilePageSaga() {
  yield takeLatest(actions.update.type, update);
}
