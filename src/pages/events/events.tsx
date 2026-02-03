import React, { useState, useEffect } from "react";
import { 
  Grid, 
  TextField, 
  Box, 
  Button, 
  IconButton, 
  Typography, 
  Container, 
  Stack, 
  Chip, 
  InputAdornment,
  Skeleton,
  Fade,
  alpha,
  useTheme
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { EventCard } from "../home/components/event-card";
import { useNavigate } from "react-router";
import api from "../../services/api";

// Define the Event type
interface Event {
  id: number;
  title: string;
  description: string;
  image?: string;
  location?: string;
  category?: string;
}

export function Events() {
  const [search, setSearch] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const navigate = useNavigate();
  const theme = useTheme();

  const categories = ["All", "Trekking", "Cultural", "Adventure", "Wildlife", "Music"];

  // Fetch events from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch events
        const eventsRes = await api.get<Event[]>("events/");
        setEvents(eventsRes.data);

        // Fetch user's favorites
        if (localStorage.getItem('token')) {
          try {
            const favoritesRes = await api.get<{ event_id: number }[]>("favorites/");
            setFavoriteIds(favoritesRes.data.map(fav => fav.event_id));
          } catch (err) {
            console.error("Failed to fetch favorites", err);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch events. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFavorite = async (id: number) => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    const isFavorited = favoriteIds.includes(id);
    
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );

    try {
      if (isFavorited) {
        await api.delete(`favorites/${id}/`);
      } else {
        await api.post("favorites/", { event_id: id });
      }
    } catch (err) {
      console.error("Failed to update favorites", err);
      // Revert on error
      setFavoriteIds(prev =>
        prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
      );
    }
  };

  const filteredEvents = events.filter(event => {
    const title = event.title || "";
    const desc = event.description || "";
    const category = event.category || "Other";

    const matchesSearch = title.toLowerCase().includes(search.toLowerCase()) ||
                         desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={6}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          All Events
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse through all upcoming adventures and cultural experiences.
        </Typography>
      </Box>

      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={2} 
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
        mb={4}
      >
        <Box sx={{ flex: 1, maxWidth: { md: 500 } }}>
          <TextField
            fullWidth
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
          />
        </Box>

        <Stack direction="row" spacing={1} overflow="auto" pb={{ xs: 1, md: 0 }}>
          {categories.map(cat => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? "primary" : "default"}
              variant={selectedCategory === cat ? "filled" : "outlined"}
              sx={{ fontWeight: 600, px: 1 }}
            />
          ))}
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/events/create')}
          sx={{ height: 48, px: 3, borderRadius: 2, whiteSpace: 'nowrap' }}
        >
          Create Event
        </Button>
      </Stack>

      {error ? (
        <Box textAlign="center" py={10}>
          <Typography color="error" variant="h6">{error}</Typography>
          <Button onClick={() => window.location.reload()} sx={{ mt: 2 }}>Retry</Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 3, mb: 1 }} />
                <Skeleton width="60%" height={30} />
                <Skeleton width="40%" />
              </Grid>
            ))
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Fade in timeout={500}>
                  <Box sx={{ height: '100%' }}>
                    <EventCard
                      id={event.id}
                      image={event.image || "/default-event.jpg"}
                      title={event.title}
                      description={event.description}
                      onViewDetails={(id) => navigate(`/events/${id}`)}
                      actions={[
                        <Button
                          key="view"
                          variant="outlined"
                          size="small"
                          onClick={() => navigate(`/events/${event.id}`)}
                          sx={{ borderRadius: 1.5, fontWeight: 700 }}
                        >
                          Details
                        </Button>,
                        <IconButton
                          key="favorite"
                          sx={{
                            color: favoriteIds.includes(event.id) ? 'error.main' : 'text.disabled',
                            bgcolor: favoriteIds.includes(event.id) ? alpha(theme.palette.error.main, 0.1) : 'transparent',
                            '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) }
                          }}
                          onClick={() => handleFavorite(event.id)}
                        >
                          <FavoriteIcon />
                        </IconButton>
                      ]}
                    />
                  </Box>
                </Fade>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box textAlign="center" py={10}>
                <Typography variant="h6" color="text.secondary">No events found matching your criteria.</Typography>
                <Button onClick={() => { setSearch(""); setSelectedCategory("All"); }} sx={{ mt: 2 }}>Clear Filters</Button>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}
