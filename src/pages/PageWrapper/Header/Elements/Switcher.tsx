/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { themeType, switchTheme } from "features/theming";
import { selectThemeName } from "features/theming/reducer";
import { useSelector, useDispatch } from "react-redux";
import { ItemAnimatePresence } from "components/Tools/Animation/ItemAnimatePresence"
const Component = styled.div<{
    theme?: themeType;
    size?: string;
}>`
    --size: calc(${({ size }) => size} / 10 * 16);
    width: var(--size);
    display: flex;
    justify-content: flex-start;
    border-radius: calc(var(--size) / 4 + var(--size) / 8);
    border: solid ${({ theme }) => theme.colors.first};
    color: ${({ theme }) => theme.colors.first};
    transition: color var(--transition), border-color var(--transition);
    padding: calc(var(--size) / 16);
    user-select: none;
    cursor: pointer;
    &[data-isOn="Light"] {
        .Icon.Light {
            opacity: 1;
        }
        .Icon.Dark {
            opacity: 0;
        }
    }
    &[data-isOn="Dark"] {
        justify-content: flex-end;
        .Icon.Light {
            opacity: 0;
        }
        .Icon.Dark {
            opacity: 1;
        }
    }
    .handle {
        width: calc(var(--size) / 2);
        height: calc(var(--size) / 2);
        border-radius: calc(var(--width) / 4);
        position: relative;
        .Icon {
            position: absolute;
            width: 100%;
            height: auto;
            transition: opacity 0.5s;
        }
    }
`;
const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
};

export const ThemeSwitcher = React.memo(({ size }: any) => {
    const dispatch = useDispatch();
    const themeName = useSelector(selectThemeName);

    const [theme, setTheme] = React.useState<string>(themeName);
    const toggleSwitch = React.useCallback(() => {
        const switchedTheme =
            theme === "Light" ? "Dark" : "Light";
        setTheme(switchedTheme);
        dispatch(
            switchTheme({
                themeName: switchedTheme,
            })
        );
    }, [theme, dispatch]);

    React.useEffect(() => {
        setTheme(themeName);
    }, [themeName, setTheme]);

    return (
        <>
            <ItemAnimatePresence isVisible={themeName !== "Init"}>
                <Component data-ison={theme} onClick={toggleSwitch} size={size}>
                    <motion.div className="handle" layout transition={spring}>
                        <FontAwesomeIcon className="Icon Light" icon={faSun} />
                        <FontAwesomeIcon className="Icon Dark" icon={faMoon} />
                    </motion.div>
                </Component>
            </ItemAnimatePresence>
        </>
    );
});
