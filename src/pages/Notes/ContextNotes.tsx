/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";

export type ContextNotesType = {
    /**
     * const [currentHeader, setCurrentHeader] = useState()
     * the current header highlighted in the table of contents navbar
     */
    currentHeader: number;
    setCurrentHeader: (currentHeader: number) => void;
    // ReactRef Ref<Array<HTMLElement>> array headers
    refHeaders: { current: HTMLElement[] };
};

export const ContextNotes = React.createContext<ContextNotesType>({
    refHeaders: { current: [] },
    currentHeader: -1,
    setCurrentHeader: (value: number) => value,
});
