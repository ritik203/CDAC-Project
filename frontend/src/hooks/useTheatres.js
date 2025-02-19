import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../services/apiMovies";
import { useSelector } from "react-redux";
import { fetchTheatreByCity } from "../services/apiTheatre";


export function useTheatres(key) {
    const city_id = useSelector(state => state.city.city_id);

    if(!city_id) {
        return { data : [], isLoading : false, error : "please enter the city" }
    }

    const {data, isLoading, error } = useQuery({
        queryKey : [key],
        queryFn : () => fetchTheatreByCity(city_id),
    });

    return { data, isLoading, error };
}