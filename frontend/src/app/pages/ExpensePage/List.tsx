import { Expense } from 'models';
import React from 'react';
import ListMui from '@mui/material/List';
import { ListItem } from './ListItem';
import { ListSkeleton } from './ListSkeleton';
import { ListEmpty } from './ListEmpty';

interface ListProps {
  data: Expense[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loadings: {
    fetching: boolean;
    deleting: boolean;
    deleting_id: number | null;
  };
}

export function List({ data, loadings, onEdit, onDelete }: ListProps) {
  if (!loadings.fetching && data.length === 0) {
    return <ListEmpty />;
  }

  if (loadings.fetching && data.length === 0) {
    return <ListSkeleton />;
  }

  return (
    <ListMui dense>
      {data.map(item => (
        <ListItem
          key={item.id}
          data={item}
          loadings={loadings}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ListMui>
  );
}
