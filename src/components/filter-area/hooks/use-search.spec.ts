/* eslint-disable @typescript-eslint/no-explicit-any */

import { renderHook, act } from '@testing-library/react';
import useSearch from './use-search';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { debounce } from 'lodash';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('lodash', () => {
    const debounce = jest.fn((fn) => fn);
    return { debounce };
});

describe('useSearch', () => {
    let dispatchMock: jest.Mock;

    beforeEach(() => {
        dispatchMock = jest.fn();
        (useDispatch as any as jest.Mock).mockReturnValue(dispatchMock);
    });

    it('should dispatch action with debounced query', () => {
        const action = ((query: string) => ({ type: 'SEARCH', payload: query })) as ActionCreatorWithPayload<string, string>;

        const { result } = renderHook(() => useSearch());

        act(() => {
            result.current.handleSearch('test query', action);
        });

        expect(debounce).toHaveBeenCalled();
        expect(dispatchMock).toHaveBeenCalledWith(action('test query'));
    });
});