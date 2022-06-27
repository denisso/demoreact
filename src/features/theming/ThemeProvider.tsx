import { useSelector } from "react-redux";
import { ThemeProvider as Tp } from "styled-components";
import { selectTheme } from "./reducer";
import { themeType } from "./themes/themeType";
import { GlobalStyle } from "./styles/globalStyle";
import { useResizeObserver } from "./hooks/useResizeObserver";

type Children = { children: JSX.Element | JSX.Element[] | string | string[] };

export const ThemeProvider = ({ children }: Children) => {
    const theme: themeType = useSelector(selectTheme);
    useResizeObserver();
    return (
        <Tp theme={theme}>
            <GlobalStyle />
            {children}
        </Tp>
    );
};
