/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";

export enum enumActions {
    ready = "ready",
    changeCurrentHeader = "changeCurrentHeader",
}

export type stateType = {
    headerIndexTop: number;
    headers: Array<HTMLElement>;
};

const reducer = (state: stateType, action: { type: string; payload: any }) => {
    if (action.type === enumActions.ready) {
        try {
            if (action.payload.headers.current instanceof Array) {
                state.headers = [...action.payload.headers.current];
            }
        } catch (err) {}
        return state;
    }

    let indexTop = 0;
    const stateNew = { ...state };
    
    try {
        indexTop = state.headerIndexTop;
        let { entity }: any = action.payload;
        let indxTriggered = state.headers.indexOf(entity.target)
        if (entity.isIntersecting) {
            // appear
            if (entity.boundingClientRect.top < 0) {
                // from above && scroll to up
                indexTop = indxTriggered;
            } else {
                // from belove && scroll to bottom
                if (
                    indexTop === -1 || state.headers[indexTop].getBoundingClientRect().bottom < 0
                ) {
                    // if top header outside viewport set active next header
                    indexTop = indexTop + 1;
                }
            }
        } else {
            // leave
            if (entity.boundingClientRect.top > 0) {
                // leave below && scroll to up

                if (state.headers[indexTop] === entity.target) {
                    indexTop -= 1;
                }
            } else {
                // leave above && scroll to bottom
                const indxNeaxtHeader =
                    indexTop + 1 < state.headers.length
                        ? indexTop + 1
                        : indexTop;
                if (
                    state.headers[indxNeaxtHeader].getBoundingClientRect().top <
                    document.documentElement.clientHeight
                ) {
                    // if  next header not outside viewport set active nex header
                    indexTop = indxNeaxtHeader;
                }
            }
        }
        
        stateNew.headerIndexTop = indexTop;

    } catch (err) {}
    if (state.headerIndexTop === indexTop) return state;
    return stateNew;
};

export const useHeadersReducer = () => {
    const [state, dispatch] = React.useReducer(reducer, {
        headerIndexTop: 0,
        headers: [],
    });
    return { state, dispatch };
};
