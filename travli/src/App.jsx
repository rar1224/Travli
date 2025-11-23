import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Nav from './Nav.jsx';
import ListView from './ListView.jsx';
import GridView from './GridView.jsx';
import AddOverlay from './overlays/AddOverlay.jsx';
import TripOverlay from './overlays/TripOverlay.jsx';
import EditOverlay from './overlays/EditOverlay.jsx';
import FilterDropdown from './dropdowns/FilterDropdown.jsx';
import { filter } from 'motion/react-client';


function App() {
  const [activeOverlay, setActiveOverlay] = useState(0);
  const [activeTrip, setActiveTrip] = useState(null);
  const [reload, setReload] = useState(false);
  const [isListViewActive, setIsListViewActive] = useState(true);

  const [activeFilters, setActiveFilters] = useState({
        name: false,
        destination: false,
        startDate: false,
        endDate: false,
        notes: false
  });
  const [values, setValues] = useState();
  const [comparison, setComparison] = useState();

  const [visibleTrips, setVisibleTrips] = useState([]);

  useEffect(() => {
    setReload(false);
    axios.get('http://localhost:3001/trips')
      .then(response => {
        refreshTrips(response.data);
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

  function handlePassFilters(activeFilters, values, comparison) {
      setActiveFilters(activeFilters);
      setValues(values);
      setComparison(comparison);
      setReload(true);
  }

  function filterString(trips, filter) {
    if (activeFilters[filter]) {
      let filtered = [];
      trips.forEach((trip) => {
        if (trip[filter].toLowerCase().includes(values[filter].toLowerCase())) {
            filtered.push(trip);
        }
      });
      trips = filtered;
    }
    return trips;
  }

  function filterDate(trips, filter) {
    

    if (activeFilters[filter]) {
      let filtered = [];
      let comp = comparison[filter];
      const [y, m, d] = values[filter].split('-').map(Number);
      let date = new Date(y, m-1, d);

      trips.forEach((trip) => {
        let tripDate = new Date(trip[filter]);

        if (comp == 'before') {
          if (tripDate < date) filtered.push(trip);
        } else if (comp == 'after') {
          if (tripDate > date) filtered.push(trip);
        } else {
          if (date.getTime() == tripDate.getTime()) filtered.push(trip);
        }
      });
      trips = filtered;
    }
    return trips;
  }

  function refreshTrips(trips) {
    // apply filters
    let newTrips = trips;

    newTrips = filterString(newTrips, 'name');
    newTrips = filterString(newTrips, 'destination');
    newTrips = filterDate(newTrips, 'startDate');
    newTrips = filterDate(newTrips, 'endDate');
    newTrips = filterString(newTrips, 'notes');

    setVisibleTrips(newTrips);
  }


  return (
    <>
    <h1>Travli</h1>
      {activeOverlay == 1 && <AddOverlay closeAddOverlay={handleCloseOverlay}/>}
      {activeOverlay == 2 && <TripOverlay activeTrip={activeTrip} closeTripOverlay={handleCloseOverlay} openEditOverlay={handleOpenEditOverlay}/>}
      {activeOverlay == 3 && <EditOverlay activeTrip={activeTrip} closeEditOverlay={handleCloseOverlay}/>}
      <Nav openAddOverlay={handleOpenAddOverlay} changeView={(e) => setIsListViewActive(!isListViewActive)}/>
      <FilterDropdown passFilters={handlePassFilters}/>
      {isListViewActive && <ListView trips={visibleTrips} openTripOverlay={handleOpenTripOverlay}/>}
      {!isListViewActive && <GridView trips={visibleTrips} openTripOverlay={handleOpenTripOverlay}/>}
    </>
  )
}

export default App
