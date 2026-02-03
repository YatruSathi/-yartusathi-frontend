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
  Container,
  Skeleton,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
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
const categories: string[] = ['Trekking', 'Cultural', 'Adventure', 'Wildlife', 'Music'];

/* ================= COMPONENT ================= */
export const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [liveEvent, setLiveEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ================= FETCH EVENTS ================= */
  useEffect(() => {
    setLoading(true);
    api
      .get<Event[]>('events/')
      .then(response => {
        setEvents(response.data);
        if (response.data.length > 0) {
          setLiveEvent(response.data[0]); // first event as live
        }
      })
      .catch(error => console.error('Error fetching events:', error))
      .finally(() => setLoading(false));
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
    const title = event.title || "";
    const category = event.category || "Other";

    const matchesSearch = searchTerm
      ? title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? event.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ pb: 8 }}>
      {/* ================= HERO SECTION ================= */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: { xs: 6, md: 10 }, 
          mb: 6, 
          borderRadius: { xs: 0, sm: 4 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" position="relative" zIndex={1}>
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800 }}>
                Explore Nepal's Hidden Gems
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
                Join unique experiences, from mountain treks to cultural festivals. Your journey starts here.
              </Typography>
              <Box sx={{ position: 'relative', maxWidth: 600 }}>
                <TextField
                  placeholder="Search your next adventure..."
                  fullWidth
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setSelectedCategory(null);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'transparent' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.7)' },
                  }}
                />
                {suggestions.length > 0 && (
                  <Paper
                    elevation={3}
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      zIndex: 10,
                      mt: 1,
                      borderRadius: 2,
                      maxHeight: 300,
                      overflow: 'auto',
                    }}
                  >
                    <List>
                      {suggestions.map(event => (
                        <ListItemButton key={event.id} onClick={() => navigate(`/events/${event.id}`)}>
                          <ListItemText primary={event.title} secondary={event.category ?? 'General'} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Paper>
                )}
              </Box>
              <Box display="flex" gap={1} flexWrap="wrap" mt={3}>
                {categories.map(category => (
                  <Chip
                    key={category}
                    label={category}
                    clickable
                    sx={{ 
                      bgcolor: selectedCategory === category ? 'white' : 'rgba(255,255,255,0.1)',
                      color: selectedCategory === category ? 'primary.main' : 'white',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                    }}
                    onClick={() => handleCategoryClick(category)}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src="/src/assets/imgs/Everest.jpg"
                  sx={{ 
                    width: '100%', 
                    borderRadius: 4, 
                    boxShadow: 20,
                    transform: 'rotate(2deg)',
                  }}
                />
                <Paper
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    left: -20,
                    p: 2,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    boxShadow: 10,
                  }}
                >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}><TravelExploreIcon /></Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>Nepal Adventure</Typography>
                    <Typography variant="caption" color="text.secondary">Top Rated 2026</Typography>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* ================= FEATURED EXPERIENCE ================= */}
        {liveEvent && (
          <Box mb={8}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Featured Experience
            </Typography>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, borderRadius: 4, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                sx={{ width: { xs: '100%', md: '50%' }, height: { xs: 300, md: 'auto' } }}
                image={liveEvent.image ?? '/placeholder.jpg'}
              />
              <CardContent sx={{ flex: 1, p: { xs: 3, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Chip label="TOP PICK" color="secondary" size="small" sx={{ mb: 2, width: 'fit-content', fontWeight: 700 }} />
                <Typography variant="h3" fontWeight={800} gutterBottom>
                  {liveEvent.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
                  {liveEvent.description}
                </Typography>
                <Box>
                  <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => navigate(`/events/${liveEvent.id}`)}
                    sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                  >
                    Explore Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* ================= RECENT EVENTS ================= */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" fontWeight={700}>
              Discover Adventures
            </Typography>
            <Button color="secondary" onClick={() => navigate('/events')}>View All</Button>
          </Box>

          <Grid container spacing={3}>
            {loading ? (
              [1, 2, 3].map(i => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3, mb: 1 }} />
                  <Skeleton width="60%" height={30} />
                  <Skeleton width="40%" />
                </Grid>
              ))
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <EventCard
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    image={event.image ?? '/placeholder.jpg'}
                    onViewDetails={() => navigate(`/events/${event.id}`)}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 8, textAlign: 'center', bgcolor: 'rgba(15, 23, 42, 0.02)', borderRadius: 4 }}>
                  <Typography variant="h6" color="text.secondary">No adventures found in this category.</Typography>
                  <Button variant="outlined" sx={{ mt: 2 }} onClick={() => { setSelectedCategory(null); setSearchTerm(''); }}>View All Adventures</Button>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
