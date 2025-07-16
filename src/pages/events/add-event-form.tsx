import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography } from '@mui/material';

type EventFormInputs = {
	title: string;
	date: string;
	location: string;
	description: string;
};

const AddEventForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<EventFormInputs>();

	const onSubmit = (data: EventFormInputs) => {
		// Here you would send data to your backend or state management
		alert('Event Created!\n' + JSON.stringify(data, null, 2));
		reset();
	};


	return (
		<Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
			<Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
				Create Event
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label="Title"
					fullWidth
					variant="outlined"
					margin="normal"
					{...register('title', { required: 'Title is required' })}
					error={!!errors.title}
					helperText={errors.title?.message}
				/>
				<TextField
					label="Date"
					fullWidth
					variant="outlined"
					margin="normal"
					type="date"
					InputLabelProps={{ shrink: true }}
					{...register('date', { required: 'Date is required' })}
					error={!!errors.date}
					helperText={errors.date?.message}
				/>
				<TextField
					label="Location"
					fullWidth
					variant="outlined"
					margin="normal"
					{...register('location', { required: 'Location is required' })}
					error={!!errors.location}
					helperText={errors.location?.message}
				/>
				<TextField
					label="Description"
					fullWidth
					variant="outlined"
					margin="normal"
					multiline
					minRows={4}
					{...register('description', { required: 'Description is required' })}
					error={!!errors.description}
					helperText={errors.description?.message}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					sx={{ mt: 2, height: 48, fontWeight: 500, textTransform: 'none', borderRadius: 1 }}
				>
					Create Event
				</Button>
			</form>
		</Box>
	);
};

export default AddEventForm;
