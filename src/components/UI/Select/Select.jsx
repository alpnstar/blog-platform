import React from 'react'

const Select = ({ value, options, defaultValue, onChange }) => {
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
            name=""
            id="">
            <option disabled={true} value="">{defaultValue}</option>
            {options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
        </select>
    )
}
export default Select;