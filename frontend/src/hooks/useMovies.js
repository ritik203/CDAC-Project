import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../services/apiMovies";


export function useMovies(key, type) {
    const {data, isLoading, error } = useQuery({
        queryKey : [key],
        queryFn : () => getMovies(type),
    });

    return { data, isLoading, error };
}