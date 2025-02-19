// export function movieCredentials(type) {
//     const url = `https://moviesverse1.p.rapidapi.com/${type}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'x-rapidapi-key': '1b14fa7170msh32c58dfd1efd306p15fddfjsn7322b46aa31c',
//             'x-rapidapi-host': 'moviesverse1.p.rapidapi.com'
//         }
//     };

//     return { url, options };
// }

export const getCurrentDate = () => new Date().toISOString().split('T')[0];


export const urls = {
    base : "http://localhost:4545",
    tmdb : "https://api.themoviedb.org/3",
}



export const API_KEY = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTA5MWRiMWU5NDBiMWQ3ZDY2MWU3NDA4NWQ5ZjgxNiIsIm5iZiI6MTczODU0ODk5MS40MTIsInN1YiI6IjY3YTAyNmZmMDRjYjZmNDFiOWNiN2Y1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n1odaliRZ4kGKlWfCdwXQgOVGs6yG1QTfGjlveAUa9s`;


const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

export function getGenreById(id) {
    return genres[id];
}