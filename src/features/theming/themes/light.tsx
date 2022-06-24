import { createThemeSchema, colorsType } from "./themeSchema";

const colors: colorsType = {
    colorRoot: "#fff",
    first: "#222222",
    firstLight: "#7a7a7a",
    firstLightMore: "#dddddd",
    second: "#980000",
    secondLight: "#ff9595",
    secondLightMore: "#fdbfbf",
    third: "#f07e3c",
    thirdLight: "#fed196",
    thirdLightMore: "#ffedd2",
    fourth: "#0000FF",
    fourthLight: "#88beff",
    fourthLightMore: "#cee4ff",
    shadow: "rgba(0, 0, 0, .5)",
    overlay: "rgba(255, 255, 255, 0.4)",
};

export const themeLight = createThemeSchema({ colors });
