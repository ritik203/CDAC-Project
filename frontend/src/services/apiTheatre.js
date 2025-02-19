import { getCurrentDate, urls } from "../utils/helpers";


export async function fetchTheatreByCity(cityId) {
    try {
        const response = await fetch(`${urls.base}/theatre/${cityId}`);
        if(!response.ok) {
            throw new Error("Failed to get theatres!")
        }

        const result = await response.json();

        return result.data;
    }
    catch(error) {
        console.log(error);
        return error;
    }
}

export async function fetchShows(theatre_name, movie_title) {
    try {
        const queryParams = new URLSearchParams({
            movieName: movie_title,
            theatreName: theatre_name,
            showDate: getCurrentDate(),
        }).toString();

        console.log(queryParams);

        const response = await fetch(`${urls.base}/movie/show?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get theatres!");
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching shows:", error);
        return null;
    }
}
