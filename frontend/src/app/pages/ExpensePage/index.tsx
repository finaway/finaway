import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useExpensePageSlice } from './slice';
import { selectExpensePage } from './slice/selectors';
import { FormDialog } from './FormDialog';
import { List } from './List';
import { useAppBarTitle } from 'app/hooks/useAppBarTitle';
import { Helmet } from 'react-helmet-async';

export function ExpensePage() {
  useAppBarTitle('Expense');

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
    <>
      <Helmet>
        <title>Expense</title>
      </Helmet>

      <List
        data={expenses}
        loadings={loadings}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={handleCreate}
      >
        <AddIcon />
      </Fab>

      <FormDialog open={formOpen} onClose={handleFormClose} />
    </>
  );
}
