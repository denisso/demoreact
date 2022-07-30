/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider as Tp } from "styled-components";
import { selectTheme } from "./reducer";
import { themeType } from "./themes/themeType";
import { GlobalStyle } from "./styles/globalStyle";
import { useResizeObserver } from "./hooks/useResizeObserver";
import { switchTheme } from ".";
import { useDispatch } from "react-redux";

type Children = { children: JSX.Element | JSX.Element[] | string | string[] };

export const ThemeProvider = React.memo(({ children }: Children) => {
    const theme: themeType = useSelector(selectTheme);
    const dispatch = useDispatch();
    useResizeObserver();
    React.useEffect(() => {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", function (e) {
                dispatch(
                    switchTheme({ themeName: e.matches ? "Dark" : "Light" })
                );
            });
        const themeName: string =
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "Dark"
                : "Light";

        dispatch(switchTheme({ themeName }));
    }, [dispatch]);
    return (
        <Tp theme={theme}>
            <GlobalStyle />
            {children}
        </Tp>
    );
});
