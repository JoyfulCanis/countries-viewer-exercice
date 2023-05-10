import React from 'react';
import axios from "axios"
import { useEffect, useState } from 'react';
import Card from './Card';

// AXIOS POUR FETCH RAPIDEMENT
const Countries = () => {
    const [data, setData] = useState([])
    const [rangeValue, setRangeValue] = useState(36)
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"]
    const [selectedContinent, setSelectedContinent] = useState("")
    // le useEffect se joue lorsque le composant est monté
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((res) => setData(res.data))
    }, [])

    return (
        <div className='countries'>
            <ul className='radio-container'>
                <span>{rangeValue}</span>
                <input
                    type="range" min="1" max="250"
                    defaultValue={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)}
                />

                {radios.map((continent) =>
                    <li>
                        <input type="radio"
                        id={continent}
                        name="selected-continent"
                        checked={continent === selectedContinent}
                        onChange={(e) => setSelectedContinent(e.target.id)}/>
                        <label htmlFor={continent}>{continent}</label>
                    </li>
                )}


            </ul>
            {selectedContinent && (
                <button onClick={() => setSelectedContinent("")}>Cancel</button>
            )}
            <ul>
                {
                    data
                    .filter((country) => country.continents[0].includes(selectedContinent))
                    .sort((a, b) => b.population - a.population)
                    .slice(0, rangeValue)
                    .map((country, index) => (
                    <Card key={index} country={country} />
                        )
                    )
                }
            </ul>
        </div>
    );
};

export default Countries;