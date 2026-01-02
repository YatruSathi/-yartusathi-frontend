import { Box, Typography, Card, CardContent, Stack } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const notifications = [
  {
    id: 1,
    title: 'Event Reminder',
    message: 'Don’t forget to join the Everest Base Camp Trek tomorrow at 8:00 AM.',
  },
  {
    id: 2,
    title: 'New Event Added',
    message: 'Pokhara Adventure has been added to your favorite events.',
  },
  {
    id: 3,
    title: 'Profile Update',
    message: 'Your profile was updated successfully.',
  },
];

function Notifications() {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <NotificationsIcon color="primary" />
        <Typography variant="h5" fontWeight={600}>
          Notifications
        </Typography>
      </Stack>
      {notifications.length === 0 ? (
        <Typography>No notifications yet.</Typography>
      ) : (
        notifications.map(note => (
          <Card key={note.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
                {note.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {note.message}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default Notifications;
