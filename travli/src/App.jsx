import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import ListView from './ListView.jsx';
import Nav from './Nav.jsx';
import AddOverlay from './AddOverlay.jsx';

function App() {
  const [trips, setTrips] = useState([]);
  const [isAddOverlayOn, setAddOverlayOn] = useState(false);

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
      setAddOverlayOn(true);
  }

  function handleCloseAddOverlay() {
      setAddOverlayOn(false);
  }

  return (
    <>
    <h1>Travli</h1>
      {isAddOverlayOn && <AddOverlay closeAddOverlay={handleCloseAddOverlay}/>}
      <Nav openAddOverlay={handleOpenAddOverlay}/>
      <ListView/>
    </>
  )
}

export default App
