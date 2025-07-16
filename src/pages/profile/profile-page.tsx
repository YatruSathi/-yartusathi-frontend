import React, { useState } from "react";
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
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export const ProfilePage: React.FC = () => {
    const [avatar, setAvatar] = useState<string>("/images/user-avatar.jpg");
    const [bio, setBio] = useState<string>("Passionate traveler and photographer.");
    const [hobbies, setHobbies] = useState<string>("Trekking, Photography, Blogging");
    const [galleryImages, setGalleryImages] = useState<string[]>([]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
        }
    };

    const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (file) {
            setGalleryImages((prev) => [...prev, URL.createObjectURL(file)]);
        }
    };

    return (
        <Box p={3}>
            {/* Avatar */}
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                    src={avatar}
                    sx={{ width: 100, height: 100, border: "3px solid white" }}
                />
                <IconButton component="label" sx={{ ml: 2 }}>
                    <CameraAltIcon fontSize="small" />
                    <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                </IconButton>
            </Box>

            {/* Profile Info */}
            <Typography variant="h5" fontWeight="bold">
                John Doe
            </Typography>
            <Typography color="text.secondary" mb={2}>
                Adventure Traveler | Content Creator
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Description */}
            <Typography variant="subtitle1" fontWeight="medium" mb={1}>
                About Me
            </Typography>
            <TextField
                multiline
                fullWidth
                minRows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />

            {/* Hobbies */}
            <Typography variant="subtitle1" fontWeight="medium" mt={3} mb={1}>
                Hobbies
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
                {hobbies.split(",").map((hobby) => (
                    <Chip key={hobby.trim()} label={hobby.trim()} variant="outlined" />
                ))}
            </Stack>
            <TextField
                label="Update hobbies (comma separated)"
                fullWidth
                sx={{ mt: 2 }}
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
            />

            <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => alert("Profile updated successfully!")}
            >
                Save Profile
            </Button>

            <Divider sx={{ my: 4 }} />

            {/* Photo Gallery */}
            <Typography variant="h6" fontWeight="bold" mb={2}>
                My Gallery
            </Typography>
            <Button
                component="label"
                variant="outlined"
                startIcon={<CameraAltIcon />}
                sx={{ mb: 2 }}
            >
                Upload Photo
                <input hidden accept="image/*" type="file" onChange={handleGalleryUpload} />
            </Button>

            {galleryImages.length > 0 ? (
                <Grid container spacing={2}>
                    {galleryImages.map((img, idx) => (
                        <Grid item xs={6} sm={4} md={3} key={idx}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 150,
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    bgcolor: "grey.200",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    src={img}
                                    alt={`Gallery ${idx + 1}`}
                                    style={{
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography color="text.secondary">No photos uploaded yet.</Typography>
            )}
        </Box>
    );
};
