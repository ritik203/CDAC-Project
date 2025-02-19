import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { getSearchMovies } from "../services/apiMovies";
import SearchModal from "./SearchModal";

function Searchbar() {
    const [searchInput, setSearchInput] = useState("");
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    function handleSearchModal() {
        setIsOpen((isOpen) => !isOpen);
    }

    function handleSearch() {
        if(searchInput.trim !==  "") {
            setQuery(searchInput);
        }
    }

    useEffect(() => {
        async function getMovies() {
            if(!query) return;

            try {
                const result = await getSearchMovies(query);
                setMovies(result.results);
                setSearchInput("");
                setQuery("");
                handleSearchModal();
            }
            catch(error) {
                console.log("failed to get movies");
            }
        }

        getMovies();
    }, [query]);

    return (
        <>
        <div className="relative">
            <input type="text" placeholder="Search movies, series, events and more" value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-[600px] border border-slate-300 rounded-sm py-1 px-4 bg-slate-50" />

            <div className="absolute right-2 top-[12%] p-1 cursor-pointer"
            onClick={handleSearch}>
                <FaMagnifyingGlass className="font-extrabold text-xl text-slate-500" />
            </div>
        </div>

        {
            movies?.length > 0 && isOpen && <SearchModal movies={movies} handleSearchModal={handleSearchModal} />
        }
        </>
    )
}

export default Searchbar
