/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { up } from "styled-breakpoints";
import styled, { withTheme } from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCycle } from "framer-motion";
import { Logo } from "assets/img/LogoIcon";
import { themeType, mDown, mUp, switchTheme } from "features/theming";
import { ItemAnimatePresence } from "components/Tools/Animation";
import { MobileMenu } from "./Elements/MobileMenu";
import { MainMenu } from "./Elements/MainMenu";
import { ThemeSwitcher } from "./Elements/Switcher";
import { ButtonHamburger } from "./Elements/ButtonHamburger";
import { AccountComponent } from "features/accounts/Component";
import { ModalFormSendMessage } from "components/Custom/ModalFormSendMessage";
import { Anchor } from "components/Elements/Anchor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    position: sticky;
    z-index: 9998;
    top: 0px;
    background-color: ${({ theme }) => theme.colors.colorRoot};
    transition: background-color var(--transition);
    ${up("md")} {
        border-top-left-radius: var(--borderRadiusBlock);
        border-top-right-radius: var(--borderRadiusBlock);
    }

    box-shadow: var(--boxShadowHorizontal)
        ${({ theme }) => theme.colorBoxShadow};

    .HeaderLine {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        height: 3rem;
        .HeaderLeftSide,
        .HeaderRightSide {
            display: flex;
            align-items: center;
        }
        .HeaderRightSide {
            & > * + * {
                margin-left: 1rem;
            }
            & > .Anchor {
                & > .Icon {
                    width: 1.5rem;
                    height: 1.5rem;
                }
            }
        }
    }
`;

export const Header = withTheme(({ theme }: { theme: themeType }) => {
    const dispatch = useDispatch();
    const [isOpen, toggleOpen] = useCycle(false, true);
    const openFormModal = React.useRef<(arg: any) => void>((arg: any) => {});
    React.useEffect(() => {
        // mobile menu must be close in desktop mode
        if (mUp("md", theme.breakpoint) && isOpen) toggleOpen();
    }, [theme.breakpoint, isOpen, toggleOpen]);

    const trigger = React.useCallback(
        (name: string) => dispatch(switchTheme({ themeName: name })),
        [dispatch]
    );
    return (
        <>
            <HeaderWrapper>
                <div className="HeaderLine container">
                    <div className="HeaderLeftSide">
                        <ItemAnimatePresence
                            key={0}
                            isVisible={mDown("md", theme.breakpoint)}
                        >
                            <ButtonHamburger
                                toggleOpen={() => toggleOpen()}
                                isOpen={isOpen}
                            />
                        </ItemAnimatePresence>
                        <ItemAnimatePresence
                            key={"MobileMenu"}
                            isVisible={mUp("md", theme.breakpoint)}
                        >
                            <Link to="/">
                                <Logo size="30px" />
                            </Link>
                        </ItemAnimatePresence>

                        <MainMenu key={"DesktopMenu"} />
                    </div>
                    <div className="HeaderRightSide">
                        <Anchor
                            className="Anchor"
                            onClick={(e: any) => {
                                if (openFormModal.current)
                                    openFormModal.current(e);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faPaperPlane}
                                className="Icon"
                            />
                        </Anchor>
                        <ThemeSwitcher size={"1.6rem"} trigger={trigger} />

                        <AccountComponent />
                    </div>
                </div>
            </HeaderWrapper>
            <MobileMenu isOpen={isOpen} toggleOpen={toggleOpen} />
            <ModalFormSendMessage
                openFormModalCB={(callback: any) => {
                    openFormModal.current = callback;
                }}
            />
        </>
    );
});
