/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { breaksPx } from "./breakpoints";
import { themeType } from "./themeType";

export type colorsType = {
    colorRoot: string;
    first: string;
    firstLight: string;
    firstLightMore: string;
    second: string;
    secondLight: string;
    secondLightMore: string;
    third: string;
    thirdLight: string;
    thirdLightMore: string;
    fourth: string;
    fourthLight: string;
    fourthLightMore: string;
    shadow: string;
    overlay: string;
    [key: string]: string; // to be able to extend the type
};

export const createThemeSchema = ({
    colors,
}: {
    colors: colorsType;
}): themeType => ({
    themeName: "Init",
    colors: { ...colors },
    fontFamily: "Arial, Helvetica, sans-serif",
    transition: ".4s",
    colorBackground: colors.firstLightMore,
    colorRoot: colors.colorRoot,
    colorText: colors.first,
    colorError: colors.second,
    colorBoxShadow: colors.shadow,
    header: {
        colorText: colors.first,
        colorTextMenu: colors.first,
        colorTextMenuHover: colors.firstLight,
    },
    ui: {
        button: {
            colorDisable: colors.firstLight,
            color: colors.first,
            borderColorHover: colors.third,
            backgroundColor: colors.colorRoot,
            borderColorHoverSubmit: colors.fourth,
            backgroundColorSubmit: colors.fourthLight,
            borderdAlarm: colors.second,
            backgroundAlarm: colors.secondLight,
        },
        link: {
            color: colors.first,
            colorHover: colors.firstLight,
            bgColor: colors.firstLightMore,
            bgColorHover: colors.firstLight,
        },
        input: {
            border: `1px solid ${colors.firstLightMore}`,
            boxShadow: `-2px 2px 3px ${colors.firstLight}`,
        },
        modal: {
            overlay: colors.overlay,
            borderColor: colors.firstLight,
        },
    },
    breakpoint: "init",
    ...breaksPx,
});
