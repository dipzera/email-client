import {
  Box,
  Typography,
  Divider,
  Chip,
  Paper
} from '@mui/material';
import { Email, AccessTime } from '@mui/icons-material';

export default function EmailDetail({ email }) {
  if (!email) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formatEmailField = (field, value) => {
    if (!value) return null;
    
    return (
      <Box sx={{ mb: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {field}:
        </Typography>
        <Typography variant="body2" sx={{ ml: 1 }}>
          {value}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          {email.subject}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {formatDate(email.created_at)}
          </Typography>
        </Box>

        <Paper sx={{ p: 2, backgroundColor: '#f8f9fa', mb: 2 }}>
          {formatEmailField('To', email.to)}
          {formatEmailField('CC', email.cc)}
          {formatEmailField('BCC', email.bcc)}
        </Paper>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Typography 
          variant="body1" 
          sx={{ 
            whiteSpace: 'pre-wrap',
            lineHeight: 1.6,
            fontFamily: 'inherit'
          }}
        >
          {email.body}
        </Typography>
      </Box>
    </Box>
  );
}