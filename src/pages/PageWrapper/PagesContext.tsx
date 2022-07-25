/**
 * PagesContext
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
export type PagesContextType = {
    /**
     * Interface for intersection observer
     * ./components/Tools/IntersectionOserver/index.tsx
     */
    intersect: {
        // add node to intersection observer
        addNodes: ({
            // target element
            node,
            // triggered if the target element intersects with the intersection observer's root
            trigger,
        }: {
            node: HTMLElement;
            /**
             * entity - IntersectionObserverEntry
             * unobserve - IntersectionObserver.unobserve()
             */
            trigger: ({
                entity,
                unobserve,
            }: {
                entity: IntersectionObserverEntry;
                unobserve: (node: HTMLElement) => void;
            }) => void;
        }) => void;
        // add node from intersection observer
        removeNodes: (value: HTMLElement) => void;
    };
};
export const PagesContext = React.createContext<PagesContextType>({
    intersect: {
        addNodes: (arg) => {},
        removeNodes: (arg) => {},
    },
});
