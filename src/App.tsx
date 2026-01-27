import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, IconButton, CircularProgress, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router";
import api from "./services/api";

// Event type based on your backend
interface Event {
  id: number;
  title: string;
  description: string;
  location?: string;
  image?: string;
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const navigate = useNavigate();

  // Fetch events from backend
  useEffect(() => {
    setLoading(true);
    api.get<Event[]>("events/") // relative to baseURL
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setError("Failed to fetch events.");
        setLoading(false);
      });
  }, []);

  // Filter events by search
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle favorite
  const handleFavorite = (id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
    // Optional: send favorite to backend
    // api.post("favorites/", { event_id: id }).catch(console.error);
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      {/* Search + Create Event Button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <TextField
          label="Search Events"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/events/create")}
          sx={{
            height: "56px",
            borderRadius: 1,
            boxShadow: "none",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Create Event
        </Button>
      </Box>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Event Image */}
                <Box
                  component="img"
                  src={event.image || "/default-event.jpg"}
                  alt={event.title}
                  sx={{ width: "100%", height: 200, objectFit: "cover" }}
                />

                {/* Event Content */}
                <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flex: 1, mb: 2 }}
                  >
                    {event.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Location: {event.location || "N/A"}
                  </Typography>

                  {/* Actions */}
                  <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      View Event
                    </Button>
                    <IconButton
                      sx={{
                        ml: 1,
                        background: "#fff",
                        color: favoriteIds.includes(event.id) ? "#d32f2f" : "#022B3A",
                        boxShadow: 2,
                        "&:hover": { background: "#e6e6e3" },
                      }}
                      onClick={() => handleFavorite(event.id)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No events found.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default App;
