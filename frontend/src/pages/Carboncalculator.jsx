import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

const CarbonFootprintCalculator = () => {
  const [data, setData] = useState({ transport: 0, energy: 0, food: 0, waste: 0 });
  const [result, setResult] = useState(null);

  const calculateFootprint = () => {
    const total = Object.values(data).reduce((a, b) => a + Number(b), 0);
    setResult(total);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Navbar />
    <div className="container text-center mt-5">
      <h1 className="mb-4">Carbon Footprint Calculator</h1>
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          {Object.keys(data).map((key) => (
            <div key={key} className="mb-3">
              <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input 
                type="number" 
                name={key} 
                className="form-control"
                placeholder={`Enter ${key} footprint`} 
                onChange={handleChange} 
              />
            </div>
          ))}
          <button className="btn btn-primary w-100" onClick={calculateFootprint}>Calculate</button>
          {result !== null && (
            <div className="mt-4">
              <h2 className="text-success">Total Footprint: {result} kg CO₂</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={Object.keys(data).map((key) => ({ name: key, value: data[key] }))}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default CarbonFootprintCalculator;
