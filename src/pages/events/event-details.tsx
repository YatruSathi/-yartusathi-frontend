import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import kathmanduImg from "../../assets/imgs/Kathmandu.jpg";
import { useParams } from "react-router";

const event = {
  id: 3,
  image: kathmanduImg,
  title: "Kathmandu Heritage Walk",
  description: "Explore the rich cultural heritage of Kathmandu valley.",
};

const EventDetails: React.FC = () => {
  const params = useParams()
  console.log(params)

  //TODO: In future base on the params.eventId we will load the event data from the backend and 
  // display the details here. But now it always displaying the same statice object information.


  return (< Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      background: "linear-gradient(135deg, #022B3A 80%, #fffffc 100%)",
      p: 3,
    }}
  >
    <Card
      sx={{
        maxWidth: 500,
        width: "100%",
        boxShadow: 8,
        borderRadius: 4,
        overflow: "hidden",
        background: "rgba(2,43,58,0.98)",
        color: "#fffffc",
        transition: "box-shadow 0.2s",
        m: 2,
      }}
    >
      <CardMedia
        component="img"
        height="260"
        image={event.image}
        alt={event.title}
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow: 2,
        }}
      />
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#fffffc', letterSpacing: 1 }}>
          {event.title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,252,0.85)', mb: 3, fontSize: 18 }}>
          {event.description}
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
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
          Register Now
        </Button>
      </CardContent>
    </Card>
  </Box >
  );
}

export default EventDetails;
