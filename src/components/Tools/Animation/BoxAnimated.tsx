/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import styled from "styled-components";

const useAnimateBlocks = () => {
    const refBlock = React.useRef<any>(null);
    const stop = React.useRef<boolean>(false);
    const [refreshState, setRefresh] = React.useState({});
    React.useEffect(() => {
        if (refBlock.current === null) return;
        let content: any = [];
        let items: any = [];
        for (let i = 0; i < refBlock.current.childNodes.length; i++) {
            const element = refBlock.current.childNodes[i];
            if (
                element.classList.contains("ItemAnimated") &&
                element.childNodes.length
            ) {
                items.push(element);
                content.push(element.childNodes[0]);
            }
        }

        for (let i = 0; i < content.length; i++) {
            content[i].style.width = items[i].offsetWidth + "px";
            content[i].style.height = items[i].offsetHeight + "px";
            content[i].style.top =
                items[i].offsetTop - content[i].offsetTop + "px";
            content[i].style.left =
                items[i].offsetLeft - content[i].offsetLeft + "px";
        }
        const animEasy = (attrName: string, offsetName: string, i: number) => {
            content[i].style[attrName] = items[i][offsetName] + "px";
        };

        const animateItems = () => {
            for (let i = 0; i < content.length; i++) {
                animEasy("width", "offsetWidth", i);
                animEasy("top", "offsetTop", i);
                animEasy("left", "offsetLeft", i);
            }

            if (stop.current === true) {
                content = null;
                items = null;
            } else {
                setTimeout(animateItems, 200);
            }
        };
        animateItems();
    }, [refreshState]);
    const refresh = React.useCallback(() => {
        setRefresh({});
    }, []);
    const uninstall = React.useCallback(() => {
        stop.current = true;
    }, []);
    const install = React.useCallback((node) => {
        refBlock.current = node;
        setRefresh({});
    }, []);
    return { install, refresh, uninstall };
};
const Content = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    transition: top var(--transition), left var(--transition),
        width var(--transition);
`;

export const ItemAnimated = React.memo(({ children, className }: any) => {
    const arrayComponents = React.Children.toArray(children);
    return (
        <div
            className={className ? `${className} ItemAnimated` : "ItemAnimated"}
        >
            {React.Children.map(
                arrayComponents,
                (child: any, index: number) => {
                    return (
                        <Content className="ItemAnimatedContent">
                            <child.type
                                {...child.props}
                                key={index}
                                index={index}
                            >
                                {child.props.children}
                            </child.type>
                        </Content>
                    );
                }
            )}
        </div>
    );
});

export const BoxAnimated = React.memo(({ children, className }: any) => {
    const refParentBox = React.useRef<any>(null);
    const { install, refresh, uninstall } = useAnimateBlocks();
    React.useEffect(() => {
        // recreate elements
        refresh();
    }, [children, refresh]);
    React.useEffect(() => {
        return () => {
            // uninstall component
            uninstall();
        };
    }, [uninstall]);
    return (
        <div
            {...{ className }}
            ref={(node) => {
                if (node && !refParentBox.current) {
                    refParentBox.current = node;
                    install(refParentBox.current);
                }
            }}
            style={{ position: "relative" }}
        >
            {children}
        </div>
    );
});
