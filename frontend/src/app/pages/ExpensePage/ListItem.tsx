import React from 'react';
import ListItemMui from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Expense } from 'models';
import { IconButton, Paper } from '@mui/material';
import dayjs from 'dayjs';

interface ListItemProps {
  data: Expense;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loadings: {
    deleting: boolean;
    deleting_id: number | null;
  };
}

export function ListItem({ data, loadings, onEdit, onDelete }: ListItemProps) {
  const humanDate = dayjs(data.date).format('MMM D, YYYY');

  return (
    <Paper>
      <ListItemMui
        secondaryAction={
          <>
            <IconButton edge="end" onClick={() => onEdit(data.id as number)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => onDelete(data.id as number)}>
              {loadings.deleting && loadings.deleting_id === data.id ? (
                <CircularProgress size={20} />
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
          </>
        }
      >
        <ListItemText
          primary={data.description}
          secondary={
            <>
              <span>{humanDate}</span>
              {' - '}
              <span>
                {data.currency?.symbol}
                {data.amount?.toLocaleString()}
              </span>
            </>
          }
        />
      </ListItemMui>
    </Paper>
  );
}
