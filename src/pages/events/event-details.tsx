import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Chip,
  Divider,
  Container,
  Paper,
  Stack,
  Avatar,
  AvatarGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import api from '../../services/api';
import { getImagePath } from '../home/components/event-card';

/* ================= TYPES ================= */
interface Event {
  id: number;
  title: string;
  description: string;
  category?: string;
  image?: string;
  tags?: string;
  date?: string;
  startDateTime?: string;
  endDateTime?: string;
  location?: string;
  locationName?: string;
  mapLink?: string;
  minParticipants?: number;
  maxParticipants?: number;
  gender_preference?: string;
  ageLimit?: number;
  priorExperienceRequired?: boolean;
  isFreeEvent?: boolean;
  ticketPrice?: number;
  payOnSite?: boolean;
  equipmentList?: string;
  organizerName?: string;
  contactEmail?: string;
  phoneNumber?: string;
  socialMediaLink?: string;
  images?: { id: number, image: string }[];
  created_by?: {
    id: number;
    username: string;
    email: string;
  }
}

/* ================= COMPONENT ================= */
export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Booking state
  const [openBooking, setOpenBooking] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (!id) return;

    api
      .get<Event>(`events/${id}/`)
      .then(res => setEvent(res.data))
      .catch(err => console.error('Failed to fetch event', err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBookNow = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    setOpenBooking(true);
  };

  const confirmBooking = async () => {
    setBookingLoading(true);
    setBookingMessage(null);
    try {
      await api.post('bookings/', {
        event_id: id,
        ticket_count: ticketCount
      });
      setBookingMessage({ type: 'success', text: 'Adventure booked successfully! You can find it in My Events.' });
      setTimeout(() => {
        setOpenBooking(false);
        setBookingMessage(null);
      }, 3000);
    } catch (err: any) {
      setBookingMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to book. You might have already booked this event.' 
      });
    } finally {
      setBookingLoading(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Not scheduled';
    return new Date(dateStr).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Event not found</Typography>
        <Button onClick={() => navigate('/events')}>Back to Events</Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
      {/* Hero Header */}
      <Box sx={{ position: 'relative', height: { xs: 300, md: 500 }, mb: -10 }}>
        <Box 
          component="img" 
          src={getImagePath(event.image || "")} 
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' 
          }} 
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, mb: 4 }}>
              <Stack direction="row" spacing={1} mb={2}>
                <Chip label={event.category || "Adventure"} color="primary" size="small" sx={{ fontWeight: 700 }} />
                {event.isFreeEvent && <Chip label="Free" color="success" size="small" sx={{ fontWeight: 700 }} />}
              </Stack>
              
              <Typography variant="h2" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '2rem', md: '3.5rem' } }}>
                {event.title}
              </Typography>

              <Stack direction="row" spacing={3} alignItems="center" mb={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarMonthIcon color="action" />
                  <Typography variant="subtitle1" fontWeight={600}>{new Date(event.date || "").toLocaleDateString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="action" />
                  <Typography variant="subtitle1" fontWeight={600}>{event.location || "Nepal"}</Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h5" fontWeight={700} gutterBottom>About the Experience</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem', mb: 4 }}>
                {event.description}
              </Typography>

              {event.images && event.images.length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>Experience Gallery</Typography>
                  <Grid container spacing={2}>
                    {event.images.map((img) => (
                      <Grid item xs={6} sm={4} key={img.id}>
                        <Box 
                          sx={{ 
                            borderRadius: 3, 
                            overflow: 'hidden', 
                            height: 160,
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'scale(1.02)' }
                          }}
                        >
                          <img 
                            src={getImagePath(img.image)} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {event.equipmentList && (
                <Box sx={{ bgcolor: 'rgba(59, 130, 246, 0.05)', p: 3, borderRadius: 2, mb: 4 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>What to Bring</Typography>
                  <Typography variant="body2">{event.equipmentList}</Typography>
                </Box>
              )}

              <Typography variant="h5" fontWeight={700} gutterBottom>Participants</Typography>
              <Stack direction="row" alignItems="center" spacing={2} mb={4}>
                <AvatarGroup max={5}>
                  {[1, 2, 3, 4, 5, 6].map(i => <Avatar key={i} src={`https://i.pravatar.cc/150?u=${i}`} />)}
                </AvatarGroup>
                <Typography variant="body2" color="text.secondary">+12 others are joining</Typography>
              </Stack>
            </Paper>
          </Grid>

          {/* Sidebar Info */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: 100 }}>
              {/* Booking Card */}
              <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h4" fontWeight={800} mb={3}>
                  {event.isFreeEvent ? 'Free' : `NPR ${event.ticketPrice || '0'}`}
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1, fontWeight: 400 }}>/ person</Typography>
                </Typography>
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large" 
                  onClick={handleBookNow}
                  startIcon={<ShoppingCartIcon />}
                  sx={{ py: 2, mb: 2, borderRadius: 2 }}
                >
                  Book Experience
                </Button>
                
                <Stack direction="row" spacing={1}>
                  <Button fullWidth variant="outlined" startIcon={<FavoriteBorderIcon />}>Save</Button>
                  <Button fullWidth variant="outlined" startIcon={<ShareIcon />}>Share</Button>
                </Stack>

                <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                  <Stack spacing={2}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">Max Participants</Typography>
                      <Typography variant="body2" fontWeight={600}>{event.maxParticipants || 'No limit'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">Gender Preference</Typography>
                      <Typography variant="body2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                        {event.gender_preference || 'Any'}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">Age Limit</Typography>
                      <Typography variant="body2" fontWeight={600}>{event.ageLimit ? `${event.ageLimit}+` : 'None'}</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Paper>

              {/* Organizer Card */}
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>Organized By</Typography>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Avatar sx={{ width: 50, height: 50 }}>{event.organizerName?.charAt(0) || 'O'}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {event.organizerName || "Adventure Nepal"} <VerifiedIcon color="primary" sx={{ fontSize: 18 }} />
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Official Partner</Typography>
                  </Box>
                </Stack>
                <Stack spacing={1}>
                  <Button variant="text" startIcon={<EmailIcon />} sx={{ justifyContent: 'flex-start' }}>Contact Email</Button>
                  <Button variant="text" startIcon={<PhoneIcon />} sx={{ justifyContent: 'flex-start' }}>{event.phoneNumber || 'Call Us'}</Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Booking Dialog */}
      <Dialog open={openBooking} onClose={() => !bookingLoading && setOpenBooking(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Confirm Your Booking</DialogTitle>
        <DialogContent>
          {bookingMessage && (
            <Alert severity={bookingMessage.type} sx={{ mb: 2 }}>
              {bookingMessage.text}
            </Alert>
          )}
          <Typography variant="body2" color="text.secondary" gutterBottom>
            You are booking for: <strong>{event.title}</strong>
          </Typography>
          <Box sx={{ mt: 3 }}>
            <TextField
              label="Number of Travelers"
              type="number"
              fullWidth
              value={ticketCount}
              onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1, max: event.maxParticipants }}
            />
            {!event.isFreeEvent && (
              <Typography variant="h6" sx={{ mt: 2, textAlign: 'right', fontWeight: 700 }}>
                Total: NPR {(event.ticketPrice || 0) * ticketCount}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenBooking(false)} disabled={bookingLoading}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={confirmBooking} 
            disabled={bookingLoading}
            sx={{ px: 4 }}
          >
            {bookingLoading ? <CircularProgress size={24} /> : 'Confirm Booking'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
