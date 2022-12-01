import { getRouteByName } from './../../../helpers/routesRegistered';
import { api } from 'api';
import { RouterActions } from 'app/global-stores/router';
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

function* createExpense(action: ReturnType<typeof actions.createExpense>) {
  try {
    const response = yield call(api.expense.create, action.payload);
    yield put(actions.createExpenseSuccess(response.data));
    yield put(RouterActions.push(getRouteByName('expenses.index')));
  } catch (err) {
    yield put(actions.createExpenseError(err as AxiosError | Error));
  }
}

export function* Saga() {
  yield takeLatest(actions.fetchExpense.type, fetchExpense);
  yield takeLatest(actions.fetchCurrencies.type, fetchCurrencies);
  yield takeLatest(actions.createExpense.type, createExpense);
}
