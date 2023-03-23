import { getRouteByName } from 'app/helpers/routesRegistered';
import React, { useState } from 'react';
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
  const { expenses, loadings } = useSelector(selectExpensePage);

  const [isFormOpen, setIsFormOpen] = useState(true);

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
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
        {/* <Link to={getRouteByName('expenses.create')}>Create</Link> */}

        <Button onClick={handleFormOpen}>Add</Button>
      </div>

      {loadings.fetching && <div>Loading...</div>}
      {!loadings.fetching && expenses.length === 0 && <div>No expenses</div>}
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.description}-
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

      <FormDialog isOpen={isFormOpen} onClose={handleFormClose} />
    </DashboardLayout>
  );
}
