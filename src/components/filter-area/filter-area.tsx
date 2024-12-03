import { ListFilter, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const FilterArea = () => {
    return (
        <form className="flex flex-col max-w-[550px] w-full mt-6">
            <Label className="mb-1">Search by the name</Label>
            <div className="flex flex-col md:flex-row md:items-center">
                <Input required autoFocus type="text" />
                <div className="flex mt-2 md:mt-0 items-center">
                    <Button type="submit" className="md:ml-2"><Search /> Search</Button>
                    <Button className="ml-3" variant={'outline'}><ListFilter />Filters</Button>
                </div>
            </div>
        </form>
    )
}

export default FilterArea;