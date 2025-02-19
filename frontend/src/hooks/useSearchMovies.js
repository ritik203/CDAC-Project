import { useQuery } from "@tanstack/react-query";
import { getSearchMovies } from "../services/apiMovies";

export function useSearchMovies(key, searchedText) {
    const { data, isLoading, error } = useQuery({
        queryKey: [key, searchedText],
        queryFn: () => (searchedText ? getSearchMovies(searchedText) : null),
        enabled: !!searchedText,
    });

    return { data, isLoading, error };
}