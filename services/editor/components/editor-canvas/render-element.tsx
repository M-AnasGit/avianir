'use client';
import React from 'react';
import BaseElement from './base-element';
//@DEFAULT-ELEMENTS
import RichContentElement from './default-elements/rich-content-element';
import MediaElement from './default-elements/media-element';
import MediaLoading from './default-elements/media-element/media-loading';
//@FORM-ELEMENTS
import FormContainer from './form-elements/form-container';
import FormInput from './form-elements/input';
import FormRadio from './form-elements/radio';
import FormCheckbox from './form-elements/checkbox';
//@CONSTANTS
import { INITIAL_STYLES } from '@/services/editor/constants';
//@TYPES
import { DeviceTypes, EditorElement } from '../../types';

type Props = {
    index: number;
    element: EditorElement;
    activeDevice: DeviceTypes;
    preset?: boolean;
};

export default function RenderElementComponent({ index, element, activeDevice, preset }: Props) {
    const { type, stylePerDevice } = element;

    const currentStyle = React.useMemo(
        () => ({
            ...INITIAL_STYLES,
            ...stylePerDevice[activeDevice],
        }),
        [stylePerDevice, activeDevice],
    );

    const children = React.useMemo(() => {
        switch (type) {
            case 'container':
                return (
                    Array.isArray(element.content) && (
                        <div className="h-full w-full" data-property="container" style={currentStyle}>
                            {element.content.map((ele, i) => (
                                <RenderElementComponent
                                    key={i}
                                    index={i}
                                    element={ele}
                                    activeDevice="desktop"
                                    preset={preset}
                                />
                            ))}
                        </div>
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
                            preset={!!preset}
                        >
                            {element.content.map((ele, i) => (
                                <RenderElementComponent
                                    key={i}
                                    index={i}
                                    element={ele}
                                    activeDevice="desktop"
                                    preset={preset}
                                />
                            ))}
                        </FormContainer>
                    )
                );
            case 'text':
            case 'table':
                return (
                    !Array.isArray(element.content) && (
                        <RichContentElement style={currentStyle} content={element.content} />
                    )
                );
            case 'image':
            case 'video':
            case 'audio':
                return (
                    !Array.isArray(element.content) &&
                    (!!preset ? (
                        <MediaLoading style={currentStyle} />
                    ) : (
                        <MediaElement mediaType={type} style={currentStyle} content={element.content} />
                    ))
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
            case 'checkbox':
                return (
                    element.formContent &&
                    element.formContent.radio_checkbox &&
                    !Array.isArray(element.content) &&
                    (type === 'radio' ? (
                        <FormRadio
                            id={element.id}
                            radioDetails={element.formContent.radio_checkbox}
                            style={currentStyle}
                        />
                    ) : (
                        <FormCheckbox
                            id={element.id}
                            radioDetails={element.formContent.radio_checkbox}
                            style={currentStyle}
                        />
                    ))
                );
            default:
                return null;
        }
    }, [type, element, currentStyle, preset]);

    return (
        <BaseElement index={index} ele={element} flexDirection={stylePerDevice[activeDevice].flexDirection}>
            {children}
        </BaseElement>
    );
}
