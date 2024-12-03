import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
    searchTerm: string;
    filters: {
        homeworld: string;
        starships: string;
        species: string;
    }
}

const initialState: FilterState = {
    searchTerm: "",
    filters: {
        homeworld: "",
        starships: "",
        species: "",
    }
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchTerm: (state, action: { payload: string }) => {
            state.searchTerm = action.payload;
        },
        setHomeworld: (state, action: { payload: string }) => {
            state.filters.homeworld = action.payload;
        },
        setStarships: (state, action: { payload: string }) => {
            state.filters.starships = action.payload;
        },
        setSpecies: (state, action: { payload: string }) => {
            state.filters.species = action.payload;
        },
    },
});

export const { setSearchTerm,setHomeworld, setStarships, setSpecies } = filterSlice.actions;

export default filterSlice.reducer;
