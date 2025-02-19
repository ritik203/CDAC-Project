import { useRef } from "react";
import { useMovies } from "../hooks/useMovies"
import Loader from "./Loader";
import MoviePoster from "./MoviePoster";
import Slider from "react-slick";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";



function MovieLayout({ keyword, type }) {
    const { data: movieList , isLoading } = useMovies(keyword, type);
    const sliderRef = useRef(null);
    console.log(movieList);
    if(isLoading) {
        return <Loader />
    }

    const settings = {
        dots: true,
        arrows: true,
        infinite: movieList.results.length > 5,
        speed: 500,
        slidesToShow: Math.min(movieList.results.length, 5),
        slidesToScroll: 5,
    };

    return (
        <div className="relative w-full">

            {/* Custom Navigation Buttons */}
            <button
                className="absolute left-[100px] top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full z-9 hover:cursor-pointer"
                onClick={() => sliderRef.current?.slickPrev()} // Go to previous slide
            >
                <FaAngleLeft className="text-3xl font-bold" />
            </button>

            <div className="slider-container mx-auto w-4/5 gap-4">
                <Slider ref={sliderRef} {...settings}>
                    {movieList.results.map((item) => (
                        <MoviePoster key={item.poster_path} movie={item} />
                    ))}
                </Slider>
            </div>

            <button
                className="absolute right-[100px] top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full z-9 hover:cursor-pointer"
                onClick={() => sliderRef.current?.slickNext()} // Go to next slide
            >
                <FaAngleRight className="text-3xl font-bold" />
            </button>
        </div>
    )
}

export default MovieLayout

