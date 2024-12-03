import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
    searchTerm: string;
}

const initialState: FilterState = {
    searchTerm: "",
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchTerm: (state, action: { payload: string }) => {
            state.searchTerm = action.payload;
        },
    },
});

export const { setSearchTerm } = filterSlice.actions;

export default filterSlice.reducer;
