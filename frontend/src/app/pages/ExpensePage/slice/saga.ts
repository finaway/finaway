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

function* fetchCurrencies() {
  try {
    const response = yield call(api.currency.getAll);
    yield put(actions.fetchCurrenciesSuccess(response.data));
  } catch (err) {
    yield put(actions.fetchCurrenciesError(err as AxiosError | Error));
  }
}

function* edit(action: ReturnType<typeof actions.edit>) {
  try {
    const response = yield call(api.expense.find, action.payload);
    yield put(actions.editDataSuccess(response.data));
  } catch (err) {
    yield put(actions.editDataError(err as AxiosError | Error));
  }
}

function* createExpense(action: ReturnType<typeof actions.createExpense>) {
  try {
    const response = yield call(api.expense.create, action.payload);
    yield put(actions.createExpenseSuccess(response.data));
    yield put(actions.closeForm());
  } catch (err) {
    yield put(actions.createExpenseError(err as AxiosError | Error));
  }
}

function* updateExpense(action: ReturnType<typeof actions.updateExpense>) {
  try {
    const response = yield call(
      api.expense.update,
      action.payload.id,
      action.payload.data,
    );
    yield put(actions.updateExpenseSuccess(response.data));
    yield put(actions.closeForm());
  } catch (err) {
    yield put(actions.updateExpenseError(err as AxiosError | Error));
  }
}

function* deleteExpense(action: ReturnType<typeof actions.deleteExpense>) {
  try {
    const response = yield call(api.expense.delete, action.payload);
    yield put(actions.deleteExpenseSuccess(response.data));
  } catch (err) {
    yield put(actions.deleteExpenseError(err as AxiosError | Error));
  }
}

export function* Saga() {
  yield takeLatest(actions.fetchExpense.type, fetchExpense);
  yield takeLatest(actions.fetchCurrencies.type, fetchCurrencies);
  yield takeLatest(actions.edit.type, edit);
  yield takeLatest(actions.createExpense.type, createExpense);
  yield takeLatest(actions.updateExpense.type, updateExpense);
  yield takeLatest(actions.deleteExpense.type, deleteExpense);
}
