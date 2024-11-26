/* eslint-disable react/prop-types */

import {useEffect, useState} from "react";
import Label from "./Label.jsx";
import {FetchBooking} from "../../Services/BookingService.js";
import {GetAllCity} from "../../Services/LoadCitys.js";

function SelectCity({city, setCity, label}) {

    const [citys, setCitys] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await GetAllCity();
                setCitys(response);
            } catch (err) {
                console.error("Error fetching booking:", err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {label && (<Label Name={label}/>)}
            <select
                className="allcity mb-4 px-4 py-2 border rounded w-full text-white"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            >
                <option value="" disabled>
                    Select a city
                </option>
                {citys.map((city) => (
                    <option key={city.id} value={city.name}>
                        {city.name}
                    </option>
                ))}
            </select>
        </>
    )
}

export default SelectCity;