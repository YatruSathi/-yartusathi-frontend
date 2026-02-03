import React, { useEffect, useState } from 'react';
import { 
    Box, 
    Typography, 
    Grid, 
    Container, 
    CircularProgress, 
    Stack,
    Button,
    Fade
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router';
import { EventCard } from './components/event-card';
import api from '../../services/api';

interface Event {
    id: number;
    title: string;
    description: string;
    image?: string;
}

interface FavoriteItem {
    id: number;
    event: Event;
}

function Favorite() {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const response = await api.get<FavoriteItem[]>('favorites/');
            setFavorites(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (eventId: number) => {
        try {
            await api.delete(`favorites/${eventId}/`);
            setFavorites(prev => prev.filter(item => item.event.id !== eventId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box mb={6}>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                    <FavoriteIcon color="error" sx={{ fontSize: 40 }} />
                    <Typography variant="h3" fontWeight={800}>Your Favorites</Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary">
                    All the adventures and cultural experiences you've saved.
                </Typography>
            </Box>

            {favorites.length === 0 ? (
                <Box textAlign="center" py={10} bgcolor="rgba(15, 23, 42, 0.03)" borderRadius={4}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        You haven't saved any favorites yet.
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => navigate('/events')}
                        sx={{ mt: 2, borderRadius: 2 }}
                    >
                        Explore Events
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {favorites.map(item => (
                        <Fade in key={item.id}>
                            <Grid item xs={12} sm={6} md={4}>
                                <EventCard
                                    id={item.event.id}
                                    title={item.event.title}
                                    description={item.event.description}
                                    image={item.event.image || "/default-event.jpg"}
                                    onViewDetails={(id) => navigate(`/events/${id}`)}
                                />
                                <Button 
                                    fullWidth 
                                    color="error" 
                                    variant="outlined" 
                                    onClick={() => handleRemoveFavorite(item.event.id)}
                                    sx={{ mt: 1, borderRadius: 2 }}
                                >
                                    Remove from Favorites
                                </Button>
                            </Grid>
                        </Fade>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default Favorite;
