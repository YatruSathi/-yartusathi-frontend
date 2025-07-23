import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Switch,
  FormControlLabel,
  Chip,
  Alert,
  Snackbar,
  Avatar,
} from '@mui/material';
import { CheckCircle, Cancel, CloudUpload, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router';

interface Participant {
  id: number;
  name: string;
  email: string;
  phone: string;
  approved: boolean;
}

interface EventData {
  id: number;
  title: string;
  eventType: string;
  startDate: string;
  isLive: boolean;
  isSoldOut: boolean;
  profileCompleted: boolean;
  documentUploaded: boolean;
  participants: Participant[];
  coverImage?: string;
}

// Mock data with more details
const mockEvent: EventData = {
  id: 1,
  title: 'Mountain Hike 2025',
  eventType: 'Adventure',
  startDate: '2025-08-15',
  isLive: false,
  isSoldOut: false,
  profileCompleted: false,
  documentUploaded: false,
  coverImage: 'https://example.com/mountain-hike.jpg',
  participants: [
    {
      id: 1,
      name: 'Aayush Shrestha',
      email: 'aayush@example.com',
      phone: '9800000001',
      approved: false,
    },
    { id: 2, name: 'Mina Sharma', email: 'mina@example.com', phone: '9800000002', approved: true },
  ],
};

const MyCreatedEvents: React.FC = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData>(mockEvent);
  const [doc, setDoc] = useState<File | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showNotification = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleApprove = (id: number) => {
    setEvent(prev => ({
      ...prev,
      participants: prev.participants.map(p => (p.id === id ? { ...p, approved: true } : p)),
    }));
    showNotification('Participant approved successfully');
  };

  const handleMakeLive = () => {
    if (!event.profileCompleted || !event.documentUploaded) {
      showNotification('Complete your profile and upload the required document first');
      return;
    }
    setEvent(prev => ({ ...prev, isLive: true }));
    showNotification('Event is now live');
  };

  const handleStopRegistration = () => {
    setEvent(prev => ({ ...prev, isSoldOut: true }));
    showNotification('Registration has been closed');
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 5000000) {
        // 5MB limit
        showNotification('File size should be less than 5MB');
        return;
      }
      setDoc(file);
      setEvent(prev => ({ ...prev, documentUploaded: true }));
      showNotification('Document uploaded successfully');
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1a365d' }}>
        My Events
      </Typography>

      <Card
        sx={{
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {event.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Chip
                  label={event.eventType}
                  size="small"
                  sx={{
                    backgroundColor: '#f0f7ff',
                    color: '#2c5282',
                    fontWeight: 500,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Starts {new Date(event.startDate).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              onClick={() => navigate(`/events/${event.id}`)}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              View Details
            </Button>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Event Status
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Chip
                icon={<CheckCircle />}
                label={event.isLive ? 'Live' : 'Draft'}
                color={event.isLive ? 'success' : 'default'}
                variant="outlined"
              />
              <Chip
                icon={event.isSoldOut ? <Cancel /> : <CheckCircle />}
                label={event.isSoldOut ? 'Registration Closed' : 'Registration Open'}
                color={event.isSoldOut ? 'error' : 'success'}
                variant="outlined"
              />
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Requirements
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={event.profileCompleted}
                    onChange={() =>
                      setEvent(prev => ({ ...prev, profileCompleted: !prev.profileCompleted }))
                    }
                  />
                }
                label="Profile Completed"
              />
              <Box>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUpload />}
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Upload Document
                  <input type="file" hidden onChange={handleDocUpload} accept=".pdf,.doc,.docx" />
                </Button>
                {doc && (
                  <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                    ✓ {doc.name}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Participants ({event.participants.length})
            </Typography>
            <List sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}>
              {event.participants.map(user => (
                <ListItem
                  key={user.id}
                  divider
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#2c5282' }}>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email} • {user.phone}
                      </Typography>
                    </Box>
                  </Box>
                  {!user.approved ? (
                    <Button
                      variant="contained"
                      onClick={() => handleApprove(user.id)}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        bgcolor: '#2c5282',
                        '&:hover': { bgcolor: '#1a365d' },
                      }}
                    >
                      Approve
                    </Button>
                  ) : (
                    <Chip label="Approved" color="success" size="small" icon={<CheckCircle />} />
                  )}
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleMakeLive}
              disabled={event.isLive}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Make Event Live
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleStopRegistration}
              disabled={event.isSoldOut}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Stop Registration
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar open={showAlert} autoHideDuration={4000} onClose={() => setShowAlert(false)}>
        <Alert onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyCreatedEvents;
