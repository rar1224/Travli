import './ListView.css';

function TripListItem({name, destination, startDate, endDate}) {
  return (
    <div className='tripListItem'>
      <p className='title'>{name}</p>
      <p className='destination'>{destination}</p>
      <p className='date'>{startDate} - {endDate}</p>
    </div>
  )
}

function ListView() {
  return (
    <>
      <TripListItem name="Business Trip" destination='Sol Chatha' startDate='12-29-23' endDate='20-29-23'/>
      <TripListItem name="Summer Vacation" destination='Hamaza' startDate='29-29-23' endDate='32-29-23'/>
    </>
  )
}

export default ListView
