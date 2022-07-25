/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import styled from "styled-components";
import { motion } from "framer-motion";
import { themeType } from "features/theming";

const MotionButton = (props: any) => {
    const { disable } = props;

    return (
        <motion.button
            {...props}
            whileHover={!disable ? { scale: 1.05 } : {}}
            whileTap={!disable ? { scale: 0.95 } : {}}
        />
    );
};

export enum ButtonTypesENUM  {
    submit = "submit",
    alarm = "alarm"
}

export const Button = styled(MotionButton)<{
    theme?: themeType;
    disable?: number; // 0: false, : 1 - true
    type?: ButtonTypesENUM; // 0: normal (default), 1: submit (blue), 2: alarm (red)
}>`
    --color: ${({ theme, disable }) =>
        disable ? theme.colors.firstLight : theme.ui.button.color};

    --colorHover: ${({ theme, disable, type }) => {
        if (disable) {
            return theme.ui.button.colorDisable;
        }
        switch (true) {
            case type === ButtonTypesENUM.submit:
                return theme.ui.button.borderColorHoverSubmit;
            case type === ButtonTypesENUM.alarm:
                return theme.ui.button.borderdAlarm;
            default:
                return theme.ui.button.borderColorHover;
        }
    }};

    user-select: ${({ disable }) => (disable ? "none" : "auto")};
    cursor: ${({ disable }) => (disable ? "auto" : "pointer")};
    padding: 0.25em 1em;
    border-style: solid;
    font-size: 1rem;
    color: var(--color);
    border-color: var(--color);
    transition: border-color var(--transition), color var(--transition);
    border-radius: var(--borderRadiusInput);
    background-color: ${({ theme, type }) => {
        switch (true) {
            case type === "submit" || type === 1:
                return theme.ui.button.backgroundColorSubmit;
            case type === "alarm" || type === 2:
                return theme.ui.button.backgroundAlarm;
            default:
                return theme.ui.button.backgroundColor;
        }
    }};
    &:hover {
        border-color: var(--colorHover);
        color: var(--color);
    }
`;

export const ButtonSubmit = styled(Button).attrs<{ theme?: themeType }>(() => ({
    type: "submit",
}))`
    --colorHover: ${({ theme }) => theme.ui.button.borderColorHoverSubmit};
    background-color: ${({ theme }) => theme.ui.button.backgroundColorSubmit};
`;
