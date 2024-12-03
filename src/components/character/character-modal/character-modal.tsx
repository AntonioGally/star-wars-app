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
                    <DialogTitle data-testid='character-name-title'>{name}</DialogTitle>
                    <DialogDescription>
                        Character details
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <div className="flex items-start gap-x-4 flex-col md:flex-row">
                        {infoPending && <Skeleton data-testid='image-skeleton' className="h-[300px] w-[220px] shrink-0" />}
                        {characterInfo?.image && <img data-testid="character-image" src={characterInfo.image} alt={name} className="h-[300px] w-[220px] object-cover shrink-0 rounded" />}
                        {!infoPending && !characterInfo?.image && <div className="h-[300px] w-[220px] rounded bg-slate-200 shrink-0" />}
                        <div className="flex flex-col">
                            <div>
                                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight m-0 mb-2">
                                    Character information
                                </h4>
                                <div className="flex flex-wrap gap-x-2 gap-y-2">
                                    <Badge data-testid="character-height-badge">{getCharacterData?.height} cm</Badge>
                                    <Badge data-testid="character-mass-badge">{getCharacterData?.mass} Kg</Badge>
                                    <Badge data-testid="character-gender-badge">{getCharacterData?.gender}</Badge>
                                    <Badge data-testid="character-birth-year-badge">Born in {getCharacterData?.birth_year}</Badge>
                                    <Badge data-testid="character-films-badge">{getCharacterData?.films?.length} Films</Badge>
                                </div>
                            </div>
                            <div>
                                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight m-0 mt-4 mb-2">
                                    Planet information
                                </h4>
                                {planetPending ? <Skeleton data-testid='planet-skeleton' className="h-4 w-full" /> : (
                                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                                        <Badge data-testid="planet-name-badge">{planetData?.name}</Badge>
                                        <Badge data-testid="planet-climate-badge">{planetData?.climate}</Badge>
                                        <Badge data-testid="planet-population-badge">{Number(planetData?.population || 0).toLocaleString('en-US')} people</Badge>
                                        <Badge data-testid="planet-terrain-badge">{planetData?.terrain}</Badge>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="mt-3 text-sm">
                        {infoPending && <Skeleton data-testid='description-skeleton' className="h-4 w-full" />}
                        {characterInfo?.description && characterInfo.description}
                        {!infoPending && !characterInfo?.description && "No description provided"}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CharacterModal;