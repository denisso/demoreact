/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react"
import styled from "styled-components";
import { themeType } from "features/theming";

const SpinnerContainer = styled.span<{ theme: themeType }>`
    margin: 20px auto;
    display: flex;
    justify-content: center;
    background: ${({ theme }) => theme.colorRoot};

    .ball {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.first};
        animation: fromUpToDown 2s 0.2s ease-in-out infinite;
    }
    .ball:not(:last-child) {
        margin-right: 1rem;
    }
    .ball:nth-child(2n) {
        animation: fromUpToDown 2s 0.2s ease-in-out infinite reverse;
    }

    @keyframes fromUpToDown {
        0% {
            transform: translateY(0px);
        }

        25% {
            transform: translateY(10px);
        }

        75% {
            transform: translateY(-10px);
        }

        100% {
            transform: translateY(0px);
        }
    }
`;

const arr = Array.from(Array(5), (x, index) => index);

export const Spinner = React.memo(() => {
    return (
        <SpinnerContainer>
            {arr.map((e: number) => (
                <span className={"ball"} key={e}></span>
            ))}
        </SpinnerContainer>
    );
});
