import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid, Box } from "@mui/material";

const ViewModal = ({ sale, onClose }) => {
    if (!sale) return null; // Ensure there's data before rendering

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'left', borderBottom: '1px solid #ddd', paddingBottom: 1 }}>
                Sale Details
            </DialogTitle>
            <DialogContent sx={{ paddingTop: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Sale Description */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                        <strong>Description:</strong> {sale.description}
                    </Typography>

                    {/* Sale Time */}
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        <strong>Time:</strong> {new Date(sale.time.replace(/\//g, '-')).toLocaleString()}
                    </Typography>

                    {/* Items List */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Items:</Typography>
                        {sale.items.map((item, index) => (
                            <Grid container key={index} sx={{ mb: 1, padding: '8px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{item.name}</Typography>
                                </Grid>
                                <Grid item xs={3} textAlign="center">
                                    <Typography variant="body2" sx={{ color: '#9e9e9e' }}>x{item.quantity}</Typography>
                                </Grid>
                                <Grid item xs={3} textAlign="right">
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>${item.total.toFixed(2)}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>

                    {/* Total Amount (Aligned to the Right) */}
                    <Box sx={{ mt: 2, borderTop: '1px solid #ddd', pt: 1, textAlign: 'right' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                            <strong>Total Amount:</strong> ${sale.total.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end', paddingBottom: 2 }}>
                <Button 
                    onClick={onClose} 
                    color="secondary" 
                    variant="outlined" 
                    sx={{ width: '100px', borderRadius: '8px', fontWeight: 'bold' }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewModal;
