
const config = {
    cUrl: "https://api.countrystatecity.in/v1/countries/IN/states/GJ/cities",
    ckey: `${import.meta.env.VITE_REACT_APP_CITY_KEY}`, // this key sent in email
};

export const GetAllCity = async () => {
    try {
        const response = await fetch(config.cUrl, {
            headers: {
                "X-CSCAPI-KEY": config.ckey,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching cities:", error);
    }
}