import './GridView.css';
import { formatDate } from './ListView';

function GridView({trips, openTripOverlay}) {
    return (
        <div className='grid-container'>
            {trips.map(trip => (
                <div className='grid-item' key={trip.id} onClick={(e) => openTripOverlay(trip)}>
                    <div className='grid-title'>{trip.name}</div>
                    <img src={trip.image == "" ? null : trip.image}/>
                    <div className='grid-destination'>
                    <img className='overlay-icon' src='./location.png'/>
                    {trip.destination}</div>
                    <div className='grid-date'>{formatDate(new Date(trip.startDate))} - {formatDate(new Date(trip.endDate))}</div>
                </div>
            ))}
        </div>
    );
}

export default GridView;