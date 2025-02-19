import { urls } from "../utils/helpers";

export async function fetchCityData(cityname) {
    try {
        const response = await fetch(`${urls.base}/city/${cityname}`);
        if(!response.ok)
            throw new Error("couldn't get city data");
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
    }
}