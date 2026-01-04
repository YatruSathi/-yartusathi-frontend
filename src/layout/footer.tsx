import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Button,
  IconButton,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router';

function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(to right, ${theme.palette.primary.main}, #1e293b)`,
        color: '#cbd5e0',
        mt: 8,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 2 }}>
              ABOUT US
            </Typography>
            <Typography variant="body2" sx={{ color: '#a1a5b4', lineHeight: 1.8, mb: 2 }}>
              We're committed to bringing you the best experience with our platform. Learn more
              about our mission and values.
            </Typography>
            <Button
              size="small"
              onClick={() => handleNavigation('/home')}
              sx={{
                color: theme.palette.primary.main,
                textTransform: 'none',
                p: 0,
                '&:hover': { color: theme.palette.primary.light },
              }}
            >
              Learn More →
            </Button>
          </Grid>

          {/* Get Help Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 2 }}>
              GET HELP
            </Typography>
            <Stack spacing={1}>
              <Button
                size="small"
                onClick={() => handleNavigation('/home')}
                sx={{
                  color: '#a1a5b4',
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  p: 0,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Home
              </Button>
              <Button
                size="small"
                onClick={() => handleNavigation('/events')}
                sx={{
                  color: '#a1a5b4',
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  p: 0,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Events
              </Button>
              <Button
                size="small"
                onClick={() => handleNavigation('/notification')}
                sx={{
                  color: '#a1a5b4',
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  p: 0,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Notifications
              </Button>
              <Button
                size="small"
                onClick={() => handleNavigation('/chatbot')}
                sx={{
                  color: '#a1a5b4',
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  p: 0,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Chat Support
              </Button>
            </Stack>
          </Grid>

          {/* Resources Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 2 }}>
              RESOURCES
            </Typography>
            <Stack spacing={1}>
              <Button
                size="small"
                onClick={() => handleNavigation('/favorite')}
                sx={{
                  color: '#a1a5b4',
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  p: 0,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Favorites
              </Button>
              <Button
                size="small"
                onClick={() => handleNavigation('/my-events')}
                sx={{
                  color: '#a1a5b4',
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  p: 0,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                My Events
              </Button>
              <Button
                size="small"
                onClick={() => handleNavigation('/events/create')}
                sx={{
                  color: '#a1a5b4',
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  p: 0,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Create Event
              </Button>
              <Button
                size="small"
                onClick={() => handleNavigation('/user-profile')}
                sx={{
                  color: '#a1a5b4',
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  p: 0,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Profile
              </Button>
            </Stack>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 2 }}>
              CONTACT US
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <MailIcon sx={{ color: theme.palette.primary.main, mt: 0.5, flexShrink: 0 }} />
                <Link
                  href="mailto:minorproject856@gmail.com"
                  sx={{
                    color: '#a1a5b4',
                    textDecoration: 'none',
                    wordBreak: 'break-all',
                    '&:hover': { color: theme.palette.primary.main },
                    fontSize: '0.875rem',
                  }}
                >
                  minorproject856@gmail.com
                </Link>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <PhoneIcon sx={{ color: theme.palette.primary.main, mt: 0.5, flexShrink: 0 }} />
                <Link
                  href="tel:98"
                  sx={{
                    color: '#a1a5b4',
                    textDecoration: 'none',
                    '&:hover': { color: theme.palette.primary.main },
                    fontSize: '0.875rem',
                  }}
                >
                  +977 98**** ****
                </Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ bgcolor: '#475569', my: 3 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Copyright */}
          <Typography variant="body2" sx={{ color: '#a1a5b4' }}>
            © {currentYear} Minor Project. All Rights Reserved.
          </Typography>

          {/* Links */}
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="#terms"
              sx={{
                color: '#a1a5b4',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: theme.palette.primary.main },
              }}
            >
              Terms of Use
            </Link>
            <Link
              href="#privacy"
              sx={{
                color: '#a1a5b4',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: theme.palette.primary.main },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#cookies"
              sx={{
                color: '#a1a5b4',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: theme.palette.primary.main },
              }}
            >
              Cookie Policy
            </Link>
          </Box>

          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              component="a"
              href=""
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                bgcolor: '#334155',
                color: '#cbd5e0',
                '&:hover': { bgcolor: theme.palette.primary.main },
              }}
            >
              <FacebookIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
            <IconButton
              component="a"
              href=""
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                bgcolor: '#334155',
                color: '#cbd5e0',
                '&:hover': { bgcolor: theme.palette.primary.main },
              }}
            >
              <TwitterIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
            <IconButton
              component="a"
              href=""
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                bgcolor: '#334155',
                color: '#cbd5e0',
                '&:hover': { bgcolor: theme.palette.primary.main },
              }}
            >
              <InstagramIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
            <IconButton
              component="a"
              href=""
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                bgcolor: '#334155',
                color: '#cbd5e0',
                '&:hover': { bgcolor: theme.palette.primary.main },
              }}
            >
              <LinkedInIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
            <IconButton
              component="a"
              href=""
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                bgcolor: '#334155',
                color: '#cbd5e0',
                '&:hover': { bgcolor: theme.palette.primary.main },
              }}
            >
              <YouTubeIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
