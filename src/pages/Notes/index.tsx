/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import { Outlet } from "react-router-dom";
import React from "react";
import { ContextNotes } from "./ContextNotes";
import { scrollContent } from "components/Tools";

export const Notes = React.memo(() => {
    const [currentHeader, setCurrentHeader] = React.useState(-1);
    React.useEffect(() => {
        document.title = "Notes";
        scrollContent(0);
    }, []);
    const refHeaders = React.useRef<any[]>([]);
    return (
        <ContextNotes.Provider
            value={{
                currentHeader,
                refHeaders,
                setCurrentHeader,
            }}
        >
            <Outlet />
        </ContextNotes.Provider>
    );
});
