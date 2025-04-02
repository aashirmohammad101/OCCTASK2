import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/EVchargingmap.css";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

// Custom marker icon
const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Component to programmatically change the map view
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Validate UK postcode
const isValidUKPostcode = (postcode) => {
  const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
  return ukPostcodeRegex.test(postcode.trim());
};

const EVChargingMap = () => {
  const [stations, setStations] = useState([]);
  const [sortedStations, setSortedStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [mapCenter, setMapCenter] = useState([51.5074, -0.1278]); // Default center
  const [mapZoom, setMapZoom] = useState(10); // Default zoom
  const [userAddress, setUserAddress] = useState(""); // User input address

  // Fetch Tesla charging stations data
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("/tesla-charging-stations.json");
        const data = await response.json();
        setStations(data);
        setSortedStations(data); // Default sorted stations
      } catch (error) {
        console.error("Error fetching charging stations:", error);
      }
    };

    fetchStations();
  }, []);

  // Handle user address input change
  const handleAddressChange = (e) => {
    setUserAddress(e.target.value);
  };

  // Fetch latitude and longitude for the entered address
  const fetchCoordinates = async () => {
    if (!userAddress) {
      alert("Please enter a valid address or postcode.");
      return;
    }

    // Validate UK postcode
    if (!isValidUKPostcode(userAddress)) {
      alert("Please enter a valid UK postcode.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          userAddress
        )}&key=284306e94f6c46c7872bf6bc2f5a3ec9`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        sortStationsByDistance(lat, lng);
        setMapCenter([lat, lng]); // Center map on user location
        setMapZoom(10); // Reset zoom
      } else {
        alert("Could not find the location. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert("An error occurred while fetching the location. Please try again.");
    }
  };

  // Sort stations by distance from user location
  const sortStationsByDistance = (userLat, userLon) => {
    const sorted = [...stations]
      .map((station) => ({
        ...station,
        distance: calculateDistance(userLat, userLon, station.latitude, station.longitude),
      }))
      .sort((a, b) => a.distance - b.distance);

    setSortedStations(sorted);
  };

  // Generate Google Maps URL for the selected station
  const getGoogleMapsLink = (station) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
  };

  // Handle list item click
  const handleStationClick = (station) => {
    setSelectedStation(station);
    setMapCenter([station.latitude, station.longitude]);
    setMapZoom(14); // Zoom in to the station
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
      <div className="page">
        <Navbar />
        <div className="ev-charging-map">
          <h1 style={{ marginBottom: "30px",fontFamily:"Eagle Lake, serif" }}>EV Charging Stations</h1>

          {/* User Address Input */}
          <div style={{ marginBottom: "36px",marginLeft:"5px" }}>
            <label style={{fontWeight:"bold"}}>
              Enter Postcode:
              <input 
                type="text"
                value={userAddress}
                onChange={handleAddressChange}
                placeholder="e.g., SW1A 1AA or Buckingham Palace"
                style={{ marginRight: "10px", width: "300px",marginLeft:"10px",padding:"5px" }}
              />
            </label>
            <button onClick={fetchCoordinates} style={{padding:"5px"}}>
              Find Closest Stations
            </button>
          </div>

          <div className="map-and-list">
            {/* Map */}
            <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "600px", width: "60%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <ChangeMapView center={mapCenter} zoom={mapZoom} />
              {sortedStations.map((station, index) => (
                <Marker
                  key={index}
                  position={[station.latitude, station.longitude]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => setSelectedStation(station),
                  }}
                >
                  <Popup>
                    <strong>{station.name}</strong>
                    <br />
                    {station.address}
                    <br />
                    {station.distance ? `${station.distance.toFixed(2)} km away` : ""}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* List of Charging Stations */}
            <div className="station-list">
              <h2 style={{ marginBottom: "20px",textDecoration:"underline" }}>Charging Stations List</h2>
              <ul>
                {sortedStations.map((station, index) => (
                  <li
                    key={index}
                    onClick={() => handleStationClick(station)}
                    style={{ cursor: "pointer" }}
                  >
                    <strong>{station.name}</strong>
                    <br />
                    {station.address}
                    <br />
                    {station.distance ? `${station.distance.toFixed(2)} km away` : ""}
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
                Select a station
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
