import { useState } from "react";
import MovieRender from "./MovieRender";

function SearchModal({ movies, handleSearchModal }) {
    return (
        <>
            <div onClick={handleSearchModal} className="fixed inset-0 bg-slate-700 opacity-70 backdrop-blur-sm z-10"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 border rounded-lg 
                        w-[628px] h-[500px] overflow-y-scroll z-10 p-8 flex items-center justify-start flex-col">
                {
                    movies.map((item, index) => {
                        if(movies.length > 5) {
                            if(index > 5) return;

                            return <MovieRender movie={item} />;
                        }
                        else return <MovieRender movie={item} />;
                    })
                }
            </div>   
        </>
    )
}

export default SearchModal;
