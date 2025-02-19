import { useLocation } from "react-router";

function Movies() {
    const location = useLocation();
    const movie = location.state?.movie;

    if(!movie.poster_path) return;

    console.log(movie);
    return (
        <>
        <div className="w-full flex m-auto justify-center items-center">
            <div className="w-4/5 flex justify-start items-start gap-4 flex-col">
                <div className=" flex justify-start items-start gap-32 mt-10">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-[180px] h-[270px]" />
                    <div className="py-4">
                        <h1 className="text-4xl font-bold text-slate-700">{movie.title}</h1>
                        <p className="mt-5">{movie.overview}</p>

                        <p className="mt-4 font-semibold">Release Date : {movie.release_date}</p>

                        <p className="mt-4 font-semibold">Average Rating : {movie.vote_average}</p>
                    </div>
                </div>
                <hr className="w-full" />
                <div className="">
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default Movies;
