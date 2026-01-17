import React, { useState } from 'react';
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

import Image01 from '../../assets/imgs/image-01.jpg';
import Image02 from '../../assets/imgs/image-02.jpg';
import Image03 from '../../assets/imgs/image-03.jpg';
import Image04 from '../../assets/imgs/image-04.jpg';

import { EventCard } from './components/event-card';

/* ================= DATA ================= */

const liveEvent = {
  id: 100,
  title: 'Annapurna Base Camp Trek',
  image: Image04,
  description: 'Currently happening trek with live updates.',
  category: 'Trekking',
};

const recentEvents = [
  {
    id: 1,
    title: 'Pokhara Cultural Tour',
    image: Image01,
    description: 'Experience the vibrant culture of Pokhara.',
    category: 'Cultural',
  },
  {
    id: 2,
    title: 'Chitwan Safari Expedition',
    image: Image02,
    description: 'Wildlife adventure in Chitwan National Park.',
    category: 'Wildlife',
  },
  {
    id: 3,
    title: 'Lumbini Heritage Walk',
    image: Image03,
    description: 'Discover the birthplace of Buddha.',
    category: 'Cultural',
  },
  {
    id: 4,
    title: 'Everest Base Camp Trek',
    image: Image04,
    description: 'Challenge yourself to reach the base camp.',
    category: 'Trekking',
  },
];

const categories = ['Trekking', 'Cultural', 'Adventure', 'Wildlife'];

const allEvents = [liveEvent, ...recentEvents];

/* ================= COMPONENT ================= */

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => (prev === category ? null : category));
  };

  /* ================= SEARCH SUGGESTIONS ================= */

  const suggestions =
    searchTerm.length > 0
      ? allEvents.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
      : [];

  /* ================= FILTER RECENT EVENTS ================= */

  const filteredRecentEvents = recentEvents.filter(event => {
    const matchesSearch = searchTerm
      ? event.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      {/* ================= SEARCH BAR ================= */}
      <Box maxWidth="lg" mx="auto" px={2} mt={3} position="relative">
        <TextField
          placeholder="Search events..."
          fullWidth
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
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
                <ListItemButton key={event.id} onClick={() => setSearchTerm(event.title)}>
                  <ListItemText primary={event.title} secondary={event.category} />
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

      {/* ================= LIVE EVENT (ALWAYS VISIBLE) ================= */}
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
              <CardMedia component="img" height="260" image={liveEvent.image} />
              <CardContent>
                <Typography color="primary" fontWeight="bold">
                  🔴 LIVE NOW
                </Typography>
                <Typography variant="h6">{liveEvent.title}</Typography>
                <Typography color="text.secondary">{liveEvent.description}</Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                  View Live Event
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* ================= RECENT EVENTS ================= */}
      <Box maxWidth="lg" mx="auto" px={2} mt={6} mb={4}>
        <Typography variant="h6" mb={2}>
          Recent Events
        </Typography>

        <Grid container spacing={2}>
          {filteredRecentEvents.map(event => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              image={event.image}
              onViewDetails={() => console.log(event.title)}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
