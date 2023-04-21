import { call, put, takeLatest } from 'redux-saga/effects';
import { editPasswordPageActions as actions } from '.';
import { api } from 'api';
import { RouterActions } from 'app/global-stores/router';
import { getRouteByName } from 'app/helpers/routesRegistered';
import { AxiosError } from 'axios';

function* update(action: ReturnType<typeof actions.update>) {
  try {
    yield call(api.profile.updatePassword, action.payload);
    yield put(actions.updateSuccess());
    yield put(RouterActions.push(getRouteByName('profile')));
  } catch (err) {
    yield put(actions.updateError(err as AxiosError | Error));
  }
}

export function* editPasswordPageSaga() {
  yield takeLatest(actions.update.type, update);
}
