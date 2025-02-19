import { useNavigate } from "react-router";

function MoviePoster({ movie }) {
    const navigate = useNavigate();


    if(!movie) return;

    function OnMovieClick() {
        navigate("/movie", { state : { movie } });
    }

    return (
        <div className="mx-2 hover:cursor-pointer" onClick={OnMovieClick}>
            <img src={ `https://image.tmdb.org/t/p/w500${movie.poster_path}` } alt={movie.title}
            className="w-[180] h-[370px] rounded-md" />
            <p className="font-semibold ml-1 text-slate-800">{movie.title}</p>
            {/* <p className="font-semibold ml-1 text-xs text-slate-700">IMDB : {movie.imdbRating}</p> */}
        </div>
    );
}

export default MoviePoster;
