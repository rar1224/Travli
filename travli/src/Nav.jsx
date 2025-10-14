import './Nav.css';
import * as motion from 'motion/react-client'
import {useState} from 'react';

function Nav() {
const [tripView, setTripView] = useState(-1);

function handleChangeView() {
    setTripView(-tripView);
    console.log(tripView);
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
            <div>Filter</div>
            <div>Sort</div>
            <div>Add</div>
        </div>
    );
}

export default Nav;