import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  InputAdornment
} from '@mui/material';
import { Search } from '@mui/icons-material';

export default function EmailSidebar({ emails, selectedEmail, onEmailSelect, onSearch, searchTerm }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
  const debounceTimer = useRef(null);

  // Sync local search term with prop when it changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm || '');
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setLocalSearchTerm(value);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search emails..."
          value={localSearchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Box>

      <Divider />

      <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
        {emails.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No emails found
            </Typography>
          </Box>
        ) : (
          emails.map((email) => (
            <ListItem
              key={email.id}
              button
              selected={selectedEmail?.id === email.id}
              onClick={() => onEmailSelect(email)}
              sx={{
                borderBottom: '1px solid #e0e0e0',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                '&.Mui-selected': {
                  backgroundColor: '#e3f2fd',
                  '&:hover': {
                    backgroundColor: '#bbdefb',
                  },
                },
              }}
            >
              <ListItemText
                primary={
                  <Box>
                    <Typography variant="subtitle2" noWrap>
                      {email.subject}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      To: {email.to}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {truncateText(email.body)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                      {formatDate(email.created_at)}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
}
