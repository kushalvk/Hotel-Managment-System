/* eslint-disable react/prop-types */

import {useEffect, useState} from "react";
import Label from "./Label.jsx";

function SelectCity({city, setCity, label}) {

    const [citys, setCitys] = useState([]);

    useEffect(() => {
        const config = {
            cUrl: "https://api.countrystatecity.in/v1/countries/IN/states/GJ/cities",
            ckey: "QWFqZnRBUGVpVVpFOGZhcHhCRko4cFdRdFFRakhVWkpmb0MwcjhGag==", // this key sent in email
        };

        async function loadCities() {
            try {
                const response = await fetch(config.cUrl, {
                    headers: {
                        "X-CSCAPI-KEY": config.ckey,
                    },
                });
                const data = await response.json();
                setCitys(data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        }

        loadCities();
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