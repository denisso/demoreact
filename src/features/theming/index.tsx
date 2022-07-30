/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

export {
    reducerTheming,
    selectTheme,
    switchTheme,
    applyViewportResize,
} from "./reducer";

export { ThemeProvider } from "./ThemeProvider";

export type { themeType } from "./themes/themeType";
export { themeLight } from "./themes/light";
export { themeDark } from "./themes/dark";

export {
    breaksNumber,
    breaksPx,
    mUp,
    mDown,
    mOnly,
} from "./themes/breakpoints";
