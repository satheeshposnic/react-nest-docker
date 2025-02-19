import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    IconButton, Tooltip 
} from '@mui/material';
import { Visibility, Edit, Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';

const SaleTable = ({ sales, onView, onEdit, onDelete }) => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedSales, setSortedSales] = useState([]);

    const handleSort = () => {
        setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        const sorted = [...sales].sort((a, b) =>
            sortOrder === 'asc' ? new Date(a.time) - new Date(b.time) : new Date(b.time) - new Date(a.time)
        );
        setSortedSales(sorted);
    }, [sales, sortOrder]);

    return (
        <TableContainer 
            component={Paper} 
            sx={{ mt: 3, borderRadius: '12px', boxShadow: 3, overflowX: "auto", maxWidth: '95%' }}
        >
            <Table sx={{ minWidth: 700, fontSize: '14px', tableLayout: "auto" }}>
                <TableHead sx={{ backgroundColor: "#ffffff", color: 'black', borderBottom: '2px solid #ddd' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', padding: '12px', color: '#3f51b5' }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', padding: '12px', color: '#3f51b5' }}>
                            Time
                            <IconButton onClick={handleSort} sx={{ ml: 1, color: "#3f51b5" }}>
                                {sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                            </IconButton>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', padding: '12px', color: '#3f51b5' }}>Items</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', padding: '12px', color: '#3f51b5' }}>Total</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', padding: '12px', color: '#3f51b5' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedSales.map((sale, index) => (
                        <TableRow 
                            key={sale._id} 
                            sx={{
                                backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                                '&:hover': { backgroundColor: "#f9f9f9" },
                                borderBottom: '1px solid #ddd',
                                transition: 'background-color 0.3s ease',
                                borderRadius: '8px',
                            }}
                        >
                            <TableCell sx={{ padding: '12px', fontWeight: 'normal' }}>{sale.description}</TableCell>
                            <TableCell sx={{ padding: '12px', fontWeight: 'normal' }}>{new Date(sale.time).toLocaleString()}</TableCell>
                            <TableCell sx={{ padding: '12px', fontWeight: 'normal' }}>
                                {sale.items.map((item, index) => (
                                    <div key={index} style={{ fontSize: '13px' }}>
                                        {item.name} (x{item.quantity}) - ${item.total}
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell sx={{ padding: '12px', fontWeight: 'normal', color: "#4caf50" }}>${sale.total}</TableCell>
                            <TableCell sx={{ padding: '12px' }}>
                                <Tooltip title="View">
                                    <IconButton color="primary" onClick={() => onView(sale._id)} size="small" sx={{ borderRadius: '8px' }}>
                                        <Visibility />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <IconButton color="secondary" onClick={() => onEdit(sale)} size="small" sx={{ borderRadius: '8px' }}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton color="error" onClick={() => onDelete(sale._id)} size="small" sx={{ borderRadius: '8px' }}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SaleTable;
