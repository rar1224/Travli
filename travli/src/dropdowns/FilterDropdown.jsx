import './FilterDropdown.css';
import { useState } from 'react';


function TextFilter({name, title, activeFilters, handleChangeFilter, handleChange, values}) {
    return (
        <div className='filter-element' data-name={name} onClick={handleChangeFilter}
            style={activeFilters[name] ? active : inactive}>
            <label style={activeFilters[name] ? active : inactive}>{title}</label>
            {activeFilters[name] && <input type="text" name={name} value={values[name]}
            onChange={handleChange} onClick={(e) => e.stopPropagation()}/>}
        </div>
    );
}

function DateFilter({name, title, activeFilters, handleChangeFilter, handleChange, values, comparison, handleChangeComparison}) {
    return (
        <div className='filter-element' data-name={name} onClick={handleChangeFilter}
            style={activeFilters[name] ? active : inactive}>
            <label style={activeFilters[name] ? active : inactive}>{title}</label>
            {activeFilters[name] &&
                <>
                    <button name={name} onClick={(e) => { handleChangeComparison(e); e.stopPropagation();}}>{comparison[name]}</button>
                    <input type="date" name={name} value={values[name]}
                    onChange={handleChange} onClick={(e) => e.stopPropagation()}/>
                </>}
        </div>
    );
}

function FilterDropdown({passFilters}) {
    const [activeFilters, setActiveFilters] = useState({
        name: true,
        destination: true,
        startDate: false,
        endDate: false,
        notes: false
    });

    const [values, setValues] = useState({
        name: "",
        destination: "",
        startDate: "",
        endDate: "",
        notes: ""
    });

    const [comparison, setComparison] = useState({
        startDate: "=",
        endDate: "="
    })
    
    function handleChangeFilter(e) {
        let name = e.currentTarget.dataset.name || e.target.name;
        setActiveFilters({...activeFilters, [name] : !activeFilters[name]});
    }

    function handleChange(e) {
        setValues({...values, [e.target.name] : e.target.value});
    }

    function handleChangeComparison(e) {
        let current = comparison[e.target.name];
        let next;

        if (current == '=') next = 'before';
        else if (current == 'before') next = 'after';
        else next = '='

        setComparison({...comparison, [e.target.name] : next});
    }

    return(
        <div className='filter-container'>
            <TextFilter name="name" title="Name" activeFilters={activeFilters} handleChangeFilter={handleChangeFilter} handleChange={handleChange} values={values}/>
            <TextFilter name="destination" title="Destination" activeFilters={activeFilters} handleChangeFilter={handleChangeFilter} handleChange={handleChange} values={values}/>
            <DateFilter name="startDate" title="Start date" activeFilters={activeFilters} handleChangeFilter={handleChangeFilter}
            handleChange={handleChange} values={values} comparison={comparison} handleChangeComparison={handleChangeComparison}/>
            <DateFilter name="endDate" title="End date" activeFilters={activeFilters} handleChangeFilter={handleChangeFilter}
            handleChange={handleChange} values={values} comparison={comparison} handleChangeComparison={handleChangeComparison}/>
            <TextFilter name="notes" title="Notes" activeFilters={activeFilters} handleChangeFilter={handleChangeFilter} handleChange={handleChange} values={values}/>
            <button className='clear-button' onClick={(e) => passFilters(activeFilters, values, comparison)}>Apply filters</button>
            <button className='clear-button'>Clear filters</button>
        </div>
    );
}

export default FilterDropdown;

const active = {
    borderColor: "#FEFAE0",
    color: "#FEFAE0"
}

const inactive = {
    borderColor: "#A4B465",
    color: "#A4B465"
}