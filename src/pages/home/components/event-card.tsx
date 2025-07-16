import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

interface RecentEventCardProps {
  id: string | number;
  image: string;
  title: string;
  description: string;
  onViewDetails?: () => void;
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
    onViewDetails
  }) => (
  <Grid item xs={12} sm={6} md={4} key={id}>
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="medium">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>
        <Button variant="contained" size="small" fullWidth onClick={onViewDetails}>
          View Details
        </Button>
      </CardContent>
    </Card>
  </Grid>
);