import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';

import { EventCard } from './components/event-card';
import api from '../../services/api';

/* ================= TYPES ================= */
interface Event {
  id: number;
  title: string;
  description: string;
  category?: string;
  image?: string;
}

/* ================= CONSTANTS ================= */
const categories: string[] = ['Trekking', 'Cultural', 'Adventure', 'Wildlife'];

/* ================= COMPONENT ================= */
export const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [liveEvent, setLiveEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = useNavigate();

  /* ================= FETCH EVENTS ================= */
  useEffect(() => {
    api
      .get<Event[]>('events/')
      .then(response => {
        setEvents(response.data);
        if (response.data.length > 0) {
          setLiveEvent(response.data[0]); // first event as live
        }
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  /* ================= CATEGORY HANDLER ================= */
  const handleCategoryClick = (category: string): void => {
    setSelectedCategory(prev => (prev === category ? null : category));
    setSearchTerm(''); // reset search when category clicked
  };

  /* ================= SEARCH SUGGESTIONS ================= */
  const suggestions: Event[] =
    searchTerm.length > 0
      ? events.filter(
          event =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  /* ================= FILTERED EVENTS ================= */
  const filteredEvents: Event[] = events.filter(event => {
    const matchesSearch = searchTerm
      ? event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? event.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      {/* ================= SEARCH BAR ================= */}
      <Box maxWidth="lg" mx="auto" px={2} mt={3} position="relative">
        <TextField
          placeholder="Search events or categories..."
          fullWidth
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setSelectedCategory(null); // reset category filter when typing
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* ================= SEARCH SUGGESTIONS ================= */}
        {suggestions.length > 0 && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              width: '100%',
              zIndex: 10,
              mt: 1,
              borderRadius: 2,
            }}
          >
            <List>
              {suggestions.map(event => (
                <ListItemButton
                  key={event.id}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={event.category ?? 'General'}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}

        {/* ================= CATEGORY FILTER ================= */}
        <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
          {categories.map(category => (
            <Chip
              key={category}
              label={category}
              clickable
              color={selectedCategory === category ? 'primary' : 'default'}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </Box>
      </Box>

      {/* ================= LIVE EVENT ================= */}
      {liveEvent && (
        <Box maxWidth="lg" mx="auto" px={2} mt={5}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight="bold">
                Discover Nepal Beyond the Famous
              </Typography>
              <Typography color="text.secondary" mt={2}>
                Follow journeys happening right now across Nepal.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardMedia
                  component="img"
                  height="260"
                  image={liveEvent.image ?? '/placeholder.jpg'}
                />
                <CardContent>
                  <Typography color="primary" fontWeight="bold">
                    🔴 LIVE NOW
                  </Typography>
                  <Typography variant="h6">{liveEvent.title}</Typography>
                  <Typography color="text.secondary">{liveEvent.description}</Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/events/${liveEvent.id}`)}
                  >
                    View Live Event
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* ================= RECENT EVENTS ================= */}
      <Box maxWidth="lg" mx="auto" px={2} mt={6} mb={4}>
        <Typography variant="h6" mb={2}>
          Recent Events
        </Typography>

        <Grid container spacing={2}>
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              image={event.image ?? '/placeholder.jpg'}
              onViewDetails={() => navigate(`/events/${event.id}`)}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
