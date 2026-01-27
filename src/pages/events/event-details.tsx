import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
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
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

import api from '../../services/api';

/* ================= TYPES ================= */
interface Event {
  id: number;
  title: string;
  description: string;
  category?: string;
  image?: string;
  tags?: string;
  startDateTime?: string;
  endDateTime?: string;
  locationName?: string;
  mapLink?: string;
  minParticipants?: number;
  maxParticipants?: number;
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
}

/* ================= COMPONENT ================= */
export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    api
      .get<Event>(`events/${id}/`)
      .then(res => setEvent(res.data))
      .catch(err => console.error('Failed to fetch event', err))
      .finally(() => setLoading(false));
  }, [id]);

  // Format date nicely
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
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
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography>Event not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '80vh', background: '#ffffff', py: 4 }}>
      <Card sx={{ width: '90%', maxWidth: 1200, margin: '0 auto', borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={event.image ?? '/placeholder.jpg'}
          alt={event.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {event.title}
          </Typography>

          {/* Tags */}
          {event.tags && (
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {event.tags.split(',').map(tag => (
                <Chip
                  key={tag.trim()}
                  label={tag.trim()}
                  size="small"
                  sx={{ backgroundColor: '#f0f7ff', color: '#2c5282', fontWeight: 500 }}
                />
              ))}
            </Box>
          )}

          {/* Description */}
          <Typography variant="body1" sx={{ color: '#4a5568', mb: 3, fontSize: 18, lineHeight: 1.6 }}>
            {event.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Event Info */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1, color: '#3182ce' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#4a5568', fontWeight: 600 }}>
                    Start Date & Time
                  </Typography>
                  <Typography variant="body2">{formatDate(event.startDateTime)}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1, color: '#3182ce' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#4a5568', fontWeight: 600 }}>
                    End Date & Time
                  </Typography>
                  <Typography variant="body2">{formatDate(event.endDateTime)}</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1, color: '#3182ce' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#4a5568', fontWeight: 600 }}>
                    Location
                  </Typography>
                  <Typography variant="body2">{event.locationName ?? 'N/A'}</Typography>
                  {event.mapLink && (
                    <Button
                      href={event.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{ mt: 0.5, textTransform: 'none', p: 0 }}
                    >
                      View on Map
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Participants & Price */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Participant Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <GroupIcon />
                  <Typography variant="body2">
                    {event.minParticipants ?? 0} - {event.maxParticipants ?? 0} participants
                  </Typography>
                </Box>
                {event.ageLimit && <Typography variant="body2">Age Limit: {event.ageLimit}+</Typography>}
                {event.priorExperienceRequired && <Typography variant="body2">Prior Experience Required</Typography>}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Price Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PriceCheckIcon />
                  <Typography variant="body2">
                    {event.isFreeEvent ? 'Free Event' : `NPR ${event.ticketPrice ?? 0}`}
                    {event.payOnSite && ' (Pay on Site Available)'}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {event.equipmentList && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Required Equipment
                </Typography>
                <Typography variant="body2">{event.equipmentList}</Typography>
              </Grid>
            )}
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Organizer Info */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Organizer Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">
                <strong>{event.organizerName}</strong>
              </Typography>
              {event.contactEmail && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon /> {event.contactEmail}
                </Box>
              )}
              {event.phoneNumber && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon /> {event.phoneNumber}
                </Box>
              )}
              {event.socialMediaLink && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FacebookIcon />
                  <Button
                    href={event.socialMediaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textTransform: 'none', p: 0 }}
                  >
                    Visit Social Media Page
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
