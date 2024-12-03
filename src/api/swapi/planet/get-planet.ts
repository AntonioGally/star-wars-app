import { swapiInstance } from "@/api/config/instance";
import { useQuery } from "@tanstack/react-query";

interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[]; // Array of URLs to residents
    films: string[]; // Array of URLs to films
    created: string; // ISO date string
    edited: string; // ISO date string
    url: string; // URL to the planet's resource
}

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