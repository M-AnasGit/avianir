'use client';
import React from 'react';
import { v4 } from 'uuid';
//@DEFAULT-ELEMENTS
import RichContentElement from '../default-elements/rich-content-element';
import ContainerElement from '../default-elements/container-element';
import MediaElement from '../default-elements/media-element';
import FormContainer from '../form-elements/form-container';
import FormInput from '../form-elements/input';
import FormRadio from '../form-elements/radio';
import FormCheckbox from '../form-elements/checkbox';
//@CONSTANTS
import { INITIAL_STYLES, DEFAULT_FORM_CONTENT, DEFAULT_STYLES, DUMMY_CONTENT } from '../constants';
//@TYPES
import { ElementTypes, EditorElement, DeviceTypes } from '@/features/editor/types';

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

        if (!type || !DEFAULT_FORM_CONTENT) return null;

        return {
            id: v4(),
            type,
            name: type,
            stylePerDevice: {
                desktop: DEFAULT_STYLES[type],
                tablet: DEFAULT_STYLES[type],
                mobile: DEFAULT_STYLES[type],
            },
            globalStyle: true,
            content: generateContent(type),
            ...(type === 'form' && {
                formContent: {
                    form: DEFAULT_FORM_CONTENT['form'],
                },
            }),
            ...(type === 'input' && {
                formContent: {
                    input: DEFAULT_FORM_CONTENT['input'],
                },
            }),
            ...(type === 'radio' && {
                formContent: {
                    radio_checkbox: DEFAULT_FORM_CONTENT['radio_checkbox'],
                },
            }),
            ...(type === 'checkbox' && {
                formContent: {
                    radio_checkbox: DEFAULT_FORM_CONTENT['radio_checkbox'],
                },
            }),
        };
    }

    static renderElement = (element: EditorElement, activeDevice: DeviceTypes): React.ReactNode => {
        const { type, stylePerDevice } = element;

        const currentStyle = React.useMemo(
            () => ({
                ...INITIAL_STYLES,
                ...stylePerDevice[activeDevice],
            }),
            [activeDevice],
        );

        switch (type) {
            case 'container':
                return (
                    Array.isArray(element.content) && (
                        <ContainerElement style={currentStyle} content={element.content} />
                    )
                );
            case 'text':
                return (
                    !Array.isArray(element.content) && (
                        <RichContentElement style={currentStyle} content={element.content} />
                    )
                );
            case 'table':
                return (
                    !Array.isArray(element.content) && (
                        <RichContentElement style={currentStyle} content={element.content} />
                    )
                );
            case 'image':
                return (
                    !Array.isArray(element.content) && (
                        <MediaElement mediaType="image" style={currentStyle} content={element.content} />
                    )
                );
            case 'video':
                return (
                    !Array.isArray(element.content) && (
                        <MediaElement mediaType="video" style={currentStyle} content={element.content} />
                    )
                );
            case 'audio':
                return (
                    !Array.isArray(element.content) && (
                        <MediaElement mediaType="audio" style={currentStyle} content={element.content} />
                    )
                );
            case 'form':
                return (
                    element.formContent &&
                    element.formContent.form &&
                    Array.isArray(element.content) && (
                        <FormContainer
                            formDetails={element.formContent.form}
                            style={currentStyle}
                            content={element.content}
                        />
                    )
                );
            case 'input':
                return (
                    element.formContent &&
                    element.formContent.input &&
                    !Array.isArray(element.content) && (
                        <FormInput id={element.id} inputDetails={element.formContent.input} style={currentStyle} />
                    )
                );
            case 'radio':
                return (
                    element.formContent &&
                    element.formContent.radio_checkbox &&
                    !Array.isArray(element.content) && (
                        <FormRadio
                            id={element.id}
                            radioDetails={element.formContent.radio_checkbox}
                            style={currentStyle}
                        />
                    )
                );
            case 'checkbox':
                return (
                    element.formContent &&
                    element.formContent.radio_checkbox &&
                    !Array.isArray(element.content) && (
                        <FormCheckbox
                            id={element.id}
                            radioDetails={element.formContent.radio_checkbox}
                            style={currentStyle}
                        />
                    )
                );
            default:
                return null;
        }
    };
}

export default ElementFactory;
