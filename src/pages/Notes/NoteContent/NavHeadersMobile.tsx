/**
 * Table of content for mobile
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { ContextNotes } from "../ContextNotes";
import styled from "styled-components";
import { themeType } from "features/theming";
import { Button } from "components/Elements/Button";
import { scrollContent } from "components/Tools";
import { useModal } from "components/Elements/CModal";
import { AnchorBox } from "components/Elements/Anchor";
import { ItemAnimatePresence } from "components/Tools";

const Container = styled(ItemAnimatePresence)<{ theme: themeType }>`
    position: sticky;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colorRoot};
    padding: 0.5rem 0;
    z-index: 200;
    .NavPanel {
        display: flex;
        justify-content: space-around;
        width: 100%;
    }
`;

const NavBox = styled.div`
    .NavContent {
        margin-bottom: 1rem;
        height: 70vh;
        overflow-y: auto;
        .NavigationAnchor {
            text-align: center;
        }
        .NavigationAnchor + .NavigationAnchor {
            margin-top: 0.5rem;
        }
    }
    .NavFooter {
        text-align: center;
    }
`;

export const NavHeadersMobile = ({
    className,
    isVisible = true,
}: {
    className?: string;
    isVisible?: boolean;
}) => {
    const { currentHeader, refHeaders } = React.useContext(ContextNotes);
    const currentHeaderRef = React.useRef<number>(0);
    //  to avoid rerun the callback onClickAnchor
    currentHeaderRef.current = currentHeader;
    const { Modal, openModal, closeModal } = useModal("Choose section");

    const onClickAnchor = React.useCallback(
        ({ type, payload }: any) => {
            if (refHeaders.current.length === 0) return;
            let indx = currentHeaderRef.current;
            switch (type) {
                case "Prev":
                    indx = indx - 1 < 0 ? indx : indx - 1;
                    break;
                case "Next":
                    indx =
                        indx + 1 > refHeaders.current.length - 1
                            ? indx
                            : indx + 1;
                    break;
                case "ByIndx":
                    indx = payload;
                    break;
                default:
            }
            scrollContent(refHeaders.current[indx].offsetTop);

            closeModal();
        },
        [closeModal, refHeaders]
    );
    if (currentHeader < 0) {
        return <></>;
    }
    return (
        <>
            <Container
                {...{ className: className + " NavHeadersMobile", isVisible }}
            >
                <div className="NavPanel">
                    <Button onClick={() => onClickAnchor({ type: "Prev" })}>
                        Prev
                    </Button>
                    <Button
                        onClick={() => {
                            openModal();
                        }}
                    >
                        Current: {refHeaders.current[currentHeader]?.innerText}
                    </Button>
                    <Button onClick={() => onClickAnchor({ type: "Next" })}>
                        Next
                    </Button>
                </div>
            </Container>
            <Modal>
                <NavBox>
                    <div className="NavContent">
                        {refHeaders.current.map((header: any, i: number) => (
                            <AnchorBox
                                className="NavigationAnchor"
                                key={header.id}
                                href={"#" + header.id}
                                onClick={() =>
                                    onClickAnchor({
                                        type: "ByIndx",
                                        payload: i,
                                    })
                                }
                            >
                                {header.innerText}
                            </AnchorBox>
                        ))}
                    </div>
                    <div className="NavFooter">
                        <Button
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </NavBox>
            </Modal>
        </>
    );
};
