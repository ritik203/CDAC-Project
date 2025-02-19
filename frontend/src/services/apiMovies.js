import { API_KEY, getGenreById, urls } from "../utils/helpers";


export async function getMovies() {
    try {
        const response = await fetch(`${urls.tmdb}/movie/now_playing`, {
            params: { language: 'en-US', page: '1' },
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            }
        });
        const result = await response.json();
        return result;
    }
    
    catch(err) {
        console.log(err);
        throw new Error("Failed to get movies!");
    }

}


export async function getSearchMovies(searchedText) {
    const url = `${urls.tmdb}/search/movie?query=${searchedText}&include_adult=false&language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error("Error fetching search movies:", err);
        return null;
    }
}

export async function storeNewMovie(movie) {
    if (!movie) return;

    const movieDetails = {
        movie_name: movie.title,
        description: movie.overview.substring(0, 40),
        duration: "2 : 20",
        genre: getGenreById(movie.genre_ids[0]),
        release_date: movie.release_date,
        language: movie.original_language === "en" ? "English" : "Other"
    };

    try {
        const movieResult = await getMovieByName(movie.title);

        if (movieResult.data.length > 0) {
            return movieResult;
        }

        const response = await fetch(`${urls.base}/movie/addmovie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieDetails),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error while storing movie:", error);
        return null;
    }
}



export async function getMovieByName(name) {
    try {
        const response = await fetch(`${urls.base}/movie/moviename/${name}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result.data[0];
    }
    catch(error) {
        console.log("Error while geting the movie data : ", err);
        return null;
    }
}


// export async function getSearchMovies(searchedText) {
//     const url = 'https://moviesverse1.p.rapidapi.com/search-movies';
//     const options = {
//         method: 'POST',
//         headers: {
//             'x-rapidapi-key': '1b14fa7170msh32c58dfd1efd306p15fddfjsn7322b46aa31c',
//             'x-rapidapi-host': 'moviesverse1.p.rapidapi.com',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ query: searchedText })
//     };

//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         return result;
//     } catch (error) {
//         console.error(error);
//         throw new Error("Failed to get movies!");
//     }
// }



// export async function getMovies(type) {
//     const { url, options } = movieCredentials(type);

//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         return result;
//     }
    
//     catch(err) {
//         console.log(err);
//         throw new Error("Failed to get movies!");
//     }

// }


