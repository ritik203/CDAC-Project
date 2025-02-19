import { useSelector } from "react-redux";
import MovieLayout from "../UI/MovieLayout";

function Home() {
    
    return (
        <div className="w-full">
            <div className="mx-auto w-4/5 px-4 mt-6 mb-3">
                <img src="/images/ad-board-1.png" alt="board 1" className="rounded-md" />
            </div>

            <div className="mx-auto w-4/5">
            <p className="text-2xl font-bold mt-4 ml-5 text-slate-700">Recommended Movies</p>
            </div>

            <MovieLayout keyword="recent-release-movies" type="top-box-office-movies" />

            <div className="mx-auto w-4/5 px-4 mt-10 mb-3">
                <img src="/images/ad-board-2.png" alt="board 1" className="rounded-md" />
            </div>
        </div>
    )
}

export default Home
