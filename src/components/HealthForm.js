import React, { useState } from 'react';
import { fetchData } from '../api';
import { TextField, MenuItem, Button, Container, Typography, Paper, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HealthRecommendationsDialog from './HealthRecommendationsDialog';

const HealthForm = () => {
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        weight: '',
        activityLevel: '',
        gender: '',  // 'M' for Male, 'F' for Female
        dailyWaterIntake: '',
        sleepHours: '',
        stressLevel: '',
    });

    const [open, setOpen] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        // Logical constraints
        if (formData.age < 1 || formData.age > 120) {
            toast.error('Please enter a valid age (1-120 years).');
            return;
        }
        if (formData.height < 50 || formData.height > 250) {
            toast.error('Please enter a valid height (50-250 cm).');
            return;
        }
        if (formData.weight < 10 || formData.weight > 300) {
            toast.error('Please enter a valid weight (10-300 kg).');
            return;
        }
        if (formData.activityLevel < 1 || formData.activityLevel > 5) {
            toast.error('Please enter a valid activity level (1-5).');
            return;
        }
        if (formData.dailyWaterIntake < 1 || formData.dailyWaterIntake > 20) {
            toast.error('Please enter a valid daily water intake (1-20 glasses).');
            return;
        }
        if (formData.sleepHours < 1 || formData.sleepHours > 24) {
            toast.error('Please enter a valid number of sleep hours (1-24 hours).');
            return;
        }
        if (formData.stressLevel < 1 || formData.stressLevel > 10) {
            toast.error('Please enter a valid stress level (1-10).');
            return;
        }

        const data = await fetchData('/predict', formData);
        if (data && data.length > 0) {
            // Log the recommendations to the console
            console.log('Received recommendations:', data);
            setRecommendations(data);
            setOpen(true);
        } else {
            toast.error('Failed to receive recommendations.');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={styles.paper}>
                <Box p={3}>
                    <Typography variant="h4" align="center" gutterBottom style={styles.header}>
                        Health Assessment Form
                    </Typography>
                    <TextField
                        fullWidth
                        label="Age"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        value={formData.age}
                        onChange={e => handleChange('age', e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Height (cm)"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        value={formData.height}
                        onChange={e => handleChange('height', e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Weight (kg)"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        value={formData.weight}
                        onChange={e => handleChange('weight', e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Activity Level (1-5)"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        value={formData.activityLevel}
                        onChange={e => handleChange('activityLevel', e.target.value)}
                    />
                    <TextField
                        select
                        fullWidth
                        label="Gender"
                        variant="outlined"
                        margin="normal"
                        value={formData.gender}
                        onChange={e => handleChange('gender', e.target.value)}
                    >
                        <MenuItem value="M">Male</MenuItem>
                        <MenuItem value="F">Female</MenuItem>
                    </TextField>
                    <TextField
                        fullWidth
                        label="Daily Water Intake (Glasses)"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        value={formData.dailyWaterIntake}
                        onChange={e => handleChange('dailyWaterIntake', e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Sleep Hours"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        value={formData.sleepHours}
                        onChange={e => handleChange('sleepHours', e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Stress Level (1-10)"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        value={formData.stressLevel}
                        onChange={e => handleChange('stressLevel', e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Paper>
            <ToastContainer />

            {/* Modal for recommendations */}
            <HealthRecommendationsDialog 
                open={open} 
                handleClose={handleClose} 
                recommendations={recommendations} 
            />
        </Container>
    );
};

const styles = {
    paper: {
        padding: '30px',
        borderRadius: '15px',
    },
    header: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    button: {
        marginTop: '20px',
        padding: '10px',
        fontSize: '18px',
    },
};

export default HealthForm;