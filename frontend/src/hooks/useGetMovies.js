import { useQuery } from "@tanstack/react-query";
import { getMovieByName, storeNewMovie } from "../services/apiMovies";



export function useGetMovies(key, movieTitle) {
    const { data, isLoading, error } = useQuery({
        queryKey: [key, movieTitle],
        queryFn: () => (movieTitle ? getMovieByName(movieTitle) : Promise.resolve(null)),
        enabled: !!movieTitle,
    });

    return { data, isLoading, error };
}