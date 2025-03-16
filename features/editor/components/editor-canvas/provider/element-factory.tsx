'use client';
import React from 'react';
//@DEFAULT-ELEMENTS
import RichContentElement from '../default-elements/rich-content-element';
import ContainerElement from '../default-elements/container-element';
import MediaElement from '../default-elements/media-element';
//@CONSTANTS
import { initialStyles } from '@/features/editor/constants';
import { DEFAULT_FORM_TEXT_STYLES, DEFAULT_STYLES, DUMMY_CONTENT } from '../constants';
//@TYPES
import { ElementTypes, EditorElement, DeviceTypes } from '@/features/editor/types';

import { v4 } from 'uuid';
import FormContainer from '../form-elements/form-container';

class ElementFactory {
    static createElement(type: ElementTypes): EditorElement | null {
        const generateContent = (type: ElementTypes): EditorElement['content'] => {
            if (type === 'container' || type === 'form') {
                return [];
            }

            return {
                ...(type === 'text' && { text: DUMMY_CONTENT['text'] }),
                ...(type === 'table' && { text: DUMMY_CONTENT['table'] }),
            };
        };

        const generateStyle = (type: ElementTypes): React.CSSProperties => ({
            ...initialStyles,
            ...DEFAULT_STYLES[type],
        });

        const generateFormContent = (): EditorElement['formContent'] => ({
            form: {
                title: {
                    value: '<p><strong>Sample form title</strong></p>',
                    style: DEFAULT_FORM_TEXT_STYLES['title'],
                },
                description: {
                    value: '<p>Sample form description</p>',
                    style: DEFAULT_FORM_TEXT_STYLES['description'],
                },
                submit_btn: {
                    value: 'Submit',
                    style: DEFAULT_FORM_TEXT_STYLES['submit_btn'],
                },
            },
        });

        if (!type) return null;

        return {
            id: v4(),
            type,
            name: type,
            stylePerDevice: {
                desktop: generateStyle(type),
                tablet: generateStyle(type),
                mobile: generateStyle(type),
            },
            globalStyle: true,
            content: generateContent(type),
            ...(type === 'form' && { formContent: generateFormContent() }),
        };
    }

    static renderElement = (element: EditorElement, activeDevice: DeviceTypes): React.ReactNode => {
        const { type, stylePerDevice } = element;

        switch (type) {
            case 'container':
                return (
                    Array.isArray(element.content) && (
                        <ContainerElement style={stylePerDevice[activeDevice]} content={element.content} />
                    )
                );
            case 'text':
                return (
                    !Array.isArray(element.content) && (
                        <RichContentElement style={stylePerDevice[activeDevice]} content={element.content} />
                    )
                );
            case 'table':
                return (
                    !Array.isArray(element.content) && (
                        <RichContentElement style={stylePerDevice[activeDevice]} content={element.content} />
                    )
                );
            case 'image':
                return (
                    !Array.isArray(element.content) && (
                        <MediaElement
                            mediaType="image"
                            style={stylePerDevice[activeDevice]}
                            content={element.content}
                        />
                    )
                );
            case 'video':
                return (
                    !Array.isArray(element.content) && (
                        <MediaElement
                            mediaType="video"
                            style={stylePerDevice[activeDevice]}
                            content={element.content}
                        />
                    )
                );
            case 'audio':
                return (
                    !Array.isArray(element.content) && (
                        <MediaElement
                            mediaType="audio"
                            style={stylePerDevice[activeDevice]}
                            content={element.content}
                        />
                    )
                );
            case 'form':
                return (
                    element.formContent &&
                    element.formContent.form && (
                        <FormContainer formDetails={element.formContent.form} style={stylePerDevice[activeDevice]} />
                    )
                );
            default:
                return null;
        }
    };
}

export default ElementFactory;
