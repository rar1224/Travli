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
import SortDropdown from './dropdowns/SortDropdown.jsx';
import { filter } from 'motion/react-client';


function App() {
  const [activeOverlay, setActiveOverlay] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(0);

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
  const [values, setValues] = useState({
        name: "",
        destination: "",
        startDate: "",
        endDate: "",
        notes: ""
  });
  const [comparison, setComparison] = useState({
        startDate: "=",
        endDate: "="
  });

  const [visibleTrips, setVisibleTrips] = useState([]);

  const [activeSort, setActiveSort] = useState('');
  const [descending, setDescending] = useState(true);

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

  function handleChangeDropdown(dropdown) {
    setActiveDropdown(dropdown);
  }

  function handlePassFilters(activeFilters, values, comparison) {
      setActiveFilters(activeFilters);
      setValues(values);
      setComparison(comparison);
      setReload(true);
  }

  function handleClearFilters() {
      setActiveFilters({
          name: false,
          destination: false,
          startDate: false,
          endDate: false,
          notes: false
      });
      setValues({
          name: "",
          destination: "",
          startDate: "",
          endDate: "",
          notes: ""
      });
      setComparison({
        startDate: "=",
        endDate: "="
      });
      setReload(true);
  }

  function handlePassSorting(activeSort, descending) {
    setActiveSort(activeSort);
    setDescending(descending);
    setReload(true);
  }

  function sortTrips(newTrips) {
    if (activeSort != '') {
      if (activeSort == 'startDate' || activeSort == 'endDate') {
        newTrips.sort((a, b) => compareDateProperty(a, b, activeSort));
      } else {
        newTrips.sort((a, b) => compareStringProperty(a, b, activeSort));
      }

      if (!descending) newTrips.reverse();
    }

    return newTrips;
  }

  function compareStringProperty(a, b, name) {
    const astring = a[name].toLowerCase();
    const bstring = b[name].toLowerCase();

    if (astring > bstring) return 1;
    else if (astring < bstring) return -1;
    else return 0;
  }

  function compareDateProperty(a, b, name) {
    if (a[name] > b[name]) return 1;
    else if (a[name] < b[name]) return -1;
    return 0;
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

    newTrips = sortTrips(newTrips);

    setVisibleTrips(newTrips);
  }


  return (
    <>
    <h1>Travli</h1>
      {activeOverlay == 1 && <AddOverlay closeAddOverlay={handleCloseOverlay}/>}
      {activeOverlay == 2 && <TripOverlay activeTrip={activeTrip} closeTripOverlay={handleCloseOverlay} openEditOverlay={handleOpenEditOverlay}/>}
      {activeOverlay == 3 && <EditOverlay activeTrip={activeTrip} closeEditOverlay={handleCloseOverlay}/>}
      <Nav openAddOverlay={handleOpenAddOverlay} changeView={(e) => setIsListViewActive(!isListViewActive)} changeDropdown={handleChangeDropdown}/>
      {activeDropdown == 1 && <FilterDropdown passFilters={handlePassFilters} clearFilters={handleClearFilters}
      filters={activeFilters} comp={comparison} val={values}/>}
      {activeDropdown == 2 && <SortDropdown passSorting={handlePassSorting} sort={activeSort} desc={descending}/>}
      {isListViewActive && <ListView trips={visibleTrips} openTripOverlay={handleOpenTripOverlay}/>}
      {!isListViewActive && <GridView trips={visibleTrips} openTripOverlay={handleOpenTripOverlay}/>}
    </>
  )
}

export default App
