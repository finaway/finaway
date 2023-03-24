import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/Inbox';
import { blueGrey } from '@mui/material/colors';

export function ListEmpty() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
      }}
    >
      <InboxIcon sx={{ fontSize: 100 }} color="disabled" />
      <Typography variant="h6" sx={{ mt: 2 }} color={blueGrey[300]}>
        No Data Found
      </Typography>
    </Box>
  );
}
