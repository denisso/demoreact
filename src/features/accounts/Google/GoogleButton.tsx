/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { selectSignInState, signOut, postUserCredentials } from "../reducer";
import styled from "styled-components";
import { useModal } from "components/Elements/CModal";
import { Button, ButtonSubmit } from "components/Elements/Button";
import { themeType } from "features/theming";
import {
    useGoogleIdentityApi,
    GoogleLoadingStates,
} from "./useGoogleIdentityApi";

const ButtonWrapper = styled.div`
    display: flex;
    .Icon {
        display: block;
        width: 2rem;
        height: 2rem;
        display: grid;
        align-items: center;
        .pictureUser {
            border: solid;
            border-radius: 50%;
            overflow: hidden;
            width: 2rem;
            height: 2rem;
            svg,
            img {
                display: block;
                width: 100%;
                height: auto;
            }
        }
    }
    .Icon + .Icon {
        margin-left: 1rem;
    }
`;

const ModalContentWrapper = styled.div<{ theme?: themeType }>`
    display: flex;
    flex-direction: column;

    & > * + * {
        margin-top: 1rem;
    }
    .ModalContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        .PictureUser {
            border: solid ${({ theme }) => theme.colors.firstLight};
            img {
                display: block;
            }
        }

        .UserInfo > * {
            margin-top: 1rem;
            text-align: center;
        }
    }
    .ModalFooter {
        display: flex;
        justify-content: space-around;
    }
`;

declare global {
    interface Window {
        google: any;
    }
}

export const GoogleButton = React.memo(
    ({ className }: { className?: string }) => {
        const { isSignIn, credentials, currentUserID } =
            useSelector(selectSignInState);
        const dispatch = useDispatch();
        const stateGoogle = useGoogleIdentityApi();
        const modalTitle = React.useRef<string>("Your Account");
        const { Modal, openModal, closeModal } = useModal(modalTitle.current);

        const buttonGoogleRef = React.useRef(null);

        const renderButton = React.useCallback(() => {
            window.google.accounts.id.renderButton(buttonGoogleRef.current, {
                theme: "outline",
                shape: "circle",
                type: "icon",
                size: "medium",
            });
        }, []);

        React.useEffect(() => {
            if (
                !isSignIn &&
                stateGoogle === GoogleLoadingStates.GoogleApiInitialized
            ) {
                renderButton();
            }
        }, [isSignIn, renderButton, stateGoogle]);
        React.useEffect(() => {
            if (stateGoogle === GoogleLoadingStates.GoogleApiInitialized) {
                renderButton();
                window.google.accounts.id.prompt();
            }
        }, [stateGoogle, renderButton]);
        const googleButtonHandler = React.useCallback((e:any) => {
            e.preventDefault();
            openModal();
        },[openModal])
        return (
            <div
                className={
                    className ? `${className} GoogleButton` : "GoogleButton"
                }
            >
                <ButtonWrapper>
                    {stateGoogle === GoogleLoadingStates.GoogleApiInitialized &&
                        (isSignIn ? (
                            <div className="Icon SignOut" key={"SignOut"}>
                                <a
                                    href="/"
                                    onClick={googleButtonHandler}
                                >
                                    <div className="pictureUser">
                                        <img
                                            src={credentials.picture}
                                            alt="user avatar"
                                        />
                                    </div>
                                </a>
                            </div>
                        ) : (
                            <div
                                ref={buttonGoogleRef}
                                key={"SignIn"}
                                className="Icon SignIn"
                            ></div>
                        ))}
                </ButtonWrapper>

                <Modal>
                    {isSignIn && (
                        <ModalContentWrapper>
                            <div className="ModalContainer">
                                <div className="PictureUser">
                                    <img
                                        src={credentials.picture}
                                        alt="user avatar"
                                    />
                                </div>
                                <div className="UserInfo">
                                    <div className="Email">
                                        {credentials.email}
                                    </div>
                                    <div className="Name">
                                        {credentials.name}
                                    </div>
                                </div>
                            </div>

                            <div className="ModalFooter">
                                <Button
                                    onClick={() => {
                                        closeModal();
                                    }}
                                >
                                    Close
                                </Button>
                                <ButtonSubmit
                                    onClick={(e: any) => {
                                        e.preventDefault();
                                        if (
                                            stateGoogle !==
                                                GoogleLoadingStates.GoogleApiInitialized ||
                                            !window.google
                                        )
                                            return;

                                        window.google.accounts.id.revoke(
                                            currentUserID,
                                            () => {
                                                dispatch(signOut());
                                                dispatch(
                                                    postUserCredentials({
                                                        id: "guest",
                                                    })
                                                );
                                            }
                                        );
                                        closeModal();
                                    }}
                                >
                                    Exit{" "}
                                    <FontAwesomeIcon
                                        icon={
                                            faPersonWalkingDashedLineArrowRight
                                        }
                                    />
                                </ButtonSubmit>
                            </div>
                        </ModalContentWrapper>
                    )}
                </Modal>
            </div>
        );
    }
);
