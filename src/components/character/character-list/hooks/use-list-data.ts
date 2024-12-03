import { useGetCharacter, useGetPlanetByName, useGetSpeciesByName, useGetStarshipsByName } from "@/api";
import { RootState } from "@/store";
import { useMemo } from "react"
import { useSelector } from "react-redux";

const useListData = () => {
    const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
    const { homeworld, species, starships } = useSelector((state: RootState) => state.filter.filters);

    const { data: planetsData } = useGetPlanetByName(homeworld);
    const { data: speciesData } = useGetSpeciesByName(species);
    const { data: starshipsData } = useGetStarshipsByName(starships);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useGetCharacter(searchTerm);


    const getData = useMemo(() => {
        if (status === 'pending') return;
        if (status === 'error' && error instanceof Error) return;

        return data?.pages.flatMap((page) => page.results);
    }, [data, error, status]);


    const getFilteredData = useMemo(() => {
        if (!getData) return;

        return getData.filter((character) => {
            if (homeworld && planetsData) {
                return planetsData.filter((planet) => planet.url === character.homeworld).length > 0;
            }

            if (species && speciesData) {
                return speciesData.filter((specie) => character.species.includes(specie.url)).length > 0;
            }

            if (starships && starshipsData) {
                return starshipsData.filter((starship) => character.starships.includes(starship.url)).length > 0;
            }


            return true;
        });
    }, [getData, homeworld, planetsData, species, speciesData, starships, starshipsData]);

    return {
        data: getFilteredData,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    }

}

export default useListData;