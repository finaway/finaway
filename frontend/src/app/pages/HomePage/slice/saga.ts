import { call, put, takeLatest } from 'redux-saga/effects';
import { homePageActions as actions } from '.';
import { api } from 'api';

function* getWeekly() {
  try {
    const response = yield call(api.expense.reportIncomeWeekly);
    yield put(actions.getWeeklySuccess(response.data.data));
  } catch (err) {
    yield put(actions.getWeeklyError());
  }
}

function* getMonthly() {
  try {
    const response = yield call(api.expense.reportIncomeMonthly);
    yield put(actions.getMonthlySuccess(response.data.data));
  } catch (err) {
    yield put(actions.getMonthlyError());
  }
}

function* getYearly() {
  try {
    const response = yield call(api.expense.reportIncomeYearly);
    yield put(actions.getYearlySuccess(response.data.data));
  } catch (err) {
    yield put(actions.getYearlyError());
  }
}

export function* homePageSaga() {
  yield takeLatest(actions.getWeekly.type, getWeekly);
  yield takeLatest(actions.getMonthly.type, getMonthly);
  yield takeLatest(actions.getYearly.type, getYearly);
}
