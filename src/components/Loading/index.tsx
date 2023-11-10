import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="rgba(255, 255, 255, 0.7)"
      zIndex={1000}
    >
      <CircularProgress />
      <Typography>Carregando...</Typography>
    </Box>
  );
};

export default Loading;