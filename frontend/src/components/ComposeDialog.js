import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

export default function ComposeDialog({ open, onClose, onSend }) {
  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: ''
  });

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSend = () => {
    if (!formData.to || !formData.subject) {
      alert('Please fill in the To and Subject fields');
      return;
    }

    onSend(formData);
    setFormData({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: ''
    });
  };

  const handleClose = () => {
    onClose();
    setFormData({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: ''
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { height: '80vh' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        New Email
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="To"
          value={formData.to}
          onChange={handleChange('to')}
          fullWidth
          required
          placeholder="recipient@example.com"
        />
        
        <TextField
          label="CC"
          value={formData.cc}
          onChange={handleChange('cc')}
          fullWidth
          placeholder="cc@example.com"
        />
        
        <TextField
          label="BCC"
          value={formData.bcc}
          onChange={handleChange('bcc')}
          fullWidth
          placeholder="bcc@example.com"
        />
        
        <TextField
          label="Subject"
          value={formData.subject}
          onChange={handleChange('subject')}
          fullWidth
          required
          placeholder="Email subject"
        />
        
        <TextField
          label="Body"
          value={formData.body}
          onChange={handleChange('body')}
          fullWidth
          multiline
          rows={12}
          placeholder="Write your email here..."
          sx={{ flex: 1 }}
        />
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button 
          onClick={handleSend} 
          variant="contained" 
          color="primary"
          disabled={!formData.to || !formData.subject}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}