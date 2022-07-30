/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { createSlice } from "@reduxjs/toolkit";
import { breaksNumber } from "./themes/breakpoints";
import { themeDark } from "./themes/dark";
import { themeLight } from "./themes/light";
import { themeType } from "./themes/themeType";

type iState = {
    current: themeType;
    isShowModal?: boolean;
    scrollBarWidth?: number;
    scrollTop?: number;
};

const initialState: iState = {
    current: themeLight,
};

const Themes: { [key: string]: themeType } = {
    Light: themeLight,
    Dark: themeDark,
};

const getMedia = () => {
    const entries = Object.entries(breaksNumber);
    const width: number = window.innerWidth;
    for (let i = 0; i < entries.length - 1; i++) {
        if (width < entries[i + 1][1]) return entries[i][0];
    }
    return entries[entries.length - 1][0];
};

const slice = createSlice({
    name: "themes",
    initialState,
    reducers: {
        /**
         *
         * @param state
         * @param action { payload: { themeName: "Light" | "Dark" } }
         */
        switchTheme: (state, action: { payload: { themeName: string } }) => {
            if (Themes[action?.payload?.themeName]) {
                state.current = {
                    ...Themes[action?.payload?.themeName],
                    themeName: action?.payload?.themeName,
                    breakpoint: state.current.breakpoint,
                };
            }
        },
        toggleModal: (state, action) => {
            const { isShowModal, scrollBarWidth } = action.payload;
            state.isShowModal = isShowModal;
            state.scrollBarWidth = scrollBarWidth;
            if (isShowModal) {
                state.scrollTop = document.documentElement.scrollTop;
                const body = document.body;
                body.style.position = "fixed";
                body.style.top = `-${state.scrollTop}px`;
            } else {
                const body = document.body;
                body.style.position = "";
                body.style.top = "";
                document.documentElement.scrollTop = state.scrollTop || 0;
            }
        },
        applyViewportResize: (state: iState) => {
            // smooth document width resize and scroll bar width shift prevent
            state.current.breakpoint = getMedia();
            setTimeout(
                ({ isShowModal, scrollBarWidth }) => {
                    let width =
                        document.documentElement.getBoundingClientRect().width;
                    if (isShowModal) {
                        width -= scrollBarWidth || 0;
                    }
                    document.documentElement.style.setProperty(
                        "--width",
                        width + "px"
                    );
                },
                0,
                {
                    isShowModal: state.isShowModal,
                    scrollBarWidth: state.scrollBarWidth,
                }
            );
        },
    },
});

type StateThemes = {
    themes: iState;
};

export const reducerTheming = slice.reducer;
export const selectTheme = (state: StateThemes): themeType => {
    return state.themes.current;
};
export const selectThemeName = (state: StateThemes): string => {
    if (state.themes.current.themeName === "Light") return "Light";
    else if (state.themes.current.themeName === "Dark") return "Dark";
    return "Init";
};
export const { switchTheme, applyViewportResize, toggleModal } = slice.actions;
