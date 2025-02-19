import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const SaleModal = ({ sale, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        description: '',
        time: '',
        items: [{ name: '', quantity: '', total: '' }],
        total: 0
    });

    useEffect(() => {
        if (sale) {
            const date = new Date(sale.time);
            const offset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
            const localDate = new Date(date - offset); // Adjust to local time
    
            setFormData({
                ...sale,
                time: localDate.toISOString().slice(0, 16), // Format for datetime-local input
                items: sale.items || [{ name: '', quantity: '', total: '' }]
            });
        }
    }, [sale]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...formData.items];
        updatedItems[index][name] = value;
        setFormData({
            ...formData,
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0)
        });
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { name: '', quantity: '', total: '' }]
        });
    };

    const removeItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{sale ? 'Edit Sale' : 'Add Sale'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Description"
                        name="description"
                        fullWidth
                        margin="normal"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Time"
                        name="time"
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                    {formData.items.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <TextField
                                label="Item Name"
                                name="name"
                                fullWidth
                                margin="normal"
                                value={item.name}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                fullWidth
                                margin="normal"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <TextField
                                label="Total"
                                name="total"
                                type="number"
                                fullWidth
                                margin="normal"
                                value={item.total}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            {formData.items.length > 1 && (
                                <IconButton onClick={() => removeItem(index)} color="error">
                                    <Remove />
                                </IconButton>
                            )}
                        </div>
                    ))}
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<Add />}
                        onClick={addItem}
                        sx={{ mt: 2 }}
                    >
                        Add Item
                    </Button>
                    <TextField
                        label="Total Amount"
                        name="total"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.total}
                        onChange={handleChange}
                        disabled
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SaleModal;
