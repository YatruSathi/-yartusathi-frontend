import React, { useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Divider,
  Dialog,
  DialogContent,
} from '@mui/material';
import kathmanduImg from '../../assets/imgs/Kathmandu.jpg';
import { useParams } from 'react-router';
import { event as sampleEvent } from './sample-event';
import RegisterForm from './register-form';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

// Temporarily using sample event data
const event = {
  ...sampleEvent,
  image: kathmanduImg,
};

const EventDetails: React.FC = () => {
  const params = useParams();
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  console.log(params);

  // Format date for display
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '80vh',
        background: '#ffffff',
      }}
    >
      <Card
        sx={{
          width: '100%',
          boxShadow: 'none',
          borderRadius: 0,
          overflow: 'hidden',
          background: '#ffffff',
          color: '#2c3e50',
        }}
      >
        <CardMedia
          component="img"
          height="400"
          image={event.image}
          alt={event.title}
          sx={{
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                fontWeight={700}
                gutterBottom
                sx={{ color: '#1a365d', letterSpacing: 0.5 }}
              >
                {event.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {event.tags.split(',').map(tag => (
                  <Chip
                    key={tag.trim()}
                    label={tag.trim()}
                    size="small"
                    sx={{
                      backgroundColor: '#f0f7ff',
                      color: '#2c5282',
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{ color: '#4a5568', mb: 3, fontSize: 18, lineHeight: 1.6 }}
              >
                {event.description}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ backgroundColor: '#e2e8f0', my: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1, color: '#3182ce' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#4a5568', fontWeight: 600 }}>
                    Start Date & Time
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#2d3748' }}>
                    {formatDate(event.startDateTime)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1, color: '#3182ce' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#4a5568', fontWeight: 600 }}>
                    End Date & Time
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#2d3748' }}>
                    {formatDate(event.endDateTime)}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1, color: 'rgba(255,255,252,0.7)' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,252,0.7)' }}>
                    Location
                  </Typography>
                  <Typography variant="body2">{event.locationName}</Typography>
                  {event.mapLink && (
                    <Button
                      href={event.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{ color: '#fffffc', textTransform: 'none', p: 0, mt: 0.5 }}
                    >
                      View on Map
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ backgroundColor: 'rgba(255,255,252,0.1)', my: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,252,0.7)', mb: 1 }}>
                  Participant Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <GroupIcon sx={{ color: 'rgba(255,255,252,0.7)' }} />
                  <Typography variant="body2">
                    {event.minParticipants} - {event.maxParticipants} participants
                  </Typography>
                </Box>
                {event.ageLimit && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Age Limit: {event.ageLimit}+
                  </Typography>
                )}
                {event.priorExperienceRequired && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Prior Experience Required
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,252,0.7)', mb: 1 }}>
                  Price Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PriceCheckIcon sx={{ color: 'rgba(255,255,252,0.7)' }} />
                  <Typography variant="body2">
                    {event.isFreeEvent ? 'Free Event' : `NPR ${event.ticketPrice}`}
                    {event.payOnSite && ' (Pay on Site Available)'}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {event.equipmentList && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,252,0.7)', mb: 1 }}>
                  Required Equipment
                </Typography>
                <Typography variant="body2">{event.equipmentList}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider sx={{ backgroundColor: 'rgba(255,255,252,0.1)', my: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: '#fffffc' }}>
                Organizer Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>{event.organizerName}</strong>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: 20 }} />
                  <Typography variant="body2">{event.contactEmail}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ fontSize: 20 }} />
                  <Typography variant="body2">{event.phoneNumber}</Typography>
                </Box>
                {event.socialMediaLink && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FacebookIcon sx={{ fontSize: 20 }} />
                    <Button
                      href={event.socialMediaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: '#fffffc', textTransform: 'none', p: 0 }}
                    >
                      Visit Social Media Page
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => setOpenRegisterDialog(true)}
                sx={{
                  mt: 3,
                  background: 'linear-gradient(45deg, #2c5282 0%, #3182ce 100%)',
                  color: '#ffffff',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(49, 130, 206, 0.2)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #2a4365 0%, #2b6cb0 100%)',
                    boxShadow: '0 6px 16px rgba(49, 130, 206, 0.3)',
                  },
                }}
              >
                Register Now
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Register Dialog */}
      <Dialog
        open={openRegisterDialog}
        onClose={() => setOpenRegisterDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <RegisterForm />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EventDetails;
