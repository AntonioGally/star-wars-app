// Libs
import { PropsWithChildren, useMemo } from "react";
// Components
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
// Scripts
import { useGetCharacter, useGetCharacterInfo, useGetPlanet } from "@/api";

const CharacterModal = ({ children, name }: PropsWithChildren<{ name: string }>) => {

    const { data: characterData, isPending: dataPending } = useGetCharacter(name);
    const { data: characterInfo, isPending: infoPending } = useGetCharacterInfo(name);

    const getCharacterData = useMemo(() => {
        if (!dataPending && characterData) {
            return characterData.pages[0].results[0];
        }
        return null;
    }, [characterData, dataPending])


    function getPlanetId(url: string): number {
        const urlParts = url.split('/');
        const planetId = urlParts[urlParts.length - 2];

        return Number(planetId);
    }

    const { data: planetData, isPending: planetPending } = useGetPlanet(getPlanetId(getCharacterData?.homeworld || ''));

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                    <DialogDescription>
                        Character details
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <div className="flex items-start gap-x-4 flex-col md:flex-row">
                        {infoPending && <Skeleton className="h-[300px] w-[220px] shrink-0" />}
                        {characterInfo?.image && <img src={characterInfo.image} alt={name} className="h-[300px] w-[220px] object-cover shrink-0 rounded" />}
                        {!infoPending && !characterInfo?.image && <div className="h-[300px] w-[220px] rounded bg-slate-200 shrink-0" />}
                        <div className="flex flex-col">
                            <div>
                                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight m-0 mb-2">
                                    Character information
                                </h4>
                                <div className="flex flex-wrap gap-x-2 gap-y-2">
                                    <Badge>{getCharacterData?.height} cm</Badge>
                                    <Badge>{getCharacterData?.mass} Kg</Badge>
                                    <Badge>{getCharacterData?.gender}</Badge>
                                    <Badge>Born in {getCharacterData?.birth_year}</Badge>
                                    <Badge>{getCharacterData?.films?.length} Films</Badge>
                                </div>
                            </div>
                            <div>
                                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight m-0 mt-4 mb-2">
                                    Planet information
                                </h4>
                                {planetPending ? <Skeleton className="h-4 w-full" /> : (
                                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                                        <Badge>{planetData?.name}</Badge>
                                        <Badge>{planetData?.climate}</Badge>
                                        <Badge>{Number(planetData?.population || 0).toLocaleString('en-US')} people</Badge>
                                        <Badge>{planetData?.terrain}</Badge>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="mt-3 text-sm">
                        {infoPending && <Skeleton className="h-4 w-full" />}
                        {characterInfo?.description && characterInfo.description}
                        {!infoPending && !characterInfo?.description && "No description provided"}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CharacterModal;