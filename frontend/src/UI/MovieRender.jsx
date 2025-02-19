import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { saveMovie } from "../features/movieSlice";

function MovieRender({ movie }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data : movieData, isLoading } = useStoreMovies("store-movie", movie);
    if(movie.poster_path === undefined) return;

    function handleClick() {
        dispatch(saveMovie(movieData.data));
        navigate("movies", { state : { movie } });
    }

    return (
        <>
        <div className="w-full flex justify-start items-start gap-6 cursor-pointer hover:bg-slate-200" onClick={handleClick}>
            <div className="p-2">
            {movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="h-28 w-20"/> : <p>image not found</p> }
                
            </div>
            <div className="p-2">
                <h2 className="text-2xl font-semibold">{movie?.title}</h2>
                <p className="">{movie?.release_date}</p>
            </div>
        </div>
        <hr className="px-4 w-full" />
        </>
    )
}

export default MovieRender;
