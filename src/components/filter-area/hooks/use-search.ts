// Libs
import { debounce } from "lodash";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
// Types
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const useSearch = () => {
    const dispatch = useDispatch();

    const handleSearch = useCallback(
        debounce((query: string, action: ActionCreatorWithPayload<string, string>) => {
            dispatch(action(query));
        }, 300),
        []
    );

    return {
        handleSearch
    }
}

export default useSearch;