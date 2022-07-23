/**
 * Table of conetent fot desctop
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import styled from "styled-components";
import { scrollContent } from "components/Tools/scrollContent";
import { ContextNotes } from "../ContextNotes";
import { AnchorBox } from "components/Elements/Anchor";
import { ItemAnimatePresence } from "components/Tools";

const Nav = styled.nav`
    padding: 1rem;
    padding-right: 0;
    top: 3.5rem;
    position: sticky;
    display: flex;
    flex-direction: column;
    height: 70vh;
    overflow-y: auto;
`;

const AnchorBoxStyled = styled(AnchorBox)`
    margin-bottom: 0.3rem;
    &:hover {
        font-weight: bold;
    }
    &.active {
        font-weight: bold;
    }
`;
/**
 *
 * Table of content
 */
export const NavHeadersDesktop = ({
    className,
    isVisible = true,
}: {
    className: string;
    isVisible?: boolean;
}) => {
    const { currentHeader, refHeaders } = React.useContext(ContextNotes);

    // handler for scroll to header
    const onClickAnchor = React.useCallback((e: any) => {
        scrollContent(document.querySelector(e.target.hash).offsetTop);
    }, []);

    // refs on elementa a[href] in table of content
    const refAnchors = React.useRef<any[]>([]);

    // on change current header for highlight it
    React.useEffect(() => {
        if (refHeaders.current.length === 0 || currentHeader < 0) return;
        refAnchors.current.forEach(
            (e: any) => e && e.classList.remove("active")
        );

        refAnchors.current[currentHeader] &&
            refAnchors.current[currentHeader].classList.add("active");
    }, [currentHeader, refHeaders]);
    if (currentHeader < 0) {
        return <></>;
    }
    return (
        <ItemAnimatePresence {...{ className, isVisible }}>
            <Nav>
                {refHeaders.current.map((header: any, i: number) => (
                    <AnchorBoxStyled
                        key={header.id}
                        href={"#" + header.id}
                        onClick={onClickAnchor}
                        ref={(el) => (refAnchors.current[i] = el)}
                    >
                        {header.innerText}
                    </AnchorBoxStyled>
                ))}
            </Nav>
        </ItemAnimatePresence>
    );
};
