import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer } from '@tiptap/react';
import { MathJax } from 'better-react-mathjax';
import React, { useState } from 'react';

const MathComponent = ({ node, updateAttributes, deleteNode }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formula, setFormula] = useState(node.attrs.formula);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value === '') {
            deleteNode();
        }
        setFormula(e.target.value);
    };

    const handleBlur = () => {
        updateAttributes({ formula });
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            updateAttributes({ formula });
            setIsEditing(false);
        }
    };

    return (
        <NodeViewWrapper as="span" className="math-node" onDoubleClick={handleDoubleClick}>
            {isEditing ? (
                <textarea
                    value={formula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    style={{
                        border: '1px solid hsl(var(--muted-foreground))',
                        borderRadius: '4px',
                        backgroundColor: 'hsl(var(--muted))',
                        padding: '2px',
                        fontSize: '1rem',
                        width: '100%',
                    }}
                />
            ) : (
                <MathJax inline dynamic>
                    {`\\(${node.attrs.formula.replace(/\\\\/g, '\\')}\\)`}
                </MathJax>
            )}
            <NodeViewContent as="span" />
        </NodeViewWrapper>
    );
};

export const MathExtension = Node.create({
    name: 'math',
    group: 'inline',
    inline: true,
    addAttributes() {
        return {
            formula: {
                default: '\\frac{a}{b}',
            },
        };
    },
    parseHTML() {
        return [{ tag: 'span[data-math]' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(HTMLAttributes, { 'data-math': true })];
    },
    addNodeView() {
        return ReactNodeViewRenderer(MathComponent);
    },
});
