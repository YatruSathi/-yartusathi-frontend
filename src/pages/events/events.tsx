import React, { useState } from "react";
import { Grid, TextField, Box, Button, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { EventCard } from "../home/components/event-card";
import everestImg from "../../assets/imgs/Everest.jpg";
import pokharaImg from "../../assets/imgs/Pokhara.jpg";
import kathmanduImg from "../../assets/imgs/Kathmandu.jpg";
import lumbiniImg from "../../assets/imgs/Lumbini .jpg";
import manangImg from "../../assets/imgs/Manang.jpg";
import bikeImg from "../../assets/imgs/image-01.jpg";
import { useNavigate } from "react-router";

export function Events() {
  const [search, setSearch] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const navigate = useNavigate();
  // Mock event data
  const mockEvents = [
    {
      id: 1,
      image: everestImg,
      title: "Everest Base Camp Trek",
      description: "Experience the breathtaking views of Mount Everest and the Himalayas.",
    },
    {
      id: 2,
      image: pokharaImg,
      title: "Pokhara Adventure",
      description: "Enjoy the serene lakes and adventure sports in Pokhara.",
    },
    {
      id: 3,
      image: kathmanduImg,
      title: "Kathmandu Heritage Walk",
      description: "Explore the rich cultural heritage of Kathmandu valley.",
    },
    {
      id: 4,
      image: lumbiniImg,
      title: "Lumbini Pilgrimage",
      description: "Visit the birthplace of Lord Buddha in Lumbini.",
    },
    {
      id: 5,
      image: manangImg,
      title: "Manang Valley Exploration",
      description: "Discover the hidden gems of Manang valley.",
    },
    {
      id: 6,
      image: bikeImg,
      title: "Mountain Biking",
      description: "Thrilling mountain biking experience in the hills.",
    },
  ];
  // Filter events by search
  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleFavorite = (id: number) => {
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

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
          filteredEvents.map(event => (
            <EventCard
              key={event.id}
              id={event.id}
              image={event.image}
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
                    '&:hover': {
                      background: '#e6e6e3',
                    },
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
