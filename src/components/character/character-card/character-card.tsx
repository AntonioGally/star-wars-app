// Scripts
import { useGetCharacterInfo } from "@/api";
// Icons
import { Calendar, Car, Rocket } from "lucide-react"
// Components
import { Skeleton } from "@/components/ui/skeleton";
import CharacterModal from "../character-modal/character-modal";

interface CharacterCardProps {
    birth_year: string;
    vehicles: string[];
    starships: string[];
    name: string;
    mass: string;
    height: string;
}

const CharacterCard = (props: CharacterCardProps) => {
    const { data, isPending } = useGetCharacterInfo(props.name)

    function formatDescription(description: string) {
        if (description.length > 100) {
            return description.substring(0, 100) + '...';
        }
        return description;
    }

    return (
        <CharacterModal name={props.name}>
            <div className="w-[260px] h-[390px] rounded border border-slate-200 cursor-pointer flex flex-col">
                <div className="flex items-center justify-between py-2 px-3 ">
                    <div className="flex items-center gap-x-1">
                        <Calendar size={16} />
                        <span className="text-sm">{props.birth_year}</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <div className="flex items-center gap-x-1">
                            <Rocket size={16} />
                            <span className="text-sm">{props.starships.length}</span>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <Car size={16} />
                            <span className="text-sm">{props.vehicles.length}</span>
                        </div>
                    </div>
                </div>

                {isPending && <Skeleton className="h-[180px] w-full shrink-0" />}
                {data?.image && <img src={data.image} alt={props.name} className="w-full h-[180px] object-cover shrink-0" />}
                {!isPending && !data?.image && <div className="h-[180px] w-full rounded bg-slate-200 shrink-0" />}

                <div className="py-2 px-3 flex flex-col justify-between h-full">
                    <div>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight m-0 mb-1">
                            {props.name}
                        </h4>
                        <p className="mb-2">
                            {isPending && <Skeleton className="h-4 w-full" />}
                            {data?.description && formatDescription(data.description)}
                            {!isPending && !data?.description && "No description provided"}
                        </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span className="text-sm">{props.height} cm</span>
                        <span className="text-sm">{props.mass} Kg</span>
                    </div>
                </div>
            </div>
        </CharacterModal>
    )
}

export default CharacterCard;