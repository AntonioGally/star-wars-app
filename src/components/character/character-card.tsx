import { Calendar, Car, Rocket } from "lucide-react"

interface CharacterCardProps {
    birth_year: string;
    vehicles: string[];
    starships: string[];
    name: string;
    mass: string;
    height: string;
}

const CharacterCard = (props: CharacterCardProps) => {

    function formatDescription(description: string) {
        if (description.length > 100) {
            return description.substring(0, 100) + '...';
        }
        return description;
    }

    return (
        <div className="w-[200px] rounded border border-[#0F172A] cursor-pointer">
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

            {/* <img src={props.image} alt={props.name} className="w-full h-[180px] object-cover" /> */}
            <img src={"https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_fb34a1ff.jpeg"} alt={props.name} className="w-full h-[180px] object-cover" />

            <div className="py-2 px-3 ">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight m-0 mb-1">
                    {props.name}
                </h4>
                <p className="mb-2">
                    {/* {formatDescription(props.description)} */}
                    {formatDescription(`Luke Skywalker was a Tatooine farmboy who rose from humble beginnings to become one of the greatest Jedi the galaxy has ever known. Along with his friends Princess Leia and Han Solo, Luke battled the evil Empire, discovered the truth of his parentage, and ended the tyranny of the Sith. A generation later, the location of the famed Jedi master was one of the galaxy’s greatest mysteries. Haunted by Ben Solo’s fall to evil and convinced the Jedi had to end, Luke sought exile on a distant world, ignoring the galaxy’s pleas for help. But his solitude would be interrupted – and Luke Skywalker had one final, momentous role to play in the struggle between good and evil."`)}
                </p>
                <div className="flex items-center gap-x-2">
                    <span className="text-sm">{props.height} cm</span>
                    <span className="text-sm">{props.mass} Kg</span>
                </div>
            </div>
        </div>
    )
}

export default CharacterCard;