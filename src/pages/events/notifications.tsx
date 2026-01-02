import React, { useState } from 'react';
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
} from '@mui/material';
import {
  CheckCircle,
  EventAvailable,
  MoreVert,
  NotificationsActive,
  AccessTime,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';

// Mock notification data
interface Notification {
  id: string;
  type: 'approval' | 'new_event' | 'reminder';
  title: string;
  description: string;
  eventId?: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: 'Event Registration Approved',
    description: 'Your registration for Mountain Hike 2025 has been approved.',
    eventId: '123',
    timestamp: '2025-07-24T10:30:00',
    read: false,
  },
  {
    id: '2',
    type: 'new_event',
    title: 'New Event in Your Interest',
    description: 'New adventure event: Everest Base Camp Trek 2025 has been added.',
    eventId: '124',
    timestamp: '2025-07-23T15:45:00',
    read: false,
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Upcoming Event Reminder',
    description: 'Your event Mountain Hike 2025 starts in 3 days.',
    eventId: '123',
    timestamp: '2025-07-23T09:00:00',
    read: true,
  },
  {
    id: '4',
    type: 'new_event',
    title: 'New Event Added',
    description: 'New cultural event: Kathmandu Heritage Walk has been added.',
    eventId: '125',
    timestamp: '2025-07-22T14:20:00',
    read: true,
  },
];

export const Notification: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, notificationId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notificationId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const handleMarkAsRead = () => {
    if (selectedNotification) {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === selectedNotification ? { ...notification, read: true } : notification
        )
      );
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedNotification) {
      setNotifications(prevNotifications =>
        prevNotifications.filter(notification => notification.id !== selectedNotification)
      );
    }
    handleMenuClose();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle color="success" />;
      case 'new_event':
        return <EventAvailable color="primary" />;
      case 'reminder':
        return <AccessTime color="warning" />;
      default:
        return <NotificationsActive />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1a365d' }}>
          Notifications
        </Typography>
        {unreadCount > 0 && (
          <Chip
            label={`${unreadCount} unread`}
            color="primary"
            size="small"
            sx={{ fontWeight: 500 }}
          />
        )}
      </Box>

      <List sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            {index > 0 && <Divider component="li" />}
            <ListItem
              alignItems="flex-start"
              sx={{
                bgcolor: notification.read ? 'inherit' : 'action.hover',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'transparent' }}>
                  {getNotificationIcon(notification.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(notification.timestamp)}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {notification.description}
                    </Typography>
                    {notification.eventId && (
                      <Button
                        size="small"
                        onClick={() => navigate(`/events/${notification.eventId}`)}
                        sx={{ textTransform: 'none', mt: 1 }}
                      >
                        View Event
                      </Button>
                    )}
                  </Box>
                }
              />
              <IconButton
                edge="end"
                aria-label="more"
                onClick={e => handleMenuClick(e, notification.id)}
              >
                <MoreVert />
              </IconButton>
            </ListItem>
          </React.Fragment>
        ))}
      </List>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMarkAsRead}>
          Mark as{' '}
          {selectedNotification && notifications.find(n => n.id === selectedNotification)?.read
            ? 'unread'
            : 'read'}
        </MenuItem>
        <MenuItem onClick={handleDelete}>Delete notification</MenuItem>
      </Menu>
    </Box>
  );
};
