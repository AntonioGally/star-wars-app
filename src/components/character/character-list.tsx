import { useGetCharacter } from "@/api";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import CharacterCard from "./character-card";
import { Button } from "../ui/button";

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

    if (status === 'pending') return <p>Loading...</p>;
    if (status === 'error' && error instanceof Error)
        return <p>Error: {error.message}</p>;

    return (
        <div className="flex flex-wrap gap-x-3 gap-y-2 mt-10">
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
            {hasNextPage && (
                <Button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="bg-[#0F172A] text-white px-4 py-2 rounded mt-4"
                >
                    {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                </Button>
            )}
        </div>
    )
}

export default CharacterList;