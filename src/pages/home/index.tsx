import React from "react";
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Chip,
    Card,
    CardContent,
    CardMedia,
    Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image01 from '../../assets/imgs/image-01.jpg'
import Image02 from '../../assets/imgs/image-02.jpg'
import Image03 from '../../assets/imgs/image-03.jpg'
import Image04 from '../../assets/imgs/image-04.jpg'


// Sample data
const featuredEvent = {
    title: "Summer Trek to Manang",
    description: "Join an unforgettable adventure through the Himalayas.",
    image: Image01
};

const recentEvents = [
    {
        id: 1,
        title: "Pokhara Cultural Tour",
        image: Image01
    },
    {
        id: 2,
        title: "Chitwan Safari Expedition",
        image: Image02
    },
    {
        id: 3,
        title: "Lumbini Heritage Walk",
        image: Image03
    },
    {
        id: 4,
        title: "Everest Base Camp Trek",
        image: Image04
    },
];

const categories = ["Trekking", "Cultural", "Adventure", "Wildlife"];

export const Home: React.FC = () => {
    return (
        <Box p={3} maxWidth="lg" mx="auto">
            {/* Featured Event */}
            <Card sx={{ display: "flex", mb: 4, borderRadius: 3, overflow: "hidden" }}>
                <CardMedia
                    component="img"
                    sx={{ width: { xs: "100%", md: 400 }, height: 250, objectFit: "cover" }}
                    image={featuredEvent.image}
                    alt={featuredEvent.title}
                />
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {featuredEvent.title}
                    </Typography>
                    <Typography variant="body1">{featuredEvent.description}</Typography>
                </CardContent>
            </Card>

            {/* Search Bar */}
            <TextField
                placeholder="Search events..."
                fullWidth
                variant="outlined"
                sx={{ mb: 3 }}
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
            <Stack direction="row" spacing={1} mb={4} flexWrap="wrap">
                {categories.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        color="primary"
                        variant="outlined"
                        clickable
                    />
                ))}
            </Stack>

            {/* Recent Events */}
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Events
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 2,
                    pb: 2,
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {recentEvents.map((event) => (
                    <Card
                        key={event.id}
                        sx={{
                            minWidth: 250,
                            flexShrink: 0,
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={event.image}
                            alt={event.title}
                        />
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="medium">
                                {event.title}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};
