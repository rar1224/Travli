import './Nav.css';
import * as motion from 'motion/react-client'
import {useState} from 'react';

function Nav({openAddOverlay}) {
const [tripView, setTripView] = useState(-1);
const [organizeView, setOrganizeView] = useState(0);

function handleChangeView() {
    setTripView(-tripView);
}

function handleOrganizeView(i) {
    if (organizeView == i) setOrganizeView(0);
    else setOrganizeView(i);
}

function handleOpenAddOverlay() {
    openAddOverlay();
}

    return (
        <div className='navigation'>
            <div className='view-toggle'>
                <span>List</span>
                <button className='toggle' onClick={handleChangeView} style={{justifyContent: 'flex-' + (tripView > 0 ? 'start' : 'end')}}>
                    <motion.span className='toggle-ball' layout transition={{type: 'spring', visualDuration: 0.2, bounce: 0.2}}/>
                </button>
                <span>Grid</span>
            </div>
            <motion.button className='organize-button' onClick={() => handleOrganizeView(1)} style={organizeView == 1 ? enabled : disabled}>
                Filter
            </motion.button>
            <motion.button className='organize-button' onClick={() => handleOrganizeView(2)} style={organizeView == 2 ? enabled : disabled}>
                Sort
            </motion.button>
            <motion.button className='organize-button' onClick={handleOpenAddOverlay}>
                Add
            </motion.button>
        </div>
    );
}

export default Nav;

const disabled = {
    backgroundColor: "#FEFAE0",
    color: "#626F47",
    borderStyle: "solid",
    borderColor: "#626F47"
}

const enabled = {
    backgroundColor: "#A4B465",
    color: "#FEFAE0"
}