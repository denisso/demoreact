/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { useDispatch } from "react-redux";
import { setProp } from "features/settings/reducer";
export type TNode = {
    node: Element;
    trigger: ({
        entity,
        unobserve,
    }: {
        entity: IntersectionObserverEntry;
        unobserve: () => void;
    }) => void;
};
export const useIntersection = () => {
    const refArrayNodes = React.useRef(
        new Map<TNode["node"], TNode["trigger"]>()
    );
    const refObserver = React.useRef<IntersectionObserver>();
    const dispatch = useDispatch();
    React.useEffect(() => {
        const options = {
            root: null,
            rootMargin: "50px 0px",
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
                                refObserver?.current?.unobserve(target);
                            },
                        });
                    }
                }
            }
        }, options);
        dispatch(setProp({ id: "isReadyObserver", value: true }));
    }, [dispatch]);

    const addNodes = ({ node, trigger }: TNode) => {
        if (node !== null) {
            refObserver?.current?.observe(node);
            refArrayNodes.current.set(node, trigger);
        }
    };

    const removeNodes = (node: Element) => {
        refObserver?.current?.unobserve(node);
        if (refArrayNodes.current.has(node)) {
            refArrayNodes.current.delete(node);
        }
    };
    return {
        addNodes,
        removeNodes,
    };
};
