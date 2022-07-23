/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import styled from "styled-components";
import { down, up } from "styled-breakpoints";
import { Button } from "components/Elements/Button";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Anchor } from "components/Elements/Anchor";
import { ReactComponent as LogoGuest } from "assets/codesandbox.svg";
import { ModalFormSendMessage } from "components/Custom/ModalFormSendMessage";

const FooterWrapper = styled.footer.attrs({ className: "container" })`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 200px;
    position: relative;
    margin-top: 4rem;
    box-shadow: inset var(--boxShadowHorizontal)
        ${({ theme }) => theme.colorBoxShadow};

    .sendMessageContainer {
        ${up("xm")} {
            top: -3rem;
            left: 50%;
            width: 385px;
            transform: translateX(-50%);
            position: absolute;
            display: flex;
            justify-content: center;
        }
        ${down("xm")} {
            width: 100%;
        }

        .sendMesage {
            display: inline-block;
            background: ${({ theme }) => theme.colors.firstLightMore};
            padding: 1rem 3rem;
            position: relative;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            color: ${({ theme }) => theme.colors.first};
            box-shadow: -4px 8px 7px -1px ${({ theme }) => theme.colorBoxShadow};
        }
        ${up("sm")} {
            .sendMesage {
                width: 300px;
            }
        }
        ${down("sm")} {
            .sendMesage {
                width: 100%;
            }
        }
        ${up("xm")} {
            .sendMesage::after {
                content: "";
                position: absolute;
                top: 0;
                right: 100%;
                width: 1rem;
                height: calc(3rem + 1px);
                background: ${({ theme }) => theme.colors.firstLight};
                -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%);
                clip-path: polygon(100% 0, 100% 100%, 0 100%);
            }
        }
        .headerSendMesage {
            text-align: center;
            font-weight: bold;
        }
        .btnSendMesage {
            margin-top: 1rem;
            text-align: center;
        }
    }

    .createdBy {
        margin-top: 4rem;
        ${down("xm")} {
            margin-top: 1rem;
        }
        text-align: center;
        margin-bottom: 1rem;
    }
    .contactsAndSocial {
        display: flex;
        justify-content: center;
        & > * {
            margin-left: 1rem;
        }
        ${down("xm")} {
            flex-wrap: wrap;
        }
        .socialIcon {
            ${down("xm")} {
                margin-bottom: 1rem;
            }
            .Icon {
                width: 100%;
                height: auto;
                display: block;
            }
            width: 2rem;
            height: 2rem;
        }
    }
`;

export const Footer = React.memo(() => {
    const openFormModal = React.useRef<(arg: any) => void>((arg: any) => {});
    return (
        <FooterWrapper>
            <div className="sendMessageContainer">
                <div className="sendMesage">
                    <div className="headerSendMesage">Denis in touch</div>
                    <div className="btnSendMesage">
                        <Button
                            onClick={(e: any) => {
                                if (openFormModal.current)
                                    openFormModal.current(e);
                            }}
                        >
                            Send message
                        </Button>
                    </div>
                </div>
            </div>
            <div className="createdBy">
                <span>
                    Created by <b>Denis Kurochkin</b> aka <b>mr_dramm</b>
                </span>
            </div>
            <div className="contactsAndSocial">
                <Anchor
                    href="https://github.com/denisso/demoreact"
                    className="socialIcon"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faGithub} className="Icon" />
                </Anchor>
                <Anchor
                    href="https://codesandbox.io/u/blackbrain2009"
                    className="socialIcon"
                    target="_blank"
                >
                    <LogoGuest className="Icon" />
                </Anchor>
            </div>
            <ModalFormSendMessage
                openFormModalCB={(callback: any) => {
                    openFormModal.current = callback;
                }}
            />
        </FooterWrapper>
    );
});
