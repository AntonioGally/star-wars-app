import { ListFilter } from "lucide-react";
import { debounce } from 'lodash';
import { Button } from "../ui/button";
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { setSearchTerm } from "@/store/slices/filterSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const FilterArea = () => {
    const dispatch = useDispatch();
    const handleSearch = useCallback(
        debounce((query: string) => {
            dispatch(setSearchTerm(query));
        }, 300),
        []
    );

    return (
        <form className="flex flex-col max-w-[550px] w-full mt-6">
            <Label className="mb-1">Search by the name</Label>
            <div className="flex flex-col md:flex-row md:items-center">
                <Input autoFocus type="text" onChange={(e) => handleSearch(e.target.value)} />
                <div className="flex mt-2 md:mt-0 items-center">
                    <Button className="ml-3" variant={'outline'}><ListFilter />Filters</Button>
                </div>
            </div>
        </form>
    )
}

export default FilterArea;