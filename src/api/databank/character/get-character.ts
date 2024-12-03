import { databankInstance } from "@/api/config/instance";
import { useQuery } from "@tanstack/react-query";

export interface CharacterDataBank {
    _id: string;
    name: string;
    description: string;
    image: string;
}

const fetchCharacter = async (name: string): Promise<CharacterDataBank | undefined> => {
    const { data } = await databankInstance.get(`characters/name/${name}`);

    return data[0] || [];
}

export const useGetCharacterInfo = (name: string) => {
    return useQuery({
        queryKey: ['character', name],
        queryFn: () => fetchCharacter(name),
        staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
    })
}