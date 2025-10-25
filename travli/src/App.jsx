import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import ListView from './ListView.jsx';
import Nav from './Nav.jsx';
import AddOverlay from './AddOverlay.jsx';
import TripOverlay from './TripOverlay.jsx';
import EditOverlay from './EditOverlay.jsx';

function App() {
  const [trips, setTrips] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(0);
  const [activeTrip, setActiveTrip] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(false);
    axios.get('http://localhost:3001/trips')
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the trips!', error);
      });
  }, [reload]);

  function handleOpenAddOverlay() {
      setActiveOverlay(1);
  }

  function handleOpenTripOverlay(trip) {
      setActiveTrip(trip);
      setActiveOverlay(2);
  }

  function handleOpenEditOverlay(trip) {
      setActiveTrip(trip);
      setActiveOverlay(3);
  }

  function handleCloseOverlay() {
      setReload(true);
      setActiveOverlay(0);
  }

  return (
    <>
    <h1>Travli</h1>
      {activeOverlay == 1 && <AddOverlay closeAddOverlay={handleCloseOverlay}/>}
      {activeOverlay == 2 && <TripOverlay activeTrip={activeTrip} closeTripOverlay={handleCloseOverlay} openEditOverlay={handleOpenEditOverlay}/>}
      {activeOverlay == 3 && <EditOverlay activeTrip={activeTrip} closeEditOverlay={handleCloseOverlay}/>}
      <Nav openAddOverlay={handleOpenAddOverlay}/>
      <ListView trips={trips} openTripOverlay={handleOpenTripOverlay}/>
    </>
  )
}

export default App
