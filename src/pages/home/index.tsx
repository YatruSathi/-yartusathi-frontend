import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image01 from "../../assets/imgs/image-01.jpg";
import Image02 from "../../assets/imgs/image-02.jpg";
import Image03 from "../../assets/imgs/image-03.jpg";
import Image04 from "../../assets/imgs/image-04.jpg";
import { EventCard } from "./components/event-card";

const heroImage = Image01;

const recentEvents = [
  {
    id: 1,
    title: "Pokhara Cultural Tour",
    image: Image01,
    description: "Experience the vibrant culture of Pokhara.",
  },
  {
    id: 2,
    title: "Chitwan Safari Expedition",
    image: Image02,
    description: "Wildlife adventure in Chitwan National Park.",
  },
  {
    id: 3,
    title: "Lumbini Heritage Walk",
    image: Image03,
    description: "Discover the birthplace of Buddha.",
  },
  {
    id: 4,
    title: "Everest Base Camp Trek",
    image: Image04,
    description: "Challenge yourself to reach the base camp.",
  },
];

const categories = ["Trekking", "Cultural", "Adventure", "Wildlife"];

export const Home: React.FC = () => {
  return (
    <Box>
      <Box maxWidth="lg" mx="auto" px={2}>
        {/* Search Bar */}
        <TextField
          placeholder="Search events..."
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
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

        {/* Categories */}
        <Box mb={3}>
          <Typography variant="h6" fontWeight="medium" mb={1}>
            Categories
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                color="primary"
                variant="outlined"
                clickable
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 250, md: 400 },
          mb: 4,
        }}
      >
        <Box
          component="img"
          src={heroImage}
          alt="Hero"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "white",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Explore Nepal Together
          </Typography>
          <Typography variant="subtitle1">
            Find events, meet fellow travelers, and discover new adventures.
          </Typography>
        </Box>
      </Box>

      <Box maxWidth="lg" mx="auto" px={2}>
        {/* Recent Events */}
        <Typography variant="h6" fontWeight="medium" mb={2}>
          Recent Events
        </Typography>
        <Grid container spacing={2}>
          {recentEvents.map((event) => (
            <EventCard
              id={event.id}
              title={event.title}
              description={event.description}
              image={event.image}
              onViewDetails={() => console.log('on details is cliked')}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
