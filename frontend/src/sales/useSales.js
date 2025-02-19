import { useState, useEffect, useCallback } from 'react';
import { getSales, addSale, updateSale, deleteSale, getOneSale } from '../services/Api';

const useSales = () => {
    const [sales, setSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSale, setSelectedSale] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwtToken')); // ✅ Check token on load

    const fetchSales = useCallback(async () => {
        if (!loggedIn) return;  // ✅ Prevent API call if not logged in
        setLoading(true);
        setError(null);
        try {
            const response = await getSales(currentPage, recordsPerPage);
            setSales(response.sales);
            setTotalPages(Math.ceil(response.total / recordsPerPage));
        } catch (err) {
            setError('Failed to fetch sales');
        } finally {
            setLoading(false);
        }
    }, [currentPage, recordsPerPage, loggedIn]);

    useEffect(() => {
        if (loggedIn) {
            fetchSales();
        }
    }, [currentPage, recordsPerPage, loggedIn, fetchSales]);

    const handleLogin = (token) => {
        console.log(token);
        localStorage.setItem('jwtToken', token); // ✅ Store token
        setLoggedIn(true);
        fetchSales();  // ✅ Load sales after login
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken'); // ✅ Clear token
        setLoggedIn(false);
        setSales([]); // ✅ Clear data
    };

    const handleEdit = (sale) => {
        setSelectedSale(sale);
        setModalOpen(true);
    };

    const handleView = async (id) => {
        try {
            const sale = await getOneSale(id);
            setSelectedSale(sale);
            setViewModalOpen(true);
        } catch (err) {
            setError('Failed to fetch sale details');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this sale?')) {
            try {
                await deleteSale(id);
                fetchSales();
            } catch (err) {
                setError('Failed to delete sale');
            }
        }
    };

    const handleAddSale = () => {
        setSelectedSale(null);
        setModalOpen(true);
    };

    const handleAddOrUpdate = async (saleData) => {
        try {
            if (selectedSale) {
                await updateSale(selectedSale._id, saleData);
            } else {
                await addSale(saleData);
                setSales([saleData, ...sales]);
            }
            setModalOpen(false);
            setSelectedSale(null);
            fetchSales();
        } catch (err) {
            setError('Failed to save sale');
        }
    };

    return {
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
    };
};

export default useSales;
