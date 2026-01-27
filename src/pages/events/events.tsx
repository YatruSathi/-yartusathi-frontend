import React, { useState, useEffect } from "react";
import { Grid, TextField, Box, Button, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
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
}

export function Events() {
  const [search, setSearch] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch events from backend
  useEffect(() => {
    api.get<Event[]>("events/") // GET /api/events/
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to fetch events.");
        setLoading(false);
      });
  }, []);

  // Filter events by search
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleFavorite = (id: number) => {
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );

    // Optional: Send favorite to backend
    // api.post("/favorites/", { event_id: id }).catch(err => console.error(err));
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TextField
          label="Search Events"
          variant="outlined"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          sx={{ flex: 1, mr: 2 }}
        />
        <Box sx={{ height: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/events/create')}
            sx={{ height: '56px', borderRadius: 1, boxShadow: 'none', textTransform: 'none', fontWeight: 500 }}
          >
            Create Event
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event: Event) => (
            <EventCard
              key={event.id}
              id={event.id}
              image={event.image || "/default-event.jpg"}
              title={event.title}
              description={event.description}
              onViewDetails={(id) => navigate(`/events/${id}`)}
              actions={[
                <Button
                  key="view"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  View Event
                </Button>,
                <IconButton
                  key="favorite"
                  sx={{
                    background: '#fff',
                    color: favoriteIds.includes(event.id) ? '#d32f2f' : '#022B3A',
                    boxShadow: 2,
                    ml: 2,
                    '&:hover': { background: '#e6e6e3' },
                  }}
                  onClick={() => handleFavorite(event.id)}
                >
                  <FavoriteIcon />
                </IconButton>
              ]}
            />
          ))
        ) : (
          <Grid item xs={12}>
            No events found.
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
