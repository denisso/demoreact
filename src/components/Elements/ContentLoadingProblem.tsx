/**
 * @description Placeholder for data empty or error block
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react"
import { faFaceSadCry } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Spinner } from "./Spinner";
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 3rem 0;
    color: ${({ theme }) => theme.colors.firstLight};
    .Icon {
        width: 3rem;
        height: auto;
    }
    .Message {
        font-size: 1.4rem;
        font-weight: bold;
        margin: 2rem 0;
        text-align: center;
    }
`;

export const ContentLoadingProblem = React.memo(({ message }: { message: string }) => {
    return (
        <Container>
            <FontAwesomeIcon className="Icon" icon={faFaceSadCry} />
            <div className="Message">{message}</div>
        </Container>
    );
});

export const ContentLoadingProblemNotFound = React.memo(() => {
    return (
        <>
            <ContentLoadingProblem message="Could not find data..." />
            <Spinner />
        </>
    );
});

export const ContentLoadingProblemError = React.memo(() => {
    return (
        <>
            <ContentLoadingProblem message="An error occurred during loading..." />
            <Spinner />
        </>
    );
});
