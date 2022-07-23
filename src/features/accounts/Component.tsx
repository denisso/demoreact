/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react"
import { useSelector } from "react-redux";
import { selectSignInState } from "./reducer";
import { GoogleButton } from "./Google/GoogleButton";
import styled from "styled-components";
import { ReactComponent as LogoGuest } from "assets/guest.svg";
import { ItemAnimatePresence } from "components/Tools";
import { useGetReady } from "features/settings/reducer";

const Container = styled(ItemAnimatePresence)`
    display: flex;
    align-items: center;
    .AvatarBox {
        width: 2rem;
        height: 2rem;
        .Icon {
            width: 100%;
            height: auto;
            fill: ${({ theme }) => theme.colors.first};
            transition: fill var(--transition);
        }
    }
`;

export const AccountComponent = React.memo(() => {
    const { isSignIn, currentUserID } = useSelector(selectSignInState);
    const isReady = useGetReady();
    return (
        <Container isVisible={isReady}>
            {currentUserID && (
                <>
                    {!isSignIn && (
                        <div className="AvatarBox">
                            <LogoGuest className="Icon" />
                        </div>
                    )}
                    <GoogleButton />
                </>
            )}
        </Container>
    );
});
