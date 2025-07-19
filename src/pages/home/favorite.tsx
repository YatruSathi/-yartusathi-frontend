import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


const initialFavoriteEvents = [
    {
        id: 1,
        title: 'Everest Base Camp Trek',
        description: 'Experience the breathtaking views of Mount Everest and the Himalayas.',
        platforms: [
            { name: 'Website', url: 'https://everesttrek.com' },
            { name: 'Facebook', url: 'https://facebook.com/everesttrek' },
            { name: 'WhatsApp', url: 'https://wa.me/1234567890' },
        ],
    },
    {
        id: 2,
        title: 'Pokhara Adventure',
        description: 'Enjoy the serene lakes and adventure sports in Pokhara.',
        platforms: [
            { name: 'Website', url: 'https://pokharaadventure.com' },
            { name: 'Facebook', url: 'https://facebook.com/pokharaadventure' },
        ],
    },
];


import IconButton from '@mui/material/IconButton';

function Favorite() {
    const [favoriteEvents, setFavoriteEvents] = React.useState(initialFavoriteEvents);

    const handleRemoveFavorite = (id: number) => {
        setFavoriteEvents(events => events.filter(event => event.id !== id));
    };

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <FavoriteIcon color="error" />
                <Typography variant="h5" fontWeight={600}>Favorite Events</Typography>
            </Stack>
            {favoriteEvents.length === 0 ? (
                <Typography>No favorite events saved yet.</Typography>
            ) : (
                favoriteEvents.map(event => (
                    <Card key={event.id} sx={{ mb: 3 }}>
                        <CardContent>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography variant="h6" fontWeight={500}>{event.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{event.description}</Typography>
                                </Box>
                                <IconButton color="error" onClick={() => handleRemoveFavorite(event.id)}>
                                    <FavoriteIcon />
                                </IconButton>
                            </Stack>
                        </CardContent>
                        <CardActions>
                            {event.platforms.map(platform => (
                                <Button
                                    key={platform.name}
                                    size="small"
                                    color="primary"
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Join via {platform.name}
                                </Button>
                            ))}
                        </CardActions>
                    </Card>
                ))
            )}
        </Box>
    );
}

export default Favorite;
