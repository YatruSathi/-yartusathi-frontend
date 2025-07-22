import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Switch,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import { EventType } from './types';

interface EventFormInputs {
  // Basic Event Details
  title: string;
  eventType: EventType;
  description: string;
  tags: string[];

  // Date and Time
  startDateTime: string;
  endDateTime: string;
  registrationDeadline?: string;

  // Location Information
  locationName: string;
  fullAddress?: string;
  mapLink?: string;

  // Participant Info
  maxParticipants?: number;
  minParticipants?: number;
  ageLimit?: string;
  priorExperienceRequired: boolean;
  equipmentList?: string;

  // Fee & Payment
  isFreeEvent: boolean;
  ticketPrice?: number;
  payOnSite: boolean;

  // Organizer Info
  organizerName: string;
  contactEmail: string;
  phoneNumber: string;
  socialMediaLink?: string;
}

const AddEventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<EventFormInputs>({
    defaultValues: {
      isFreeEvent: true,
      priorExperienceRequired: false,
      payOnSite: false,
      tags: [],
    },
  });

  const isFreeEvent = watch('isFreeEvent');

  const onSubmit = (data: EventFormInputs) => {
    console.log(data);
    alert('Event Created!\n' + JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, m: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, fontWeight: 600, color: 'primary.main' }}
      >
        Create Event
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Basic Event Details */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Basic Event Details
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Event Title"
              fullWidth
              required
              {...register('title', { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Event Type</InputLabel>
              <Select
                {...register('eventType', { required: 'Event type is required' })}
                error={!!errors.eventType}
                label="Event Type"
              >
                {Object.values(EventType).map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors.eventType && (
                <FormHelperText error>{errors.eventType.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              required
              {...register('description', { required: 'Description is required' })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Tags (comma separated)"
              fullWidth
              {...register('tags')}
              helperText="Optional: Add search keywords"
            />
          </Grid>

          {/* Date and Time Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
              Date and Time
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Start Date & Time"
              type="datetime-local"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              {...register('startDateTime', { required: 'Start date and time is required' })}
              error={!!errors.startDateTime}
              helperText={errors.startDateTime?.message}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="End Date & Time"
              type="datetime-local"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              {...register('endDateTime', { required: 'End date and time is required' })}
              error={!!errors.endDateTime}
              helperText={errors.endDateTime?.message}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Registration Deadline"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('registrationDeadline')}
            />
          </Grid>

          {/* Location Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
              Location Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Location Name"
              fullWidth
              required
              {...register('locationName', { required: 'Location name is required' })}
              error={!!errors.locationName}
              helperText={errors.locationName?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Full Address" fullWidth {...register('fullAddress')} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Map Link" fullWidth {...register('mapLink')} />
          </Grid>

          {/* Participant Info */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
              Participant Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Maximum Participants"
              type="number"
              fullWidth
              {...register('maxParticipants', { min: 1 })}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Minimum Participants"
              type="number"
              fullWidth
              {...register('minParticipants', { min: 1 })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Age Limit"
              fullWidth
              {...register('ageLimit')}
              helperText="e.g., 18+ or 21-35"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={<Switch {...register('priorExperienceRequired')} />}
              label="Prior Experience Required"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Equipment List"
              fullWidth
              multiline
              rows={3}
              {...register('equipmentList')}
              helperText="List any required equipment"
            />
          </Grid>

          {/* Fee & Payment */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
              Fee & Payment
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControlLabel
              control={<Switch {...register('isFreeEvent')} />}
              label="This is a free event"
            />
          </Grid>

          {!isFreeEvent && (
            <>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Ticket Price"
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  {...register('ticketPrice', { required: !isFreeEvent })}
                  error={!!errors.ticketPrice}
                  helperText={errors.ticketPrice?.message}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={<Switch {...register('payOnSite')} />}
                  label="Pay on Site Available"
                />
              </Grid>
            </>
          )}

          {/* Organizer Info */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
              Organizer Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Organizer Name"
              fullWidth
              required
              {...register('organizerName', { required: 'Organizer name is required' })}
              error={!!errors.organizerName}
              helperText={errors.organizerName?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Contact Email"
              type="email"
              fullWidth
              required
              {...register('contactEmail', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.contactEmail}
              helperText={errors.contactEmail?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              fullWidth
              required
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid phone number',
                },
              })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Social Media Link" fullWidth {...register('socialMediaLink')} />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 4,
                height: 56,
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              Create Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEventForm;
