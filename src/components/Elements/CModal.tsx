/**
 * @description Modal with fadeIn/Out effect
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { up, only, down } from "styled-breakpoints";
import { useDispatch } from "react-redux";
import { toggleModal } from "features/theming/reducer";

const ModalStyled = styled.div<{ show: boolean; scrollbarwidth: number }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--zIndexModal);
    display: grid;
    place-items: center;
    background-color: ${({ theme }) => theme.ui.modal.overlay};
    animation: ${({ show }) => (show ? "fadeIn" : "fadeOut")} var(--transition);
    padding-left: ${({ show, scrollbarwidth }) =>
        show ? "0px" : `${scrollbarwidth}px`};
    .modalBox {
        display: flex;
        flex-direction: column;
        ${down("xm")} {
            width: calc(var(--width) * 9 / 10);
        }
        ${only("xm")} {
            width: calc(var(--width) * 9 / 10);
        }
        ${only("sm")} {
            width: calc(var(--width) * 8 / 10);
        }
        ${down("sm")} {
            padding: 1rem;
        }
        ${up("md")} {
            width: 600px;
        }
        padding: 1rem;
        border: solid;
        border-color: ${({ theme }) => theme.ui.modal.borderColor};
        border-radius: var(--borderRadiusBlock);
        background-color: ${({ theme }) => theme.colorRoot};

        transition: width var(--transition);
        & > * + * {
            margin-top: 1rem;
        }
        .modalHeader {
            text-align: right;
            display: flex;
            .modalTitle {
                flex-grow: 1;
                text-align: center;
                font-weight: bold;
                font-size: 1.2rem;
            }
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;

export const useModal = (title?: string) => {
    const dispatch = useDispatch();

    const refShowHide = React.useRef<Partial<(arg: boolean) => void>>();

    const openModal = React.useCallback(() => {
        if (refShowHide.current instanceof Function) refShowHide.current(true);
    }, []);
    const closeModal = React.useCallback(() => {
        if (refShowHide.current instanceof Function) refShowHide.current(false);
    }, []);

    const Modal = React.useMemo(() => {
        const ComponentConstructor = ({ children }: { children?: any }) => {
            const [show, setShow] = React.useState(false);

            React.useEffect(() => {
                const handleSetNewState = function (show: boolean) {
                    setShow(show);
                    // Processing no scroll
                    dispatch(
                        toggleModal({
                            isShowModal: show,
                            scrollBarWidth:
                                window.innerWidth - document.body.clientWidth,
                        })
                    );
                };
                refShowHide.current = handleSetNewState;
            }, []);
            return <CModal {...{ show, title }}>{children}</CModal>;
        };
        return ComponentConstructor;
    }, [dispatch, title]);
    return {
        Modal,
        openModal,
        closeModal,
    };
};

export const CModal = React.memo(
    ({
        title,
        show,
        children,
        className,
    }: {
        title?: string;
        className?: string;
        show: boolean;
        children?: any;
    }) => {
        const [display, setDisplay] = React.useState(false);
        const clickedClose = React.useRef(false);

        // hide modal after end animation fadeout
        const onAnimationEnd = () => {
            if (!show) setDisplay(false);
        };

        React.useEffect(() => {
            // initialize modal window and start animation fadeIn
            if (show) {
                setDisplay(true);
                clickedClose.current = false;
            }
        }, [show]);

        return ReactDOM.createPortal(
            <>
                {display && (
                    <ModalStyled
                        show={show}
                        scrollbarwidth={
                            window.innerWidth - document.body.clientWidth
                        }
                        className="modalOverlay"
                        {...{ onAnimationEnd }}
                    >
                        <div className="modalBox">
                            <header className="modalHeader">
                                {title && (
                                    <div className="modalTitle">{title}</div>
                                )}
                            </header>

                            <div {...{ className }}>{children}</div>
                        </div>
                    </ModalStyled>
                )}
            </>,
            document.body
        );
    }
);
