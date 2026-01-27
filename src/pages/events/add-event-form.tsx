import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import api from "../../services/api";

interface EventFormInputs {
  title: string;
  description: string;
  location: string;
  date: string;
}

const AddEventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormInputs>();

  const onSubmit = async (data: EventFormInputs) => {
    try {
      await api.post("events/", {
        title: data.title,
        description: data.description,
        location: data.location,
        date: data.date,
      });
      alert("Event created successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Error creating event. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 2, m: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, fontWeight: 600, color: "primary.main" }}
      >
        Create Event
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid item xs={12}>
            <TextField
              label="Event Title"
              fullWidth
              required
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              required
              {...register("description", { required: "Description is required" })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <TextField
              label="Location"
              fullWidth
              required
              {...register("location", { required: "Location is required" })}
              error={!!errors.location}
              helperText={errors.location?.message}
            />
          </Grid>

          {/* Date */}
          <Grid item xs={12}>
            <TextField
              label="Event Date"
              type="datetime-local"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              {...register("date", { required: "Date is required" })}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 2,
                height: 56,
                fontWeight: 600,
                fontSize: "1.1rem",
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Create Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEventForm;
