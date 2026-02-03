import React from "react";
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  alpha,
  useTheme,
  CardActionArea,
  Stack
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const getImagePath = (imagePath: string) => {
  if (!imagePath) return "/placeholder.jpg";
  
  // Handle absolute URLs
  if (imagePath.startsWith('http')) return imagePath;
  
  // Handle Django media paths
  if (imagePath.startsWith('/media/')) {
    return `http://127.0.0.1:8000${imagePath}`;
  }
  
  // Handle local asset paths
  // Vite requires /src prefix to resolve files from src/assets during development
  if (imagePath.startsWith('/assets/imgs')) {
    return `/src${imagePath}`;
  }
  
  // Handle paths that already have /src
  if (imagePath.startsWith('/src/assets')) {
    return imagePath;
  }
  
  return imagePath;
};

interface RecentEventCardProps {
  id: string | number;
  image: string;
  title: string;
  description: string;
  category?: string;
  location?: string;
  onViewDetails?: (id: string | number) => void;
  actions?: React.ReactNode;
}

export const EventCard: React.FC<RecentEventCardProps> = ({
  id,
  image,
  title,
  description,
  category = "Adventure",
  location = "Nepal",
  onViewDetails = () => { },
  actions
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: "flex",
        flexDirection: "column",
        borderRadius: '20px',
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.08),
        background: '#ffffff',
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: 'hidden',
        boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 30px 50px -12px rgba(0, 0, 0, 0.12)',
          '& .card-image': {
            transform: 'scale(1.1)',
          }
        },
      }}
    >
      <CardActionArea 
        onClick={() => onViewDetails(id)}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flexGrow: 1 }}
      >
        {/* Image Section with Fixed Aspect Ratio */}
        <Box sx={{ position: 'relative', width: '100%', pt: '65%', overflow: 'hidden' }}>
          <CardMedia
            className="card-image"
            component="img"
            image={getImagePath(image)}
            alt={title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: "cover", // Ensures image fills area without distortion
              transition: 'transform 0.8s ease-in-out',
            }}
          />
          {/* Category Badge */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              left: 16, 
              zIndex: 2,
              px: 1.5,
              py: 0.6,
              borderRadius: '12px',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              color: 'primary.main',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            {category}
          </Box>
        </Box>

        {/* Content Section */}
        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1, opacity: 0.6 }}>
            <LocationOnIcon sx={{ fontSize: '1rem', color: theme.palette.secondary.main }} />
            <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              {location}
            </Typography>
          </Stack>

          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 800,
              fontSize: '1.25rem',
              lineHeight: 1.3,
              mb: 1.5,
              color: 'text.primary',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '3.25rem'
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary', 
              lineHeight: 1.6,
              fontSize: '0.9rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* Action Section */}
      <Box sx={{ p: '0 24px 24px 24px' }}>
        {actions ? (
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
            {Array.isArray(actions) ? (
              <>
                <Box sx={{ flexGrow: 1 }}>{actions[0]}</Box>
                <Box>{actions[1]}</Box>
              </>
            ) : actions}
          </Box>
        ) : (
          <Button
            variant="text"
            fullWidth
            onClick={() => onViewDetails(id)}
            endIcon={<ArrowForwardIcon className="arrow" />}
            sx={{
              justifyContent: 'space-between',
              px: 0,
              color: 'primary.main',
              fontWeight: 800,
              fontSize: '0.875rem',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'transparent',
                '& .arrow': { transform: 'translateX(6px)' }
              },
              '& .arrow': { transition: 'transform 0.3s ease' }
            }}
          >
            Explore Experience
          </Button>
        )}
      </Box>
    </Card>
  );
};