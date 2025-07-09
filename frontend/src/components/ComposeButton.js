import { Fab } from '@mui/material';
import { Edit } from '@mui/icons-material';

export default function ComposeButton({ onClick }) {
  return (
    <Fab
      color="primary"
      aria-label="compose"
      onClick={onClick}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <Edit />
    </Fab>
  );
}