// Components
import CharacterCard from "../character-card/character-card";
import { Button } from "../../ui/button";
import { LoadingState } from "../loading-state/loading-state";
// Hooks
import useListData from "./hooks/use-list-data";

const CharacterList = () => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useListData();

    if (status === 'pending') return <LoadingState />;
    if (status === 'error' && error instanceof Error)
        return <p className="mt-4">Error: {error.message}</p>;

    return (
        <div className="mt-14">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-y-4">
                {data?.map((character) => (
                    <div className="flex justify-center">
                        <CharacterCard
                            key={character.name}
                            birth_year={character.birth_year}
                            vehicles={character.vehicles}
                            starships={character.starships}
                            name={character.name}
                            mass={character.mass}
                            height={character.height}
                        />
                    </div>
                ))}
            </div>
            <div className="w-full flex justify-center md:justify-end mt-3">
                {hasNextPage && (
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