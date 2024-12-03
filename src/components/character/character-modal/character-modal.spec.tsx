import "@testing-library/jest-dom";
import { act, render } from '@testing-library/react';
import CharacterModal from './character-modal';
import { useGetCharacter, useGetCharacterInfo, useGetPlanet } from '@/api';

jest.mock('@/api', () => ({
    useGetCharacter: jest.fn(),
    useGetCharacterInfo: jest.fn(),
    useGetPlanet: jest.fn(),
}));

describe('CharacterModal', () => {
    beforeEach(() => {
        (useGetCharacter as jest.Mock).mockReturnValue({
            data: {
                pages: [
                    {
                        results: [{
                            homeworld: 'https://swapi.dev/api/planets/1/',
                            height: '172',
                            mass: '77',
                            gender: 'male',
                            birth_year: '19BBY',
                            films: [1, 2, 3],
                        }],
                    },
                ],
            },
            isPending: false,
        });

        (useGetCharacterInfo as jest.Mock).mockReturnValue({
            data: {
                image: 'https://placeholder.com/character.jpg',
                description: 'A description of the character.',
            },
            isPending: false,
        });

        (useGetPlanet as jest.Mock).mockReturnValue({
            data: {
                name: 'Tatooine',
                climate: 'arid',
                population: '200000',
                terrain: 'desert',
            },
            isPending: false,
        });
    });

    it('renders character and planet data correctly', () => {
        const screen = render(<CharacterModal name="Luke Skywalker"><span data-testid='open-test'>Open Dialog</span></CharacterModal>);

        // Open the dialog
        const triggerElement = screen.getByTestId('open-test');

        act(() => {
            triggerElement.click();
        });

        expect(screen.getByTestId('character-name-title')).toHaveTextContent('Luke Skywalker');
        expect(screen.getByTestId('character-height-badge')).toHaveTextContent('172 cm');
        expect(screen.getByTestId('character-mass-badge')).toHaveTextContent('77 Kg');
        expect(screen.getByTestId('character-gender-badge')).toHaveTextContent('male');
        expect(screen.getByTestId('character-birth-year-badge')).toHaveTextContent('Born in 19BBY');
        expect(screen.getByTestId('character-films-badge')).toHaveTextContent('3 Films');
        expect(screen.getByTestId('character-image')).toHaveAttribute('src', 'https://placeholder.com/character.jpg');
        expect(screen.getByText('A description of the character.')).toBeInTheDocument();

        // Check planet information
        expect(screen.getByTestId('planet-name-badge')).toHaveTextContent('Tatooine');
        expect(screen.getByTestId('planet-climate-badge')).toHaveTextContent('arid');
        expect(screen.getByTestId('planet-population-badge')).toHaveTextContent('200,000 people');
        expect(screen.getByTestId('planet-terrain-badge')).toHaveTextContent('desert');
    });

    it('shows skeleton loader when data is pending', () => {
        (useGetCharacterInfo as jest.Mock).mockReturnValueOnce({
            data: null,
            isPending: true,
        });

        const screen = render(<CharacterModal name="Luke Skywalker"><span data-testid='open-test'>Open Dialog</span></CharacterModal>);

        // Open the dialog
        const triggerElement = screen.getByTestId('open-test');
        act(() => {
            triggerElement.click();
        });

        expect(screen.getByTestId('image-skeleton')).toBeInTheDocument();
        expect(screen.getByTestId('description-skeleton')).toBeInTheDocument();
    });

    it('handles no character image and description correctly', () => {
        (useGetCharacterInfo as jest.Mock).mockReturnValueOnce({
            data: {
                image: null,
                description: null,
            },
            isPending: false,
        });

        const screen = render(<CharacterModal name="Luke Skywalker"><span data-testid='open-test'>Open Dialog</span></CharacterModal>);

        // Open the dialog
        const triggerElement = screen.getByTestId('open-test');
        act(() => {
            triggerElement.click();
        })

        // Check fallback content
        expect(screen.queryByTestId('character-image')).not.toBeInTheDocument();
        expect(screen.getByText('No description provided')).toBeInTheDocument();
    });
});