import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/EVchargingmap.css"; // Add custom styles if needed
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion';

// Custom marker icon
const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Replace with your custom icon URL
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32], // Position of the popup relative to the icon
});

const EVChargingMap = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null); // Track the selected station

  // Fetch Tesla charging stations data
  useEffect(() => {
    const fetchStations = async () => {
      try {
        // Replace with an actual API or static dataset URL
        const response = await fetch("/tesla-charging-stations.json");
        const data = await response.json();
        setStations(data);
      } catch (error) {
        console.error("Error fetching charging stations:", error);
      }
    };

    fetchStations();
  }, []);

  // Generate Google Maps URL for the selected station
  const getGoogleMapsLink = (station) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
  };

  return (
    <motion.div initial={{ opacity: 0,y:50 }} animate={{ opacity: 1,y:0 }} transition={{ duration: 1.5 }}>
    <div className="page">
      <Navbar />
      <div className="ev-charging-map">
        <h1 style={{ marginBottom: "30px" }}>EV Charging Stations</h1>
        <div className="map-and-list">
          {/* Map */}
          <MapContainer center={[51.5074, -0.1278]} zoom={10} style={{ height: "600px", width: "60%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {stations.map((station, index) => (
              <Marker
                key={index}
                position={[station.latitude, station.longitude]}
                icon={customIcon}
                eventHandlers={{
                  click: () => setSelectedStation(station), // Set the selected station on marker click
                }}
              >
                <Popup>
                  <strong>{station.name}</strong>
                  <br />
                  {station.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* List of Charging Stations */}
          <div className="station-list">
            <h2 style={{ marginBottom: "20px" }}>Charging Stations List</h2>
            <ul>
              {stations.map((station, index) => (
                <li key={index}>
                  <strong>{station.name}</strong>
                  <br />
                  {station.address}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="cta-section">
          <h2>Need directions to one of the charging stations?</h2>
          {selectedStation ? (
            <a
              href={getGoogleMapsLink(selectedStation)}
              target="_blank"
              rel="noopener noreferrer"
              className="appointment-button"
            >
              Get Directions
            </a>
          ) : (
            <button className="appointment-button" disabled>
              Select a station on the map
            </button>
          )}
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>Contact us at: info@example.com | Call: 1800 254 2681</p>
          <p>123 Fifth Avenue, New York, NY 10160, USA</p>
        </footer>
      </div>
    </div>
    </motion.div>
  );
};

export default EVChargingMap;
