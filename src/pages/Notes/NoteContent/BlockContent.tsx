/**
 * Component for displays only content post
 * additional feature: this component source of truth for the currently displayed header
 * current header stored in context "ContextNotes" as number
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { NoteDataType } from "mocks/data/notes";
import styled from "styled-components";
import { Markdown } from "components/Tools/Markdown";
import { ContextNotes } from "../ContextNotes";
import { useHeadersReducer } from "./useHeadersReducer";
import { PagesContext } from "pages";
import { ImageLazy } from "components/Elements/ImageLazy";
import { scrollContent } from "components/Tools";
import { createSlug } from "tools/createSlug";
import { Anchor } from "components/Elements/Anchor";

const ArticleBox = styled.div`
    line-height: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .ArticleTitle {
        font-size: 2rem;
        text-align: center;
        margin: 1rem 0;
        font-weight: bold;
        line-height: 2.5rem;
    }
    .articlePublishedAt {
        font-weight: bold;
    }
    hr {
        display: block;
        width: 50%;
        margin: 1rem auto;
    }
    img {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 0.5rem auto;
    }
    .ArticleMeta {
        display: inline-flex;
        border: solid ${({ theme }) => theme.colors.firstLight};
        border-radius: var(--borderRadiusInput);
        padding: 0 1rem;
        margin: 1rem auto;
        align-items: center;
        & > * + * {
            margin-left: 1rem;
        }
    }
    .ArticleContent {
        display: flex;
        flex-direction: column;
        ul {
            margin-left: 3rem;
        }
        h1 {
            line-height: 2.0rem;
        }
        h2 {
            line-height: 1.8rem;
        }
        h3,h4,h5,h6 {
            line-height: 2.3rem;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            padding: 60px 0 1rem;
        }

        a:hover:after {
            content: "#";
        }
        p {
            text-indent: 2rem;
            margin: 0.5rem 0;
        }
        pre {
            word-wrap: break-word;
            white-space: pre-wrap;
            margin: 1rem auto;
        }
        img {
            max-width: 90%;
            display: block;
            margin: 1rem auto;
        }
    }
`;

/**
 *
 * Container for display content in markdown format
 */
export const BlockContent = ({
    data,
    className,
}: {
    data: NoteDataType;
    className: string;
}) => {
    const { setCurrentHeader, refHeaders } = React.useContext(ContextNotes);
    const { intersect } = React.useContext(PagesContext);
    const { state, dispatch } = useHeadersReducer();
    const [contentReady, setReady] = React.useState(false);
    // changing the index current header when scrolling
    React.useEffect(() => {
        setCurrentHeader(state.value);
    }, [state]);

    // unmount component and remove nodes from intersector observer
    React.useEffect(() => {
        return () => {
            refHeaders.current.forEach((e: any) => intersect.removeNodes(e));
            refHeaders.current = [];
            setCurrentHeader(-1);
        };
    }, []);

    // get intersection entry from intersection observer
    const handleHeader = React.useCallback(
        ({ entity }) => {
            const indxTriggered = refHeaders.current.indexOf(entity.target);
            dispatch({
                type: "changeCurrentHeader",
                payload: { indxTriggered, entity },
            });
        },
        [dispatch]
    );

    // add nodes header to use intersect hook
    const addNodeToIntersect = React.useCallback((node) => {
        if (node) {
            intersect.addNodes({ node, trigger: handleHeader });
            refHeaders.current.push(node);
        }
    }, []);

    // components for markdown
    const markdownComponents = React.useMemo(() => {
        // case ## header (default)
        const childrenText = ({ node, className, children, props }: any) => {
            let slug = createSlug(node.children[0].value);

            return (
                <node.tagName
                    ref={addNodeToIntersect}
                    {...props}
                    {...{ className }}
                    id={slug}
                >
                    <a href={`#${slug}`}>{node.children[0].value}</a>
                </node.tagName>
            );
        };
        const childrenAHREF = ({ node, className, children, props }: any) => {
            let text = node.children[0]?.props?.children[0];
            let href = node.children[0]?.props?.href;
            let id = href === "#" ? href.slice(1) : href;

            return (
                <node.tagName
                    ref={addNodeToIntersect}
                    {...props}
                    {...{ className }}
                    id={id}
                >
                    <a href={href}>{text}</a>
                </node.tagName>
            );
        };
        const headerParser = ({ node, className, children, ...props }: any) => {
            try {
                // case ##
                if (node.children.length === 0) return <></>;
                // case ## header (default)
                if (node.children[0].type === "text")
                    return childrenText({ node, className, children, props });
                // case ## [Header 1](#anchor-for-url-1)
                if (node.children[0].type === "a")
                    return childrenAHREF({ node, className, children, props });
            } catch (err) {}
            // for other case
            return <></>;
        };
        return {
            h1: headerParser,
            h2: headerParser,
            h3: headerParser,
            h4: headerParser,
            h5: headerParser,
            h6: headerParser,
            img({ node, ...props }: any) {
                return <ImageLazy {...props} />;
            },
        };
    }, []);

    return (
        <ArticleBox
            className={className}
            ref={(node: any) => {
                if (node && !contentReady) {
                    dispatch({
                        type: "ready",
                        payload: {
                            headers: refHeaders,
                        },
                    });
                    setReady(true);
                    const loation = window.location || document.location;
                    if (loation.hash) {
                        try {
                            const $lement = document.querySelector(
                                loation.hash
                            );
                            if ($lement) {
                                scrollContent(
                                    $lement.getBoundingClientRect().top
                                );
                            }
                        } catch (e) {}
                    }
                }
            }}
        >
            <h1 className="ArticleTitle">{data.title}</h1>
            <hr />
            <ImageLazy
                src={data.image.src}
                alt="Article image"
                width="500"
                height="300"
            />
            <div className="ArticleMeta">
                <div className="Original">
                    <span>Original article: </span>
                    <Anchor href={data?.original?.ref} target="_blank">
                        {data?.original?.name}
                    </Anchor>
                </div>
                <div className="Author">
                    <span>written by: </span>
                    <Anchor href={data.author.ref} target="_blank">
                        {data.author.name}
                    </Anchor>
                </div>
                <div className="WriteAt">
                    {`${new Date(data.createdAt).getFullYear()} /
                        ${new Date(data.createdAt).getMonth() + 1} /
                        ${new Date(data.createdAt).getDate()}`}
                </div>
            </div>
            <Markdown
                markdown={data.content}
                className="ArticleContent"
                components={markdownComponents}
            />

            <hr />
        </ArticleBox>
    );
};
