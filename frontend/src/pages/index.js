import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { emailAPI } from '../utils/api';
import EmailSidebar from '../components/EmailSidebar';
import EmailDetail from '../components/EmailDetail';
import ComposeButton from '../components/ComposeButton';
import ComposeDialog from '../components/ComposeDialog';

export default function Home() {
  const router = useRouter();
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const [composeOpen, setComposeOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchTerm = router.query.search || '';

  useEffect(() => {
    const loadEmails = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = searchTerm
          ? await emailAPI.searchEmails(searchTerm)
          : await emailAPI.getAllEmails();
        console.log(result);
        setEmails(result.emails || []);
      } catch (err) {
        console.error('Failed to load emails:', err);
        setError('Failed to load emails');
      } finally {
        setLoading(false);
      }
    };

    loadEmails();
  }, [searchTerm]); // Reload when search term changes

  const handleEmailSelect = useCallback((email) => {
    setSelectedEmail(email);
  }, []);

  const handleSearch = useCallback(async (term) => {
    // Update URL search params
    const query = { ...router.query };
    if (term) {
      query.search = term;
    } else {
      delete query.search;
    }

    router.push({
      pathname: router.pathname,
      query
    }, undefined, { shallow: true });
  }, [router]);

  const handleComposeOpen = () => {
    setComposeOpen(true);
  };

  const handleComposeClose = () => {
    setComposeOpen(false);
  };

  const refreshEmails = async () => {
    try {
      setLoading(true);
      const result = searchTerm
        ? await emailAPI.searchEmails(searchTerm)
        : await emailAPI.getAllEmails();
      setEmails(result.emails || []);
    } catch (err) {
      console.error('Failed to refresh emails:', err);
      setError('Failed to refresh emails');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSend = async (emailData) => {
    try {
      await emailAPI.createEmail(emailData);
      await refreshEmails();
      setComposeOpen(false);
    } catch (err) {
      console.error('Failed to send email:', err);
      setError('Failed to send email');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ height: '100vh', py: 2 }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ height: '100vh', py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Email Client
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2} sx={{ height: 'calc(100vh - 120px)' }}>
        <Grid item xs={4}>
          <EmailSidebar
            emails={emails}
            selectedEmail={selectedEmail}
            onEmailSelect={handleEmailSelect}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            loading={loading}
          />
        </Grid>

        <Grid item xs={8}>
          <Paper sx={{ height: '100%', p: 2 }}>
            {selectedEmail ? (
              <EmailDetail email={selectedEmail} />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Typography variant="h6" color="text.secondary">
                  Select an email to view its content
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <ComposeButton onClick={handleComposeOpen} />

      <ComposeDialog
        open={composeOpen}
        onClose={handleComposeClose}
        onSend={handleEmailSend}
      />
    </Container>
  );
}
