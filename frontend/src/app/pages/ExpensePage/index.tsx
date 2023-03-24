import { getRouteByName } from 'app/helpers/routesRegistered';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffectOnce } from 'react-use';
import { useExpensePageSlice } from './slice';
import { selectExpensePage } from './slice/selectors';
import { DashboardLayout } from 'app/components/Layouts/DashboardLayout/Loadable';
import Button from '@mui/material/Button';
import { FormDialog } from './FormDialog';

export function ExpensePage() {
  const dispatch = useDispatch();

  const { actions } = useExpensePageSlice();
  const { expenses, loadings, formOpen } = useSelector(selectExpensePage);

  const handleCreate = () => {
    dispatch(actions.create());
  };

  const handleEdit = (id: number) => {
    dispatch(actions.edit(id));
  };

  const handleFormClose = () => {
    dispatch(actions.closeForm());
  };

  const handleDelete = (id: number) => {
    dispatch(actions.deleteExpense(id));
  };

  useEffectOnce(() => {
    dispatch(actions.fetchExpense());
  });

  return (
    <DashboardLayout title="Expenses">
      <div>
        <Link to={getRouteByName('home')}>Home</Link>
        <Button onClick={handleCreate}>Add</Button>
      </div>

      {loadings.fetching && <div>Loading...</div>}
      {!loadings.fetching && expenses.length === 0 && <div>No expenses</div>}
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.description}-
            <button
              type="button"
              onClick={() => handleEdit(expense.id as number)}
            >
              Edit
            </button>
            -
            <button
              type="button"
              onClick={() => handleDelete(expense.id as number)}
              disabled={loadings.deleting}
            >
              {loadings.deleting_id === expense.id ? 'Loading...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>

      <FormDialog open={formOpen} onClose={handleFormClose} />
    </DashboardLayout>
  );
}
