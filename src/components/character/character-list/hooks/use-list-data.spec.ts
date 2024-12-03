/* eslint-disable @typescript-eslint/no-explicit-any */

import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import useListData from './use-list-data';
import { useGetCharacter, useGetPlanetByName, useGetSpeciesByName, useGetStarshipsByName } from '@/api';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

jest.mock('@/api', () => ({
    useGetCharacter: jest.fn(),
    useGetPlanetByName: jest.fn(),
    useGetSpeciesByName: jest.fn(),
    useGetStarshipsByName: jest.fn(),
}));

describe('useListData', () => {
    beforeEach(() => {
        (useSelector as any as jest.Mock).mockImplementation((selector) =>
            selector({
                filter: {
                    searchTerm: 'Luke',
                    filters: {
                        homeworld: 'Tatooine',
                        species: 'Human',
                        starships: 'X-wing',
                    },
                },
            })
        );

        (useGetPlanetByName as jest.Mock).mockReturnValue({ data: [{ url: 'Tatooine-url' }] });
        (useGetSpeciesByName as jest.Mock).mockReturnValue({ data: [{ url: 'Human-url' }] });
        (useGetStarshipsByName as jest.Mock).mockReturnValue({ data: [{ url: 'X-wing-url' }] });
        (useGetCharacter as jest.Mock).mockReturnValue({
            data: {
                pages: [
                    {
                        results: [
                            { homeworld: 'Tatooine-url', species: ['Human-url'], starships: ['X-wing-url'] },
                            { homeworld: 'Other-url', species: ['Other-url'], starships: ['Other-url'] },
                        ],
                    },
                ],
            },
            error: null,
            fetchNextPage: jest.fn(),
            hasNextPage: true,
            isFetchingNextPage: false,
            status: 'success',
        });
    });

    it('should return filtered character data', () => {
        const { result } = renderHook(() => useListData());

        expect(result.current.data).toHaveLength(1);
        expect(result.current.data![0]).toEqual({ homeworld: 'Tatooine-url', species: ['Human-url'], starships: ['X-wing-url'] });
    });

    it('should handle no matching data', () => {
        (useGetCharacter as jest.Mock).mockReturnValueOnce({
            data: {
                pages: [
                    {
                        results: [
                            { homeworld: 'Unknown-url', species: ['Unknown-url'], starships: ['Unknown-url'] },
                        ],
                    },
                ],
            },
            error: null,
            fetchNextPage: jest.fn(),
            hasNextPage: true,
            isFetchingNextPage: false,
            status: 'success',
        });

        const { result } = renderHook(() => useListData());

        expect(result.current.data).toHaveLength(0);
    });

    it('should handle loading state correctly', () => {
        (useGetCharacter as jest.Mock).mockReturnValueOnce({
            data: null,
            error: null,
            fetchNextPage: jest.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
            status: 'pending',
        });

        const { result } = renderHook(() => useListData());

        expect(result.current.data).toBeUndefined();
    });

    it('should handle error state correctly', () => {
        const mockError = new Error("Failed to fetch");
        (useGetCharacter as jest.Mock).mockReturnValueOnce({
            data: null,
            error: mockError,
            fetchNextPage: jest.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
            status: 'error',
        });

        const { result } = renderHook(() => useListData());

        expect(result.current.error).toBe(mockError);
        expect(result.current.data).toBeUndefined();
    });
});