import './AddOverlay.css';
import './TripOverlay.css';
import {formatDate} from './ListView.jsx';

function TripOverlay({trip, closeTripOverlay}) {
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
                    <button>Edit</button>
                    <button>Delete</button>
                    <button onClick={closeTripOverlay}>Close</button>
                </div>
            </div>
            <div className='overlay' onClick={closeTripOverlay}/>
        </> 
    );
}

export default TripOverlay;