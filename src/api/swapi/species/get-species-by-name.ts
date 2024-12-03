import { swapiInstance } from "@/api/config/instance";
import { Species } from "./types";
import { useQuery } from "@tanstack/react-query";

async function fetchSpeciesByName(name: string): Promise<Species[]> {
    const { data } = await swapiInstance.get(`/species?search=${name}`);
    return data.results;
}

export const useGetSpeciesByName = (name: string) => {
    return useQuery({
        queryKey: ['species', name],
        queryFn: () => fetchSpeciesByName(name),
        enabled: !!name,
        staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
    })
}