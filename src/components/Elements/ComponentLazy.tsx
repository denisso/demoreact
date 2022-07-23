/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import styled from "styled-components";
import { PagesContext, PagesContextType } from "pages";

const Wrapper = styled.div`

    transform: translateY(50px);
    opacity: 0;
    transition: transform var(--transition), opacity var(--transition);

    &.visible {
        transform: translateY(0px);
        opacity: 1;
    }
`;

export const ComponentLazy = React.memo(({ className, children }: any) => {
    const { intersect }: PagesContextType = React.useContext(PagesContext);
    const componentRef = React.useRef<HTMLElement>();
    const [visible, setVisible] = React.useState(false);
    const trigger = React.useCallback(({ entity, unobserve }: any) => {
        if (!componentRef.current) return;
        if (entity.isIntersecting) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, []);
    React.useEffect(() => {
        return () => {
            if (componentRef.current) {
                intersect.removeNodes(componentRef.current);
            }
        };
    }, [intersect]);
    const componentRefCb = React.useCallback((node: any) => {
        if (node) {
            componentRef.current = node;
            intersect.addNodes({ node, trigger });
        }
    }, [intersect, trigger]);

    return (
        <Wrapper
            className={
                (visible ? "visible" : "") + (className ? " " + className : "")
            }
            ref={componentRefCb}
        >
            {children}
        </Wrapper>
    );
});
