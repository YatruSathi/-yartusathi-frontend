import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

interface RecentEventCardProps {
  id: string | number;
  image: string;
  title: string;
  description: string;
  onViewDetails?: (id: string | number) => void;
  actions?: React.ReactNode;
}


/**
 * 
 * This component render the event card. This component is reusable.
 */
export const EventCard: React.FC<RecentEventCardProps> = (
  {
    id,
    image,
    title,
    description,
    onViewDetails = () => { },
    actions
  }) => (
  <Grid item xs={12} sm={6} md={4} key={id}>
    <Card
      sx={{
        minHeight: 320,
        maxHeight: 340,
        display: "flex",
        flexDirection: "column",
        boxShadow: 6,
        borderRadius: 4,
        background: "linear-gradient(135deg, #022B3A 80%, #fffffc 100%)",
        transition: "transform 0.2s, box-shadow 0.2s",
        '&:hover': {
          transform: 'translateY(-6px) scale(1.03)',
          boxShadow: 12,
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow: 2,
        }}
      />
      <CardContent sx={{ flexGrow: 1, color: '#fffffc', p: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#fffffc', letterSpacing: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,252,0.85)', mb: 2, fontSize: 15 }}>
          {description}
        </Typography>
        {actions ? (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Left side: View button (if present in actions) */}
            {Array.isArray(actions) ? actions[0] : actions}
            {/* Right side: Favorite button (if present in actions) */}
            {Array.isArray(actions) && actions[1] ? (
              <Box sx={{ ml: 'auto' }}>{actions[1]}</Box>
            ) : null}
          </Box>
        ) : (
          <Button
            variant="contained"
            size="medium"
            fullWidth
            onClick={() => onViewDetails(id)}
            sx={{
              mt: 2,
              background: '#fffffc',
              color: '#022B3A',
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 2,
              textTransform: 'none',
              '&:hover': {
                background: '#e6e6e3',
                color: '#022B3A',
              },
            }}
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  </Grid>
);