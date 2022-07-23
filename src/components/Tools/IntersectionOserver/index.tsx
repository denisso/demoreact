/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { useDispatch } from "react-redux";
import { setProp } from "features/settings/reducer";
export const useIntersection = () => {
    const refArrayNodes = React.useRef(new Map());
    const refObserver = React.useRef<any>(null);

    const dispatch = useDispatch();
    React.useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2,
        };
        refObserver.current = new IntersectionObserver((entities) => {
            for (let indx = 0; indx < entities.length; indx++) {
                const { target } = entities[indx];
                if (refArrayNodes.current.has(target)) {
                    const trigger = refArrayNodes.current.get(target);
                    if (trigger) {
                        trigger({
                            entity: entities[indx],
                            unobserve: () => {
                                refObserver.current.unobserve(target);
                            },
                        });
                    }
                }
            }
        }, options);

        dispatch(setProp({ id: "isReadyObserver", value: true }));
    }, [dispatch]);

    const addNodes = React.useCallback(
        ({
            node,
            trigger,
        }: {
            node: any;
            trigger: ({
                entity,
                unobserve,
            }: {
                entity: IntersectionObserverEntry;
                unobserve: () => {};
            }) => void;
        }) => {
            refObserver.current.observe(node);
            if (node !== null) refArrayNodes.current.set(node, trigger);
        },
        []
    );

    const removeNodes = React.useCallback((node) => {
        refObserver.current.unobserve(node);
        if (refArrayNodes.current.has(node)) {
            refArrayNodes.current.delete(node);
        }
    }, []);
    return {
        addNodes,
        removeNodes,
    };
};
