/**
 * 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react"
import { LinkStyled } from "components/Elements/Link";
import styled, { withTheme } from "styled-components";
import { themeType, mUp } from "features/theming";
import { ItemAnimatePresence } from "components/Tools/Animation";

const Nav = styled.nav.attrs({ className: "nav" })`
    display: flex;
    margin-left: 1rem;
    & > * + * {
        margin-left: 1rem;
    }
`;

const links = { aboutme: "About Me", notes: "Notes" };

const MainMenuComponent = withTheme(({ theme }: { theme: themeType }) => {
    return (
        <Nav>
            {Object.entries(links).map(([anchor, text], i) => (
                <ItemAnimatePresence key={i} isVisible={mUp("md", theme.breakpoint)}>
                    <LinkStyled to={`/${anchor}`}>{text}</LinkStyled>
                </ItemAnimatePresence>
            ))}
        </Nav>
    );
});

export const MainMenu = React.memo(MainMenuComponent)