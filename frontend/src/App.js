import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useSales from './sales/useSales';
import SaleTable from './table/SaleTable';
import SaleModal from './modal/SaleModal';
import ViewModal from './modal/ViewSaleModal';
import LoginModal from './modal/loginModal';
import { Button, CircularProgress, Typography, Box, Pagination, TextField, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const App = () => {
    const {
        sales,
        currentPage,
        totalPages,
        searchTerm,
        recordsPerPage,
        modalOpen,
        viewModalOpen,
        selectedSale,
        loading,
        error,
        loggedIn,
        handleLogin,
        handleLogout,
        handleAddSale,
        handleView,
        handleEdit,
        handleDelete,
        handleAddOrUpdate,
        setCurrentPage,
        setSearchTerm,
        setRecordsPerPage,
        setModalOpen,
        setViewModalOpen
    } = useSales();

    return (
        <Router>
            <Box sx={{ padding: 4 }}>
                <Routes>
                    {/* Redirect "/" to "/login" */}
                    <Route path="/" element={<Navigate to="/login" />} />

                    {/* Login Route */}
                    <Route path="/login" element={
                        !loggedIn ? <LoginModal onLogin={handleLogin} onClose={() => { }} /> : <Navigate to="/sales" />
                    } />

                    {/* Sales Management route */}
                    <Route path="/sales" element={
                        loggedIn ? (
                            <>
                                <Typography variant="h4" align="center" gutterBottom>
                                    Sales Management
                                </Typography>
                                <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth>
                                            <InputLabel>Records per page</InputLabel>
                                            <Select
                                                value={recordsPerPage}
                                                onChange={(e) => setRecordsPerPage(e.target.value)}
                                                label="Records per page"
                                            >
                                                {[5, 10, 20, 50, 75, 100].map((size) => (
                                                    <MenuItem key={size} value={size}>
                                                        {size}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Search Sales"
                                            variant="outlined"
                                            fullWidth
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                                        <Button variant="contained" color="primary" onClick={handleAddSale}>
                                            Add Sale
                                        </Button>
                                    </Grid>
                                </Grid>

                                {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}
                                {error && <Typography color="error">{error}</Typography>}

                                <SaleTable sales={sales} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />

                                {modalOpen && <SaleModal sale={selectedSale} onSave={handleAddOrUpdate} onClose={() => setModalOpen(false)} />}
                                {viewModalOpen && <ViewModal sale={selectedSale} onClose={() => setViewModalOpen(false)} />}

                                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                                    <Pagination count={totalPages} page={currentPage} onChange={(e, page) => setCurrentPage(page)} siblingCount={1} boundaryCount={1} />
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "center", mt: 4, pb: 3 }}>
                                    <Button onClick={handleLogout} variant="outlined" color="secondary">
                                        Logout
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Navigate to="/login" />
                        )
                    } />
                </Routes>
            </Box>
        </Router>
    );
};

export default App;
