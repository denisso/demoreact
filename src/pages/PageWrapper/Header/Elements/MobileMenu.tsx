/**
 * 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { Link } from "react-router-dom";
import { ItemAnimatePresence } from "components/Tools/Animation";
import styled, { withTheme } from "styled-components";
import { motion } from "framer-motion";
import { LinkStyled } from "components/Elements/Link";
import { themeType } from "features/theming";
import { Logo } from "assets/img/LogoIcon";

const varBox = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const varItems = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
};

const links = { aboutme: "About Me", notes: "Notes" };

const MenuBox = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;

    .MenuItem {
        padding: 1rem 0;

        transition: background-color var(--transition);
        margin-bottom: 0.3rem;
    }
`;

const MenuItems = withTheme(({ theme }: { theme: themeType }) => {
    const [isOpen, setIsoPen] = React.useState(false);
    React.useEffect(() => {
        setIsoPen(true);
    }, []);
    return (
        <MenuBox
            initial={isOpen}
            variants={varBox}
            animate={isOpen ? "open" : "closed"}
        >
            {Object.entries(links).map(([anchor, text], i) => (
                <motion.div variants={varItems} key={i} className="MenuItem">
                    <LinkStyled to={`/${anchor}`} className="MenuAnchor">
                        {text}
                    </LinkStyled>
                </motion.div>
            ))}
        </MenuBox>
    );
});

const MenuWrapper = styled(ItemAnimatePresence)`
    position: fixed;
    top: 3rem;
    left: 0;
    background: ${({ theme }) => theme.colorRoot};
    z-index: 9998;
    box-shadow: var(--boxShadowVertical) ${({ theme }) => theme.colorBoxShadow};
    .MenuContainer {
        padding: 1rem;
        padding-bottom: 3.5rem;
        /* 3rem header */
        height: calc(100vh - 3rem);
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
`;

export const MobileMenu = React.memo(({
    isOpen,
    toggleOpen,
}: {
    isOpen: boolean;
    toggleOpen: any;
}) => {
    const refContainer = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        let handleClickOutside = (e: any) => {};

        if (refContainer.current) {
            // Click on ahref with class MenuAnchor
            refContainer.current.addEventListener("mousedown", (e: any) => {
                if (e.target.closest("a.MenuAnchor")) toggleOpen();
            });
            // Click outside refContainer
            handleClickOutside = (e: any) => {
                if (
                    refContainer.current &&
                    refContainer.current.contains(e.target) === false &&
                    !e.target.closest(".ButtonHamburger")
                )
                    toggleOpen();
            };

            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refContainer, toggleOpen]);
    return (
        <MenuWrapper isVisible={isOpen}>
            <div className="MenuContainer" ref={refContainer}>
                <MenuItems />
                <Link to="/" className="MenuAnchor">
                    <Logo size="150px" />
                </Link>
            </div>
        </MenuWrapper>
    );
});
