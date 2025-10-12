import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import ListView from './ListView.jsx';
import Nav from './Nav.jsx';

function App() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/trips')
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the trips!', error);
      });
  }, []);
  

  return (
    <>
    <h1>Travli</h1>
      <Nav/>
      <ListView/>
    </>
  )
}

export default App
