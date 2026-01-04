import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  CircularProgress,
  Container,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface FormData {
  reason: string;
  experience: string;
  notes: string;
  confirmSchedule: boolean;
  agreeRules: boolean;
}

export default function EventRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    reason: '',
    experience: '',
    notes: '',
    confirmSchedule: false,
    agreeRules: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    setError('');
  };

  const validateForm = () => {
    if (!formData.reason.trim()) {
      setError('Please tell us why you want to join this event.');
      return false;
    }
    if (!formData.experience) {
      setError('Please select your previous experience.');
      return false;
    }
    if (!formData.confirmSchedule) {
      setError('Please confirm schedule and budget.');
      return false;
    }
    if (!formData.agreeRules) {
      setError('You must agree to the group rules.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          reason: '',
          experience: '',
          notes: '',
          confirmSchedule: false,
          agreeRules: false,
        });
      }, 2000);
    } catch {
      setError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: 350,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 80, color: '#022B3A', mb: 2 }} />
          <Typography variant="h4" fontWeight="bold">
            Request Submitted!
          </Typography>
          <Typography sx={{ mt: 1, textAlign: 'center', color: '#666' }}>
            Your participation request has been sent to the event organizer for approval.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" color="#022B3A">
              Join Event
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Submit a request to participate in this travel event
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* Reason */}
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Why do you want to join this event?"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Share your interest or motivation"
                  required
                />

                {/* Experience */}
                <Box>
                  <FormLabel sx={{ mb: 1 }}>
                    Have you participated in similar trips before?
                  </FormLabel>
                  <RadioGroup
                    row
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>

                {/* Notes */}
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Special Notes (Optional)"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any message for the organizer?"
                />

                {/* Checkboxes */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.confirmSchedule}
                      name="confirmSchedule"
                      onChange={handleChange}
                    />
                  }
                  label="I am comfortable with the schedule and estimated budget"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreeRules}
                      name="agreeRules"
                      onChange={handleChange}
                    />
                  }
                  label="I agree to follow group rules and safety guidelines"
                />

                {/* Submit */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    backgroundColor: '#022B3A',
                    py: 1.5,
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#01192a' },
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                      Submitting...
                    </>
                  ) : (
                    'Send Participation Request'
                  )}
                </Button>

                <Typography variant="caption" textAlign="center" color="#999">
                  Your request will be reviewed by the event organizer
                </Typography>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
