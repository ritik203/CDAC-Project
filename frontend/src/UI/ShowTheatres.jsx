import { useEffect, useState } from "react";
import { fetchShows, fetchTheatreByCity } from "../services/apiTheatre";
import { useSelector } from "react-redux";
import { useTheatres } from "../hooks/useTheatres";
import toast from "react-hot-toast";

function ShowTheatres({ movieTitle }) {
    const [theatres, setTheatres] = useState([]);
    const [shows, setShows] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState("");
    const city = useSelector(state => state.city);

    useEffect(() => {
        async function fetchTheatre() {
            if(!city.city_id) return;

            const result = await fetchTheatreByCity(city.city_id);
            setTheatres(result);
        }

        fetchTheatre();
    }, [city]);

    useEffect(() => {
        async function getShows() {
            if(isSelected === false) return;

            const result = await fetchShows(movieTitle, selectedTheatre);
            console.log(result);
            setShows(result);
        }

        getShows();
    }, [isSelected]);


    function handleTheatreClick(theatre) {
        console.log(theatre);
        setSelectedTheatre(theatre.name);
        setIsSelected(true);
    }

    return (
        <div className="w-full">
            {
                !city.city_id &&
                <div className="flex items-center justify-center mt-10 w-full">
                    <p className="text-3xl font-bold">Please enter the city!</p>
                </div>
            }
            <div className="flex items-center justify-center gap-10 w-full">   
                {
                    theatres.length === 0 ? "" :
                    theatres.map((item, index) => {
                        return (
                            <div key={item.theatre_id} onClick={() => handleTheatreClick(item)}
                            className="my-5 hover:bg-stone-200 hover:cursor-pointer p-4 rounded-sm">
                                <h2 className="font-semibold text-xl my-2">{item.name}</h2>
                                <p className="my-2">{city.name}</p>
                            </div>
                        );
                    })
                }
            </div>

            <div className="flex items-center justify-center gap-10 w-full">   
                {
                    shows.length === 0 ? 
                    (isSelected ? <p className="text-center">Shows not Avaliable</p> : <p className="text-center">Please select the theatre</p> )
                    :
                    shows.map((item, index) => {
                        return (
                            {/* <div className="flex justify-center items-center gap-6 my-2">
                                    <button onClick={() => onClickTheatre(item, "12 pm : 3 pm")}
                                    className="px-4 py-1 outline-none rounded-sm text-sm font-medium text-stone-500 border border-stone-400 hover:bg-stone-50 hover:text-stone-600 hover:border-stone-500 cursor-pointer">
                                        12 pm : 3 pm
                                    </button>

                                    <button onClick={() => onClickTheatre(item, "3 pm : 6 pm")}
                                    className="px-4 py-1 outline-none rounded-sm text-sm font-medium text-stone-500 border border-stone-400 hover:bg-stone-50 hover:text-stone-600 hover:border-stone-500 cursor-pointer">
                                        3 pm : 6 pm
                                    </button>

                                    <button onClick={() => onClickTheatre(item, "6 pm : 9 pm")}
                                    className="px-4 py-1 outline-none rounded-sm text-sm font-medium text-stone-500 border border-stone-400 hover:bg-stone-50 hover:text-stone-600 hover:border-stone-500 cursor-pointer">
                                        6 pm : 9 pm
                                    </button>

                                    <button onClick={() => onClickTheatre(item, "9 pm : 12 am")}
                                    className="px-4 py-1 outline-none rounded-sm text-sm font-medium text-stone-500 border border-stone-400 hover:bg-stone-50 hover:text-stone-600 hover:border-stone-500 cursor-pointer">
                                        9 pm : 12 am
                                    </button>
                                </div> */}
                        );
                    })
                }
            </div>
        </div>
    )
}

export default ShowTheatres
