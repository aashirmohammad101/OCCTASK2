import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const EnergyUsage = () => {
    const [appliances, setAppliances] = useState([{ name: '', usage: '' }]);
    const [pricePerKWh, setPricePerKWh] = useState(0.15);
    const [totalCost, setTotalCost] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to access this page.');
            navigate('/login');
        }
    }, [navigate]);

    const handleApplianceChange = (index, field, value) => {
        const updatedAppliances = [...appliances];
        updatedAppliances[index][field] = value;
        setAppliances(updatedAppliances);
    };

    const addAppliance = () => {
        setAppliances([...appliances, { name: '', usage: '' }]);
    };

    const calculateTotalCost = () => {
        const totalUsage = appliances.reduce((sum, appliance) => sum + parseFloat(appliance.usage || 0), 0);
        const cost = totalUsage * pricePerKWh;
        setTotalCost(cost.toFixed(2));
    };

    const saveEnergyUsage = async () => {
        try {
            const totalUsage = appliances.reduce((sum, appliance) => sum + parseFloat(appliance.usage || 0), 0);
            await axios.post('http://localhost:5000/api/energy-usage', {
                appliances,
                totalUsage,
                totalCost
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Energy usage saved successfully!');
        } catch (error) {
            console.error('Error saving energy usage:', error);
            alert('Failed to save energy usage.');
        }
    };

    return (
        <div className='page'>
            <Navbar/>
        <div className="container py-5">
            <div className="card mx-auto shadow-lg" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">Daily Energy Usage</h1>
                    <div className="mb-3">
                        {appliances.map((appliance, index) => (
                            <div key={index} className="row g-3 align-items-center mb-2">
                                <div className="col-6">
                                    <input
                                        type="text"
                                        placeholder="Appliance Name"
                                        value={appliance.name}
                                        onChange={(e) => handleApplianceChange(index, 'name', e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-4">
                                    <input
                                        type="number"
                                        placeholder="Usage (kWh)"
                                        value={appliance.usage}
                                        onChange={(e) => handleApplianceChange(index, 'usage', e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={addAppliance} 
                            className="btn btn-primary w-100">
                            Add Appliance
                        </button>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price per kWh:</label>
                        <input
                            type="number"
                            value={pricePerKWh}
                            onChange={(e) => setPricePerKWh(parseFloat(e.target.value))}
                            className="form-control"
                        />
                    </div>
                    <button 
                        onClick={calculateTotalCost} 
                        className="btn btn-success w-100 mb-3">
                        Calculate Total Cost
                    </button>
                    <h2 className="text-center">Total Cost: £{totalCost}</h2>
                    <button 
                        onClick={saveEnergyUsage} 
                        className="btn btn-warning w-100 mt-3">
                        Save Energy Usage
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default EnergyUsage;