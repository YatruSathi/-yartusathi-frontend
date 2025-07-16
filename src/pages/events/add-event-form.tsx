import React from 'react';
import { useForm } from 'react-hook-form';

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
		<div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
			<h2>Create Event</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div style={{ marginBottom: 16 }}>
					<label>Title</label>
					<input
						{...register('title', { required: 'Title is required' })}
						style={{ width: '100%', padding: 8, height: 40, boxSizing: 'border-box' }}
					/>
					{errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
				</div>
				<div style={{ marginBottom: 16 }}>
					<label>Date</label>
					<input
						type="date"
						{...register('date', { required: 'Date is required' })}
						style={{ width: '100%', padding: 8, height: 40, boxSizing: 'border-box' }}
					/>
					{errors.date && <span style={{ color: 'red' }}>{errors.date.message}</span>}
				</div>
				<div style={{ marginBottom: 16 }}>
					<label>Location</label>
					<input
						{...register('location', { required: 'Location is required' })}
						style={{ width: '100%', padding: 8, height: 40, boxSizing: 'border-box' }}
					/>
					{errors.location && <span style={{ color: 'red' }}>{errors.location.message}</span>}
				</div>
				<div style={{ marginBottom: 16 }}>
					<label>Description</label>
					<textarea
						{...register('description', { required: 'Description is required' })}
						style={{ width: '100%', padding: 8, minHeight: 80, boxSizing: 'border-box' }}
						rows={4}
					/>
					{errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}
				</div>
				<button
					type="submit"
					style={{
						padding: '8px 16px',
						height: 40,
						background: '#1976d2',
						color: '#fff',
						border: 'none',
						borderRadius: 4,
						cursor: 'pointer',
						fontSize: 16,
						fontWeight: 500,
						boxSizing: 'border-box',
						marginTop: 8,
					}}
				>
					Create Event
				</button>
			</form>
		</div>
	);
};

export default AddEventForm;
