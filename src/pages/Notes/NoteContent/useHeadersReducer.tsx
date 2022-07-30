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
    value: number;
    headers: Array<HTMLElement>;
};

const reducer = (state: stateType, action: { type: string; payload: any }) => {
    if (action.type === enumActions.ready) {
        const arr = action.payload.headers.current;
        if (arr instanceof Array) {
            arr.forEach((e) => state.headers.push(e));
        }
        return state;
    }

    let indexTop = state.value

    let { indxTriggered, entity }: any = action.payload;

    if (entity.isIntersecting) {
        // appear
        if (entity.boundingClientRect.top < 0) {
            // from above && scroll to up
            indexTop = indxTriggered;
        } else {
            // from belove && scroll to bottom
            if (
                state.headers[indexTop].getBoundingClientRect()
                    .bottom < 0
            ) {
                // if top header outside viewport set active next header
                indexTop = indexTop + 1;
            }
        }
    } else {
        // leave
        if (entity.boundingClientRect.top > 0) {
            // leave below && scroll to up

            if(state.headers[indexTop] === entity.target){
                indexTop -= 1
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
    if (state.value === indexTop) return state;
    return { ...state, value: indexTop};
};

export const useHeadersReducer = () => {
    const [state, dispatch] = React.useReducer(reducer, {
        value: 0,
        headers: []
    });
    return { state, dispatch };
};
