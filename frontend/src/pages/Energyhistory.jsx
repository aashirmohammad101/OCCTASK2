import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const EnergyHistory = () => {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/energy-usage', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setHistory(response.data);
            } catch (error) {
                console.error('Error fetching energy history:', error);
                setError('Failed to fetch energy usage history.');
            }
        };

        fetchHistory();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/energy-usage/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(history.filter((entry) => entry._id !== id));
            setSuccess('Energy usage entry deleted successfully.');
        } catch (error) {
            console.error('Error deleting energy usage entry:', error);
            setError('Failed to delete energy usage entry.');
        }
    };

    return (
        <div className="page">
            <Navbar />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Your Energy Usage History</h1>
                {error && <div className="alert alert-danger text-center">{error}</div>}
                {success && <div className="alert alert-success text-center">{success}</div>}
                {history.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No energy usage data available.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Date</th>
                                    <th>Total Usage (kWh)</th>
                                    <th>Total Cost (£)</th>
                                    <th>Change</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((entry, index) => {
                                    const previousUsage = history[index + 1]?.totalUsage || 0;
                                    const change = entry.totalUsage - previousUsage;
                                    return (
                                        <tr key={entry._id}>
                                            <td>{new Date(entry.date).toLocaleDateString()}</td>
                                            <td>{entry.totalUsage.toFixed(2)}</td>
                                            <td>{entry.totalCost.toFixed(2)}</td>
                                            <td
                                                style={{
                                                    color: change > 0 ? 'red' : 'green',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {change > 0 ? `+${change.toFixed(2)}` : `${change.toFixed(2)}`} kWh
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(entry._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnergyHistory;