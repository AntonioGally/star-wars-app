// Libs
import { useSelector } from "react-redux";
// Icons
import { ListFilter } from "lucide-react";
// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
// Redux
import { setHomeworld, setSearchTerm, setSpecies, setStarships } from "@/store/slices/filterSlice";
// Types
import { RootState } from "@/store";
import useSearch from './hooks/use-search';

const FilterArea = () => {
    const { homeworld, species, starships } = useSelector((state: RootState) => state.filter.filters);

    const { handleSearch } = useSearch();

    return (
        <div className="flex flex-col max-w-[550px] w-full mt-6">
            <Label data-testid="search-label" className="mb-1">Search by the name</Label>
            <div className="flex flex-col md:flex-row md:items-center">
                <Input autoFocus data-testid='search-name-input' type="text" onChange={(e) => handleSearch(e.target.value, setSearchTerm)} />
                <div className="flex mt-2 md:mt-0 items-center">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button data-testid='filters-button' className="ml-3" variant={'outline'}><ListFilter />Filters</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="width">Homeworld</Label>
                                        <Input
                                            defaultValue={homeworld}
                                            onChange={(e) => handleSearch(e.target.value, setHomeworld)}
                                            className="col-span-2 h-8"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="maxWidth">Starships</Label>
                                        <Input
                                            defaultValue={starships}
                                            onChange={(e) => handleSearch(e.target.value, setStarships)}
                                            className="col-span-2 h-8"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="height">Species</Label>
                                        <Input
                                            defaultValue={species}
                                            onChange={(e) => handleSearch(e.target.value, setSpecies)}
                                            className="col-span-2 h-8"
                                        />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                </div>
            </div>
        </div>
    )
}

export default FilterArea;