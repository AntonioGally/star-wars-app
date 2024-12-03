import { swapiInstance } from "@/api/config/instance";
import { useQuery } from "@tanstack/react-query";
import { Starship } from "./types";

async function getStarshipsByName(starshipName: string): Promise<Starship[]> {
    const { data } = await swapiInstance.get(`/starships?search=${starshipName}`);
    return data.results;
}

export const useGetStarshipsByName = (starshipName: string) => {
    return useQuery({
        queryKey: ['starship', starshipName],
        queryFn: () => getStarshipsByName(starshipName),
        enabled: !!starshipName,
        staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
    })
}