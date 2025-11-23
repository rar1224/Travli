import { use, useState } from 'react';
import './AddOverlay.css';
import axios from 'axios';

const emptyTrip = {
            name: "",
            image: "",
            destination: "",
            startDate: "",
            endDate: "",
            notes: ""
};

function AddOverlay({closeAddOverlay}) {
    const [trip, setTrip] = useState(emptyTrip);

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
            } else {
                return true;
            }
    }

    function handleCloseAddOverlay() {
        closeAddOverlay();
    }

    function handleChange(e) {
        setTrip({...trip, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        try {
            await axios.post('http://localhost:3001/trips', trip);
            alert("Trip added!");
            setTrip(emptyTrip);
        } catch(error) {
            console.error('There was an error adding the trip!', error);
        }
    }

    function validateAndSubmit(e) {
        if (validateForm()) {
            handleSubmit(e);
            closeAddOverlay();
        }
    }

    return (
        <>
            <div className='window'>
                <h2>Add new trip</h2>
                <form>
                    <label>Name:<input className="text-input" type="text" value={trip.name} name="name"
                    style={nameStyle} onChange={handleChange}/></label>

                    <label>Image:<input className="text-input" type="text" value={trip.image} name="image"
                    onChange={handleChange}/>
                    <br/> <img src={trip.image == "" ? null : trip.image}/>
                    </label>

                    <label>Destination:<input className="text-input" type="text" value={trip.destination} name="destination"
                    style={destStyle} onChange={handleChange}/></label>

                    <label>Start date:<input className="date-input" type="date" value={trip.startDate} name="startDate"
                    style={startDateStyle} onChange={handleChange}/>
                    End date:<input className="date-input" type="date" value={trip.endDate} name="endDate"
                    style={endDateStyle} onChange={handleChange}/></label>

                    <label>Notes: <br/>
                    <textarea value={trip.notes} onChange={handleChange} name="notes"/></label>

                    <div className='button-container'>
                    <button type="button" onClick={validateAndSubmit}>Submit</button>
                    <button type="button" onClick={handleCloseAddOverlay}>Cancel</button>
                    </div>
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