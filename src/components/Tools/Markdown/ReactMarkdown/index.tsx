/**
 * Adapter for ReactMarkdown
 */
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "highlight.js/styles/github.css";
import { visit } from "unist-util-visit";
import remarkDirective from "remark-directive";
import rehypeHighlight from "rehype-highlight";

const customTagsPlugin = () => {
    const nodes = ["iframe"];
    return function transformer(tree: any) {
        const visitor: any = (node: any) => {
            if (!nodes.includes(node.name)) return;
            const data = node.data || (node.data = {});
            data.hName = "iframe";
            data.hProperties = {
                ...node.attributes,
            };
        };

        visit(tree, ["containerDirective"], visitor);
    };
};

const MarkdownComponent = ({ markdown, className, components }: any) => {
    return (
        <div {...{ className }}>
            <ReactMarkdown
                remarkPlugins={[remarkDirective, customTagsPlugin]}
                rehypePlugins={[rehypeHighlight]}
                components={components}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
};

export const Markdown = React.memo(MarkdownComponent);
