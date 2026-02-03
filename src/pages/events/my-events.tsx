import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Chip,
  Alert,
  Avatar,
  Container,
  Grid,
  Divider,
  Stack,
  Tab,
  Tabs,
  CircularProgress,
  IconButton,
  Paper,
} from '@mui/material';
import { 
  CheckCircle, 
  Cancel, 
  Person, 
  CalendarMonth, 
  LocationOn,
  DeleteOutline
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import api from '../../services/api';
import { EventCard } from '../home/components/event-card';

interface Booking {
  id: number;
  event: {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    location: string;
  };
  booked_at: string;
  status: string;
  ticket_count: number;
}

interface OrganizedEvent {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  category: string;
  participants: any[];
}

const MyEventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [organizedEvents, setOrganizedEvents] = useState<OrganizedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch bookings (user as a traveler)
      const bookingsRes = await api.get('bookings/');
      setBookings(bookingsRes.data);

      // Fetch organized events (user as an organizer)
      // For now, let's assume we have an endpoint for this or filter from all events
      const eventsRes = await api.get('events/');
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const filtered = eventsRes.data.filter((e: any) => e.created_by?.id === userData.id);
      setOrganizedEvents(filtered);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load your events. Please try again.");
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id: number) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await api.delete(`bookings/${id}/`);
        setBookings(prev => prev.filter(b => b.id !== id));
      } catch (err) {
        alert("Failed to cancel booking.");
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box mb={6}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          My Travels & Events
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your booked adventures and the events you're organizing.
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)}>
          <Tab label={`Booked Experiences (${bookings.length})`} sx={{ fontWeight: 700, textTransform: 'none' }} />
          <Tab label={`Organized by Me (${organizedEvents.length})`} sx={{ fontWeight: 700, textTransform: 'none' }} />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {bookings.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 8, textAlign: 'center', bgcolor: 'rgba(15, 23, 42, 0.02)', borderRadius: 4 }}>
                <CalendarMonth sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">No bookings yet</Typography>
                <Button variant="contained" onClick={() => navigate('/events')} sx={{ mt: 2 }}>Explore Adventures</Button>
              </Paper>
            </Grid>
          ) : (
            bookings.map((booking) => (
              <Grid item xs={12} key={booking.id}>
                <Card sx={{ borderRadius: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden' }}>
                  <Box sx={{ width: { xs: '100%', md: 300 }, height: 200 }}>
                    <img 
                      src={booking.event.image || '/placeholder.jpg'} 
                      alt={booking.event.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </Box>
                  <CardContent sx={{ flex: 1, p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="h5" fontWeight={800} gutterBottom>{booking.event.title}</Typography>
                        <Stack direction="row" spacing={2} mb={2}>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <CalendarMonth fontSize="small" color="action" />
                            <Typography variant="body2">{new Date(booking.event.date).toLocaleDateString()}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <LocationOn fontSize="small" color="action" />
                            <Typography variant="body2">{booking.event.location}</Typography>
                          </Box>
                        </Stack>
                        <Chip 
                          label={`Confirmed for ${booking.ticket_count} traveler(s)`} 
                          color="success" 
                          size="small" 
                          icon={<CheckCircle />} 
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={() => navigate(`/events/${booking.event.id}`)}>Details</Button>
                        <IconButton color="error" onClick={() => handleCancelBooking(booking.id)}>
                          <DeleteOutline />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {organizedEvents.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 8, textAlign: 'center', bgcolor: 'rgba(15, 23, 42, 0.02)', borderRadius: 4 }}>
                <Person sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">You haven't created any events</Typography>
                <Button variant="contained" onClick={() => navigate('/events/create')} sx={{ mt: 2 }}>Create Your First Event</Button>
              </Paper>
            </Grid>
          ) : (
            organizedEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventCard
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  image={event.image}
                  category={event.category}
                  onViewDetails={() => navigate(`/events/${event.id}`)}
                />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
};

export default MyEventsPage;
