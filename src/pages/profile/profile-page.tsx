import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Divider,
    Chip,
    Button,
    TextField,
    Stack,
    Grid,
    CircularProgress,
    Alert,
    Paper,
    Container,
    Card,
    CardContent,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import api from "../../api/api";

interface UserProfile {
    id?: number;
    name: string;
    email: string;
    bio: string;
    hobbies: string;
    avatar?: string;
    role?: string;
    full_name: string;
    citizenship_number: string;
    document_image?: string;
    is_kyc_verified: boolean;
}

export const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({
        name: "",
        email: "",
        bio: "",
        hobbies: "",
        full_name: "",
        citizenship_number: "",
        is_kyc_verified: false,
    });
    const [avatar, setAvatar] = useState<string>("/images/user-avatar.jpg");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    
    // KYC form state
    const [kycForm, setKycForm] = useState({
        full_name: "",
        citizenship_number: "",
    });
    const [kycFile, setKycFile] = useState<File | null>(null);
    const [kycSaving, setKycSaving] = useState(false);

    // Fetch user profile from backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await api.get('profile/');
                setProfile(response.data);
                setKycForm({
                    full_name: response.data.full_name || "",
                    citizenship_number: response.data.citizenship_number || "",
                });
                if (response.data.avatar) {
                    setAvatar(response.data.avatar);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleKycSubmit = async () => {
        setKycSaving(true);
        setMessage("");

        const formData = new FormData();
        formData.append('full_name', kycForm.full_name);
        formData.append('citizenship_number', kycForm.citizenship_number);
        if (kycFile) {
            formData.append('document_image', kycFile);
        }

        try {
            await api.put('profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage("KYC application submitted successfully!");
            // Refresh profile data
            const response = await api.get('profile/');
            setProfile(response.data);
        } catch (error) {
            setMessage("Failed to submit KYC. Please try again.");
        } finally {
            setKycSaving(false);
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
            
            // Upload avatar to backend
            const formData = new FormData();
            formData.append('avatar', file);
            
            try {
                await api.put('profile/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch (error) {
                console.error('Error uploading avatar:', error);
            }
        }
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        setMessage("");

        try {
            await api.put('profile/', {
                bio: profile.bio,
                hobbies: profile.hobbies,
            });
            setMessage("Profile updated successfully!");
        } catch (error) {
            setMessage("Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
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
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
                {/* Profile Header Background */}
                <Box sx={{ height: 150, bgcolor: 'primary.main' }} />
                
                <Box sx={{ px: { xs: 3, md: 6 }, pb: 6, position: 'relative' }}>
                    {/* Avatar */}
                    <Box sx={{ mt: -8, mb: 3, display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                src={avatar}
                                sx={{ 
                                    width: 150, 
                                    height: 150, 
                                    border: "6px solid white",
                                    boxShadow: 3,
                                }}
                            />
                            <IconButton 
                                component="label" 
                                sx={{ 
                                    position: 'absolute', 
                                    bottom: 10, 
                                    right: 10, 
                                    bgcolor: 'white',
                                    boxShadow: 2,
                                    '&:hover': { bgcolor: '#f0f0f0' }
                                }}
                            >
                                <CameraAltIcon fontSize="small" color="primary" />
                                <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                            </IconButton>
                        </Box>
                        <Box sx={{ ml: 3, mb: 2 }}>
                            <Typography variant="h4" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {profile.name || "Traveller"} 
                                {profile.is_kyc_verified && <VerifiedIcon color="primary" />}
                            </Typography>
                            <Typography color="text.secondary" variant="subtitle1">
                                {profile.email}
                            </Typography>
                            {profile.is_kyc_verified ? (
                                <Chip label="Verified Account" color="success" size="small" variant="outlined" sx={{ mt: 1, fontWeight: 700 }} />
                            ) : (
                                <Chip label="Unverified" color="warning" size="small" variant="outlined" sx={{ mt: 1, fontWeight: 700 }} />
                            )}
                        </Box>
                    </Box>

                    {message && (
                        <Alert severity={message.includes("success") ? "success" : "error"} sx={{ mb: 4, borderRadius: 2 }}>
                            {message}
                        </Alert>
                    )}

                    <Divider sx={{ my: 4 }} />

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>About Me</Typography>
                            <TextField
                                multiline
                                fullWidth
                                minRows={4}
                                placeholder="Share your travel experiences..."
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                sx={{ mb: 4 }}
                            />

                            <Typography variant="h6" fontWeight={700} gutterBottom>Interests & Hobbies</Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mb={2}>
                                {profile.hobbies && profile.hobbies.split(",").map((hobby: string) => (
                                    <Chip 
                                        key={hobby.trim()} 
                                        label={hobby.trim()} 
                                        color="primary" 
                                        variant="outlined" 
                                        sx={{ fontWeight: 600 }} 
                                    />
                                ))}
                            </Stack>
                            <TextField
                                label="Update interests (comma separated)"
                                fullWidth
                                placeholder="e.g. Trekking, Photography, Food"
                                value={profile.hobbies}
                                onChange={(e) => setProfile({ ...profile, hobbies: e.target.value })}
                            />

                            <Button
                                variant="contained"
                                size="large"
                                sx={{ mt: 4, px: 6, borderRadius: 2 }}
                                onClick={handleSaveProfile}
                                disabled={saving}
                            >
                                {saving ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
                            </Button>

                            <Divider sx={{ my: 6 }} />

                            <Box id="kyc-section">
                                <Typography variant="h5" fontWeight={800} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    KYC Verification {profile.is_kyc_verified && <VerifiedIcon color="success" />}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" mb={4}>
                                    Verify your identity to build trust within the community and unlock professional features.
                                </Typography>

                                {profile.is_kyc_verified ? (
                                    <Alert severity="success" sx={{ borderRadius: 3 }}>
                                        Your account is fully verified. Thank you for completing the KYC process!
                                    </Alert>
                                ) : (
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Full Legal Name"
                                                value={kycForm.full_name}
                                                onChange={(e) => setKycForm({ ...kycForm, full_name: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Citizenship/ID Number"
                                                value={kycForm.citizenship_number}
                                                onChange={(e) => setKycForm({ ...kycForm, citizenship_number: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box 
                                                sx={{ 
                                                    p: 3, 
                                                    border: '2px dashed', 
                                                    borderColor: 'divider', 
                                                    borderRadius: 3,
                                                    textAlign: 'center',
                                                    bgcolor: 'rgba(0,0,0,0.01)'
                                                }}
                                            >
                                                <Typography variant="body2" mb={2} color="text.secondary">
                                                    Upload Identity Document (Citizenship, License, or Passport)
                                                </Typography>
                                                <Button variant="outlined" component="label">
                                                    {kycFile ? kycFile.name : "Choose File"}
                                                    <input hidden type="file" onChange={(e) => setKycFile(e.target.files?.[0] || null)} />
                                                </Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleKycSubmit}
                                                disabled={kycSaving || !kycForm.full_name || !kycForm.citizenship_number}
                                                sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                                            >
                                                {kycSaving ? <CircularProgress size={24} /> : "Submit KYC Verification"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card sx={{ bgcolor: 'rgba(15, 23, 42, 0.03)', border: 'none', boxShadow: 'none' }}>
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>Quick Stats</Typography>
                                    <Stack spacing={2} sx={{ mt: 2 }}>
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography variant="body2" color="text.secondary">Events Created</Typography>
                                            <Typography variant="body2" fontWeight={700}>12</Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography variant="body2" color="text.secondary">Following</Typography>
                                            <Typography variant="body2" fontWeight={700}>48</Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography variant="body2" color="text.secondary">Followers</Typography>
                                            <Typography variant="body2" fontWeight={700}>124</Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};
