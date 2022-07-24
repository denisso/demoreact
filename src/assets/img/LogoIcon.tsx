/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import styled from "styled-components";
import { themeType } from "features/theming";

const Svg = styled.svg.attrs({
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
})`
    stroke: ${({ theme }: { theme: themeType }) => theme.header.colorTextMenu};
    transition: stroke var(--transition);
    &:hover {
        stroke: ${({ theme }: { theme: themeType }) =>
            theme.header.colorTextMenuHover};
    }
`;

const Icon = React.memo(() => {
    return (
        <Svg viewBox="0 0 100 100">
            <path
                fill="none"
                strokeMiterlimit="10"
                strokeWidth="8"
                d="M22.35,46.52,43.05,67.3l34.6-34.6M96,96H4V4H96Z"
            ></path>
        </Svg>
    );
});
Icon.displayName = "Icon";

export { Icon };

const LogoContainer = styled.div<{ size: string }>`
    display: flex;
    align-items: center;
    width: ${(props) => props.size};
    height: ${(props) => props.size};
`;

export const Logo = React.memo(({ size = "30px" }: { size: string }) => {
    return (
        <LogoContainer size={size}>
            <Icon />
        </LogoContainer>
    );
});
