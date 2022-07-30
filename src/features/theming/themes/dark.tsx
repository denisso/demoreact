/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { createThemeSchema, colorsType } from "./themeSchema";
import { themeType } from "./themeType";
/**
 * Light is short for lightness
 */

const colors: colorsType = {
    themeName: "Dark",
    colorRoot: "#5a5a5a",
    first: "#ffffff",
    firstLight: "#7a7a7a",
    firstLightMore: "#353535",
    second: "#fdbfbf",
    secondLight: "#fd4242",
    secondLightMore: "#980000",
    third: "#ff8843",
    thirdLight: "#e97618",
    thirdLightMore: "#7e2e0e",
    fourth: "#6d6dff",
    fourthLight: "#14437c",
    fourthLightMore: "#1a1b53",
    shadow: "rgba(0, 0, 0, .5)",
    overlay: "rgba(255, 255, 255, 0.4)",
};

export const themeDark: themeType = createThemeSchema({ colors });
