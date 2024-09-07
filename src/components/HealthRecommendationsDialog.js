import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function HealthRecommendationsDialog({ open, handleClose, recommendations }) {
    const formatRecommendation = (rec) => {
        // Regex to match "Health Score is" or "BMI is" followed by a number
        return rec.replace(/(Health Score is|BMI is) (\d+(\.\d+)?)/g, (match, p1, p2) => (
            `${p1} <strong>${p2}</strong>`
        ));
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold', color: '#007bff' }}>
                Health Recommendations
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{ marginBottom: '20px', textAlign: 'center', color: '#555' }}>
                    Based on your health assessment, here are some recommendations:
                </DialogContentText>
                <List>
                    {recommendations.map((rec, index) => (
                        <ListItem key={index} alignItems="flex-start">
                            <ListItemIcon>
                                <CheckCircleIcon style={{ color: '#4caf50' }} />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography
                                    variant="body1"
                                    style={{
                                        color: '#333',
                                        fontSize: '16px',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: formatRecommendation(rec) }}
                                />
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
                <Button onClick={handleClose} variant="contained" color="primary" size="large" style={{ padding: '10px 20px', fontWeight: 'bold' }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default HealthRecommendationsDialog