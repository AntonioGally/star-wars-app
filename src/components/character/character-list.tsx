import React from "react";
import { useGetCharacter } from "@/api";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import CharacterCard from "./character-card";
import { Button } from "../ui/button";
import { LoadingState } from "./loading-state";

const CharacterList = () => {
    const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useGetCharacter(searchTerm);

    if (status === 'pending') return <LoadingState />;
    if (status === 'error' && error instanceof Error)
        return <p className="mt-4">Error: {error.message}</p>;

    return (
        <div className="max-w-[1370px] mx-auto mt-14">
            <div className="flex flex-wrap gap-x-4 gap-y-4 md:justify-start justify-center">
                {data?.pages.map((page, index) => (
                    <React.Fragment key={index}>
                        {page.results.map((character) => (
                            <CharacterCard
                                key={character.name}
                                birth_year={character.birth_year}
                                vehicles={character.vehicles}
                                starships={character.starships}
                                name={character.name}
                                mass={character.mass}
                                height={character.height}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <div className="w-full flex justify-end mt-3">
                {hasNextPage && !searchTerm && (
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default CharacterList;