import { api } from 'api';
import { AxiosError } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Actions as actions } from '.';

function* fetchExpense() {
  try {
    const response = yield call(api.expense.getAll);
    yield put(actions.fetchExpenseSuccess(response.data));
  } catch (err) {
    yield put(actions.fetchExpenseError(err as AxiosError | Error));
  }
}

export function* Saga() {
  yield takeLatest(actions.fetchExpense.type, fetchExpense);
}
