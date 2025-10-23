import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import ListView from './ListView.jsx';
import Nav from './Nav.jsx';
import AddOverlay from './AddOverlay.jsx';
import TripOverlay from './TripOverlay.jsx';

function App() {
  const [trips, setTrips] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(0);
  const [activeTrip, setActiveTrip] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/trips')
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the trips!', error);
      });
  }, []);

  function handleOpenAddOverlay() {
      setActiveOverlay(1);
  }

  function handleOpenTripOverlay(trip) {
      setActiveTrip(trip);
      setActiveOverlay(2);
  }

  function handleCloseOverlay() {
      setActiveOverlay(0);
  }

  return (
    <>
    <h1>Travli</h1>
      {activeOverlay == 1 && <AddOverlay closeAddOverlay={handleCloseOverlay}/>}
      {activeOverlay == 2 && <TripOverlay trip={activeTrip} closeTripOverlay={handleCloseOverlay}/>}
      <Nav openAddOverlay={handleOpenAddOverlay}/>
      <ListView trips={trips} openTripOverlay={handleOpenTripOverlay}/>
    </>
  )
}

export default App
