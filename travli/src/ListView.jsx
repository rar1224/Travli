import './ListView.css';
import { useState } from 'react';

export function formatDate(date) {
  return (date.getDate() + '-' + String(date.getMonth()).padStart(2, '0') + '-' + date.getFullYear());
}

function ListView({trips, openTripOverlay}) {
  return (
    <>
      {trips.map(trip => (
      <div key={trip.id} className='tripListItem' onClick={(e) => openTripOverlay(trip)}>
        <p className='title'>{trip.name}</p>
        <img className='icon' src='/location.png'/>
        <p className='destination'>{trip.destination}</p>
        <p className='date'>{formatDate(new Date(trip.startDate))} - {formatDate(new Date(trip.endDate))}</p>
      </div>
      ))}
    </>
  )
}

export default ListView
