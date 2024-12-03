import { swapiInstance } from "@/api/config/instance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Character } from "./types";

interface PeopleResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
}

const fetchPeople = async (page: number, search?: string): Promise<PeopleResponse> => {
    const { data } = await swapiInstance.get('/people', {
        params: { page, search },
    });
    return data;
};

export const useGetCharacter = (searchTerm?: string) => {
    return useInfiniteQuery({
        queryKey: ['people', searchTerm],
        queryFn: ({ pageParam = 1 }) => fetchPeople(pageParam, searchTerm),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            const url = new URL(lastPage.next);
            const pageParam = url.searchParams.get('page');
            return pageParam ? Number(pageParam) : undefined;
        },
        staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
    })
}