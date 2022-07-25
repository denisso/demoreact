/**
 * @description Image without Lazy Loading
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import { PagesContext } from "pages";
import styled from "styled-components";

const Image = React.memo(({ src, alt, width, height, ...props }: any) => {
    const { intersect } = React.useContext(PagesContext);
    const node = React.useRef<HTMLImageElement>();
    const [isIntersecting, setIntersecting] = React.useState(false);
    const error = React.useRef<boolean>(false);
    const attrs = React.useMemo(() => {
        let attrs: any = {};
        if (typeof alt == "string") {
            if (alt.match(/^{.+}$/g)) {
                try {
                    attrs = JSON.parse(alt);
                } catch (err: any) {}
            } else {
                attrs = { alt };
            }
        }
        if (!isNaN(width)) attrs.width = width;
        if (!isNaN(height)) attrs.height = height;

        return attrs;
    }, [alt, height, width]);
    const trigger = React.useCallback(({ entity, unobserve }: any) => {
        if (!node.current || !entity.isIntersecting) return;
        setIntersecting(true);
        unobserve();
    }, []);

    const onLoadRef = React.useCallback(
        (nodeImg: HTMLImageElement) => {
            if (nodeImg && !node.current) {
                node.current = nodeImg;
                intersect.addNodes({ node: node.current, trigger });
            }
        },
        [intersect, trigger]
    );
    React.useEffect(() => {
        return () => {
            if (node.current) intersect.removeNodes(node.current);
        };
    }, [intersect]);
    const onError = React.useCallback(() => {
        if (!node.current) return;
        node.current.src = "/asset/imageLoadingProblem.svg";
        node.current?.classList.add("notloaded");
        error.current = true;
    }, []);
    const onLoad = React.useCallback(() => {
        if (!node.current) return;
        if (!error.current) node.current?.classList.add("loaded");
    }, []);

    return (
        <img
            alt={alt}
            ref={onLoadRef}
            {...(isIntersecting ? { src } : {})}
            {...props}
            {...attrs}
            onLoad={onLoad}
            onError={onError}
        />
    );
});

export const ImageLazy = styled(Image)`
    opacity: 0;
    transition: opacity var(--transition);
    &.loaded {
        opacity: 1;
    }
    &.notloaded {
        opacity: 1;
        border: solid;
    }
`;
