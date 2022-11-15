import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { useExpensePageSlice } from './slice';
import { selectExpensePage } from './slice/selectors';

export function ExpensePage() {
  const dispatch = useDispatch();
  const { actions } = useExpensePageSlice();
  const { expenses, loadings } = useSelector(selectExpensePage);

  useEffectOnce(() => {
    dispatch(actions.fetchExpense());
  });

  return (
    <div>
      {loadings.fetching && <div>Loading...</div>}
      {!loadings.fetching && expenses.length === 0 && <div>No expenses</div>}
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>{expense.description}</li>
        ))}
      </ul>
    </div>
  );
}
