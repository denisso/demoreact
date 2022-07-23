/**
 * 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react"
import { WrapperComponents } from "pages/PageWrapper";
import { ThemeProvider } from "features/theming";

function App() {
    return (
        <>
            <ThemeProvider>
                <WrapperComponents />
            </ThemeProvider>
        </>
    );
}

export default React.memo(App);
