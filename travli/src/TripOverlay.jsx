import './AddOverlay.css';
import './TripOverlay.css';
import {formatDate} from './ListView.jsx';
import axios from 'axios';
import { useState } from 'react';

function TripOverlay({activeTrip, closeTripOverlay, openEditOverlay}) {
    const [trip, setTrip] = useState(activeTrip);

    function handleDeleteTrip() {
        let text = "Do you want to delete this trip?";
        if (confirm(text)) {
            deleteTrip();
        }
    }

    const deleteTrip = async (e) => {
        try {
            await axios.delete('http://localhost:3001/trips/' + trip.id, trip);
            alert("Trip deleted!");
        } catch(error) {
            console.error('There was an error deleting the trip!', error);
        }
    }

    return (
        <>
            <div className='window'>
                <h2>{trip.name}</h2>
                <img src={trip.image == "" ? null : trip.image}/>
                <div className='destination-text'>
                <img className='overlay-icon' src='./location.png'/>
                {trip.destination}</div>
                <div className='date-text'>{formatDate(new Date(trip.startDate))} - {formatDate(new Date(trip.endDate))}</div>
                <div className='notes-text'>{trip.notes}</div>
                <div className='button-container'>
                    <button onClick={(e) => openEditOverlay(trip)}>Edit</button>
                    <button onClick={handleDeleteTrip}>Delete</button>
                    <button onClick={closeTripOverlay}>Close</button>
                </div>
            </div>
            <div className='overlay' onClick={closeTripOverlay}/>
        </> 
    );
}

export default TripOverlay;