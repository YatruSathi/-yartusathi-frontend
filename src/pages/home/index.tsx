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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import Image01 from '../../assets/imgs/image-01.jpg';
import Image02 from '../../assets/imgs/image-02.jpg';
import Image03 from '../../assets/imgs/image-03.jpg';
import Image04 from '../../assets/imgs/image-04.jpg';

import { EventCard } from './components/event-card';

const recentEvents = [
  {
    id: 1,
    title: 'Pokhara Cultural Tour',
    image: Image01,
    description: 'Experience the vibrant culture of Pokhara.',
  },
  {
    id: 2,
    title: 'Chitwan Safari Expedition',
    image: Image02,
    description: 'Wildlife adventure in Chitwan National Park.',
  },
  {
    id: 3,
    title: 'Lumbini Heritage Walk',
    image: Image03,
    description: 'Discover the birthplace of Buddha.',
  },
  {
    id: 4,
    title: 'Everest Base Camp Trek',
    image: Image04,
    description: 'Challenge yourself to reach the base camp.',
  },
];

const categories = ['Trekking', 'Cultural', 'Adventure', 'Wildlife'];

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm, 'in category:', selectedCategory);
    // Implement search/filter logic here
  };

  return (
    <Box>
      {/* ================= SEARCH BAR ================= */}
      <Box maxWidth="lg" mx="auto" px={2} mt={3}>
        <TextField
          placeholder="Search events..."
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* ================= CATEGORY FILTER CHIPS ================= */}
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

      {/* ================= HERO / SHOWCASE SECTION ================= */}
      <Box maxWidth="lg" mx="auto" px={2} mt={5}>
        <Grid container spacing={4} alignItems="center">
          {/* LEFT: WEBSITE DESCRIPTION */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Explore Nepal Like Never Before <br />
              Discover Nepal Beyond the Famous
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={2}>
              Our platform connects travelers with authentic local experiences — hidden
              destinations, cultural events, and community-driven journeys that are often missed by
              mainstream tourism.
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={3}>
              Explore live events, contribute local gems, and travel responsibly while supporting
              local communities.
            </Typography>
          </Grid>

          {/* RIGHT: LIVE EVENT SHOWCASE */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
              <CardMedia component="img" height="260" image={Image04} alt="Live Event" />
              <CardContent>
                <Typography variant="subtitle2" color="primary" fontWeight="bold">
                  🔴 LIVE EVENT
                </Typography>

                <Typography variant="h6" fontWeight="medium" mt={1}>
                  Everest Base Camp Trek
                </Typography>

                <Typography variant="body2" color="text.secondary" mt={1}>
                  Join trekkers currently heading towards Everest Base Camp. Follow updates, routes,
                  and real-time experiences.
                </Typography>

                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => console.log('View live event')}
                >
                  View Live Event
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* ================= RECENT EVENTS ================= */}
      <Box maxWidth="lg" mx="auto" px={2} mt={6} mb={4}>
        <Typography variant="h6" fontWeight="medium" mb={2}>
          Recent Events
        </Typography>

        <Grid container spacing={2}>
          {recentEvents.map(event => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              image={event.image}
              onViewDetails={() => console.log('on details is clicked')}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
