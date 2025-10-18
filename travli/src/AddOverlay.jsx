import { use, useState } from 'react';
import './AddOverlay.css';

function AddOverlay({closeAddOverlay}) {
    const [trip, setTrip] = useState({
            name: "",
            image: "https://images.pexels.com/photos/29498849/pexels-photo-29498849.jpeg",
            destination: "",
            startDate: "",
            endDate: "",
            notes: ""
    });

    const [nameStyle, setNameStyle] = useState(valid);
    const [destStyle, setDestStyle] = useState(valid);
    const [startDateStyle, setStartDateStyle] = useState(valid);
    const [endDateStyle, setEndDateStyle] = useState(valid);

    function validateForm() {
        let message = "";
        let datesValid = true;

        if (trip.name == "") {
            message += "Fill in name!\n";
            setNameStyle(invalid);
        } else setNameStyle(valid);

        if (trip.destination == "") {
            message += "Fill in destination!\n";
            setDestStyle(invalid);
        } else setDestStyle(valid);

        if(trip.startDate == "") {
            message += "Fill in start date!\n";
            setStartDateStyle(invalid);
            datesValid = false;
        } else setStartDateStyle(valid);

        if(trip.endDate == "") {
            message += "Fill in end date!\n";
            setEndDateStyle(invalid);
            datesValid = false;
        } else setEndDateStyle(valid);

        if (datesValid) {
            if (Date.parse(trip.startDate) > Date.parse(trip.endDate)) {
                message += "End date must be after the start date!\n"
                setStartDateStyle(invalid);
                setEndDateStyle(invalid);
            }
        }

        if (message != "") 
            {
                alert(message);
                return false;
            }
    }

    function handleCloseAddOverlay() {
        closeAddOverlay();
    }

    return (
        <>
            <div className='window'>
                <h2>Add new trip</h2>
                <form>
                    <label>Name:<input className="text-input" type="text" value={trip.name}
                    style={nameStyle} onChange={(e) => {setTrip({...trip, name: e.target.value})}}/></label>

                    <label>Image:<input className="text-input" type="text" value={trip.image}
                    onChange={(e) => setTrip({...trip, image: e.target.value})}/>
                    <br/> <img src={trip.image}/>
                    </label>

                    <label>Destination:<input className="text-input" type="text" value={trip.destination}
                    style={destStyle} onChange={(e) => setTrip({...trip, destination: e.target.value})}/></label>

                    <label>Start date:<input className="date-input" type="date" value={trip.startDate}
                    style={startDateStyle} onChange={(e) => setTrip({...trip, startDate: e.target.value})}/>
                    End date:<input className="date-input" type="date" value={trip.endDate}
                    style={endDateStyle} onChange={(e) => setTrip({...trip, endDate: e.target.value})}/></label>

                    <label>Notes: <br/>
                    <textarea value={trip.notes} onChange={(e) => setTrip({...trip, notes: e.target.value})}/></label>

                    <button type="button" onClick={validateForm}>Submit</button>
                </form>
            </div>
            <div className='overlay' onClick={handleCloseAddOverlay}/>
        </>
        
    );
}

export default AddOverlay

const invalid = {
    backgroundColor: "#FFCF50"
}

const valid = {
    backgroundColor: "#FEFAE0"
}