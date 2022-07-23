/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkSlash, faReply } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { LinkStyled } from "components/Elements/Link";
const Content = styled.div`
    .Icon {
        margin-right: 1rem;
    }
    h1,
    p {
        text-align: center;
        padding-bottom: 1rem;
    }
`;

export const NotFound404 = React.memo(() => {
    return (
        <Content>
            <h1>
                <FontAwesomeIcon className="Icon" icon={faLinkSlash} />{" "}
                <span>Page not found</span>
            </h1>
            <p>
                <span>
                    Something went wrong. The page at the requested address does
                    not exist. We apologize for the inconvenience.
                </span>
            </p>
            <p>
                <LinkStyled to="/" title="Go to main page">
                    <span>
                        <FontAwesomeIcon className="Icon" icon={faReply} />{" "}
                        <span>Go back to the main page</span>
                    </span>
                </LinkStyled>
            </p>
        </Content>
    );
});
