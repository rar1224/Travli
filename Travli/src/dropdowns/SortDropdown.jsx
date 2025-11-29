import { transform } from 'motion';
import './FilterDropdown.css';
import { useState } from 'react';

function SortButton({title, name, isActive, descending, handleChangeSort}) {
    return (
        <div className='filter-element' data-name={name} onClick={handleChangeSort}
            style={isActive ? active : inactive}>
            {isActive && <img className='icon' src='/arrow.png' style={descending ? regular: flip}/>}
            <label style={isActive ? active : inactive}>{title}</label>
        </div>
    );
}

function SortDropdown({passSorting}) {
    const [activeSort, setActiveSort] = useState('');
    const [descending, setDescending] = useState(true);

    function changeActiveSort(e) {
        let name = e.currentTarget.dataset.name || e.target.name;
        if (activeSort == name) {
            if (!descending) {
                clearSorting();
            } else {
                setDescending(false);
                passSorting(activeSort, false);
            }
        } else {
            setActiveSort(name);
            setDescending(true);
            passSorting(name, true);
        }
    }

    function clearSorting() {
        setActiveSort('');
        setDescending(true);
        passSorting('', true);
    }

    return(
        <div className='filter-container'>
            <SortButton title='Name' name='name' isActive={activeSort == 'name'} descending={descending} handleChangeSort={changeActiveSort}/>
            <SortButton title='Destination' name='destination' isActive={activeSort == 'destination'} descending={descending} handleChangeSort={changeActiveSort}/>
            <SortButton title='Start date' name='startDate' isActive={activeSort == 'startDate'} descending={descending} handleChangeSort={changeActiveSort}/>
            <SortButton title='End date' name='endDate' isActive={activeSort == 'endDate'} descending={descending} handleChangeSort={changeActiveSort}/>
            <SortButton title='Notes' name='notes' isActive={activeSort == 'notes'} descending={descending} handleChangeSort={changeActiveSort}/>
            <button className='clear-button' onClick={clearSorting}>Clear sorting</button>
        </div>
    );
}

export default SortDropdown;

const active = {
    borderColor: "#FEFAE0",
    color: "#FEFAE0"
}

const inactive = {
    borderColor: "#A4B465",
    color: "#A4B465"
}

const regular = {
    transform: "scaleY(1)"
}

const flip = {
    transform: "scaleY(-1)"
}