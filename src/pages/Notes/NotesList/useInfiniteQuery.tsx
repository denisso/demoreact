/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import { useLazyGetNotesListQuery } from "api-query";
import { NoteDataType } from "mocks/data/notes";

type stateType = { data: Array<NoteDataType>; error: boolean; last: boolean };

function init(initalValue: stateType): stateType {
    return initalValue;
}

function reducer(
    state: stateType,
    { payload }: { payload: stateType }
): stateType {
    /**
     * you need to do a check for duplication,
     * but since the mock service has static data,
     * there is no check here
     */
    const stateNew: stateType = {
        data: state.data,
        error: payload.error,
        last: payload.last,
    };

    if (!payload.last) stateNew.data = state.data.concat(payload.data);
    return stateNew;
}

export const useInfiniteQuery = () => {
    const [state, setState] = React.useReducer(
        reducer,
        { data: [], error: false, last: false },
        init
    );

    const [isLoading, setLoading] = React.useState(false);

    const [trigger, result] = useLazyGetNotesListQuery();

    const page = React.useRef(0);

    const getQuery = React.useCallback(() => {
        setLoading(true);
        trigger(page.current);
        page.current++;
    }, [setLoading, trigger]);

    React.useEffect(() => {
        getQuery();
    }, [getQuery]);
    React.useEffect(() => {
        if (result.isSuccess && !result.isFetching) {
            setState({
                payload: {
                    data: result.data.notes,
                    error: false,
                    last: result.data.last,
                },
            });
            setLoading(false);
        }
        if (result.isError && !result.isFetching) {
            setState({ payload: { data: [], error: true, last: true } });
            setLoading(false);
        }
    }, [result]);
    const fetchNextPage = React.useCallback(() => {
        if (!state.last) {
            getQuery();
        }
    }, [state, getQuery]);
    return {
        error: state.error,
        last: state.last,
        isLoading,
        data: state.data,
        page: page.current,
        fetchNextPage,
    };
};
