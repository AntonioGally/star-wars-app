/* eslint-disable @typescript-eslint/no-explicit-any */

import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FilterArea from "./filter-area";
import useSearch from "./hooks/use-search";

jest.mock('./hooks/use-search');

const mockStore = configureStore([]);
const initialState = {
    filter: {
        searchTerm: "",
        filters: {
            homeworld: "",
            species: "",
            starships: ""
        }
    }
};

describe('FilterArea', () => {
    beforeEach(() => {
        (useSearch as jest.Mock).mockReturnValue({
            handleSearch: jest.fn()
        });
    });

    function renderWithProviders(ui: React.ReactElement, { reduxState }: { reduxState: any }) {
        const store = mockStore(reduxState);
        return {
            ...render(<Provider store={store}>{ui}</Provider>),
            store,
        };
    }

    it('renders correctly', () => {
        const screen = renderWithProviders(<FilterArea />, { reduxState: initialState });

        expect(screen.getByTestId('search-label')).toBeInTheDocument();
        expect(screen.getByTestId('filters-button')).toBeInTheDocument();
    });

});