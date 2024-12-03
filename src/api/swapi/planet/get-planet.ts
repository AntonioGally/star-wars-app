import { swapiInstance } from "@/api/config/instance";
import { useQuery } from "@tanstack/react-query";
import { Planet } from "./types";

async function fetchPlanet(planetId: number): Promise<Planet> {
    const { data } = await swapiInstance.get(`/planets/${planetId}`);
    return data;
}

export const useGetPlanet = (planetId: number) => {
    return useQuery({
        queryKey: ['planet', planetId],
        queryFn: () => fetchPlanet(planetId),
        enabled: !!planetId,
        staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
    })
}