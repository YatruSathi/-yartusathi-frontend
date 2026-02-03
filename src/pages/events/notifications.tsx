import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Container,
  Paper,
  Stack,
  CircularProgress,
  Fade,
} from '@mui/material';
import {
  CheckCircle,
  EventAvailable,
  MoreVert,
  NotificationsActive,
  AccessTime,
  DeleteOutline,
  DoneAll,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import api from '../../services/api';

/* ================= TYPES ================= */
interface NotificationData {
  id: number;
  message: string;
  created_at: string;
  is_read: boolean;
  type?: 'approval' | 'new_event' | 'reminder';
}

/* ================= COMPONENT ================= */
export const Notification: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get<NotificationData[]>('notifications/');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleMarkAsRead = async () => {
    if (!selectedId) return;
    try {
      await api.patch(`notifications/${selectedId}/`, { is_read: true });
      setNotifications(prev =>
        prev.map(n => (n.id === selectedId ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await api.delete(`notifications/${selectedId}/`);
      setNotifications(prev => prev.filter(n => n.id !== selectedId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
    handleMenuClose();
  };

  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case 'approval': return <CheckCircle color="success" />;
      case 'new_event': return <EventAvailable color="primary" />;
      case 'reminder': return <AccessTime color="warning" />;
      default: return <NotificationsActive color="primary" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
        <Box>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Notifications
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Stay updated with your latest travel activities.
          </Typography>
        </Box>
        {unreadCount > 0 && (
          <Chip
            label={`${unreadCount} New`}
            color="primary"
            sx={{ fontWeight: 700, borderRadius: 2, px: 1 }}
          />
        )}
      </Box>

      {notifications.length === 0 ? (
        <Paper sx={{ p: 10, textAlign: 'center', borderRadius: 4, bgcolor: 'rgba(15, 23, 42, 0.02)', border: '1px dashed', borderColor: 'divider' }}>
          <NotificationsActive sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Your inbox is empty
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We'll notify you when something exciting happens!
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <List sx={{ p: 0 }}>
            {notifications.map((notification, index) => (
              <Fade in key={notification.id} timeout={300 + index * 100}>
                <Box>
                  {index > 0 && <Divider />}
                  <ListItem
                    sx={{
                      py: 3,
                      px: { xs: 2, md: 4 },
                      bgcolor: notification.is_read ? 'transparent' : 'rgba(59, 130, 246, 0.04)',
                      '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.02)' },
                      transition: 'background-color 0.2s',
                    }}
                    secondaryAction={
                      <IconButton edge="end" onClick={e => handleMenuClick(e, notification.id)}>
                        <MoreVert />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'white', boxShadow: 1 }}>
                        {getNotificationIcon(notification.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Typography variant="subtitle1" fontWeight={notification.is_read ? 600 : 700}>
                            {notification.type === 'approval' ? 'Registration Approved' : 'New Update'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(notification.created_at).toLocaleDateString()}
                          </Typography>
                        </Stack>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {notification.message}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Box>
              </Fade>
            ))}
          </List>
        </Paper>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: 2, minWidth: 180, boxShadow: 10 }
        }}
      >
        <MenuItem onClick={handleMarkAsRead}>
          <DoneAll fontSize="small" sx={{ mr: 1.5 }} />
          Mark as read
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteOutline fontSize="small" sx={{ mr: 1.5 }} />
          Delete
        </MenuItem>
      </Menu>
    </Container>
  );
};
