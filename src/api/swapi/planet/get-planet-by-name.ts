import { swapiInstance } from "@/api/config/instance";
import { Planet } from "./types";
import { useQuery } from "@tanstack/react-query";

async function fetchPlanetByName(planetName: string): Promise<Planet[]> {
    const { data } = await swapiInstance.get(`/planets?search=${planetName}`);
    return data.results;
}

export const useGetPlanetByName = (planetName: string) => {
    return useQuery({
        queryKey: ['planet', planetName],
        queryFn: () => fetchPlanetByName(planetName),
        enabled: !!planetName,
        staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
    })
}