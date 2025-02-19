import { useDispatch } from "react-redux";
import { useLocation } from "react-router"
import { getGenreById } from "../utils/helpers";
import { useGetMovies } from "../hooks/useGetMovies";
import Loader from "../UI/Loader";
import toast from "react-hot-toast";
import { saveMovie } from "../features/movieSlice";
import ShowTheatres from "../UI/ShowTheatres";

function Movie() {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const movie = location.state.movie;

    const { data : movieData, isLoading : isMovieLoading, error : movieError } = useGetMovies("get-movie", movie.title);


    if(isMovieLoading) return <Loader />;
    if(movieError) toast.error("Failed to get movie information");
    if(movieData) dispatch(saveMovie(movieData));

    function onClickTheatre(theatre, time) {
        
    }

    return (
        <div className="w-full flex m-auto justify-center items-center">
            <div className="w-4/5 flex justify-start items-start gap-4 flex-col">
                <div className=" flex justify-start items-start gap-32 mt-10">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-[200px] h-[310px] ml-20" />
                    <div className="py-4">
                        <h1 className="text-4xl font-bold text-slate-700">{movie.title}</h1>
                        <div className="flex items-center justify-start gap-20">
                            <p className="mt-5 font-bold text-xl text-stone-500">{
                                movie.genre_ids.reduce((accumulator, currentValue, currentIndex, array) => { 
                                    if(array.length === 0) {
                                        return;
                                    }

                                    if(array.length - 1 === currentIndex) {
                                        return accumulator + getGenreById(currentValue);
                                    }
                                    return accumulator + getGenreById(currentValue) + ", "
                                }, "")
                            }</p>

                            <p className="mt-5 font-bold text-xl text-stone-500">{
                                movie.adult ? "R rated 18+" : "PG 13"
                            }</p>
                        </div>
                        <p className="mt-5 font-bold text-slate-700">Release date : {movie.release_date}</p>
                        <p className="mt-5 font-bold text-slate-700">Average Rating : {movie.vote_average}</p>
                        <p className="mt-5 font-bold text-slate-700">Language : {movie.original_language === "en" ? "English" : "Other"}</p>
                        <p className="mt-5 font-medium text-slate-600">Overview :  { movie.overview }</p>
                    </div>
                </div>
                <hr className="w-full" />
                <ShowTheatres movieTitle={movie.title} />
            </div>

        </div>
    )
}

export default Movie
