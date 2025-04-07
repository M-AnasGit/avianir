'use client';
import React from 'react';
//@SHADCNUI
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
//@CUSTOM COMPONENTS
import Layer from './layer';
import ContextMenuWrapper from '@/services/editor/context-menu-wrapper';
//@CUSTOM HOOKS
import { useEditor } from '@/services/editor/provider';
//@TYPES
import { EditorElement } from '@/services/editor/types';

export default function LayersTab() {
    const { state, dispatch } = useEditor();

    const [currentContainer, setCurrentContainer] = React.useState<EditorElement>(state.editor.elements[0]);
    const pathToCurrentContainer = React.useMemo<{ name: string; id: string }[]>(() => {
        const queue: [EditorElement, { name: string; id: string }[]][] = [
            [
                state.editor.elements[0],
                [
                    {
                        name: state.editor.elements[0].name,
                        id: state.editor.elements[0].id,
                    },
                ],
            ],
        ];
        while (queue.length > 0) {
            const [currentElement, path] = queue.shift() ?? [null, []];

            if (!currentElement || !currentElement.content || !Array.isArray(currentElement.content)) {
                continue;
            }

            if (currentElement.id === currentContainer.id) {
                return path;
            }

            currentElement.content.forEach((ele) => {
                if (Array.isArray(ele.content)) {
                    queue.push([
                        ele,
                        [
                            ...path,
                            {
                                name: ele.name,
                                id: ele.id,
                            },
                        ],
                    ]);
                }
            });
        }
        return [];
    }, [currentContainer]);

    const handleChangeCurrentContainerToNestedContainer = (id: string) => {
        if (!Array.isArray(currentContainer.content)) return;
        const element = currentContainer.content.find((ele) => ele.id === id);

        if (element && Array.isArray(element.content)) {
            setCurrentContainer(element);
        }
    };
    const handleChangeCurrentContainerToParentContainer = (index: number) => {
        const path = pathToCurrentContainer.slice(0, index + 1);

        let current = state.editor.elements[0];
        for (let i = 1; i < path.length; i++) {
            if (!Array.isArray(current.content)) return;

            const temp = path[i];
            current = current.content.find((ele) => ele.id === temp.id) ?? current;
        }

        setCurrentContainer(current);
        dispatch({
            type: 'CHANGE_CLICKED_ELEMENT',
            payload: {
                elementId: current.id,
            },
        });
    };

    React.useEffect(() => {
        setCurrentContainer(() => {
            let current = state.editor.elements[0];
            for (let i = 1; i < pathToCurrentContainer.length; i++) {
                if (!Array.isArray(current.content)) return current;

                const temp = pathToCurrentContainer[i];
                current = current.content.find((ele) => ele.id === temp.id) ?? current;
            }

            return current;
        });
    }, [state.editor.elements]);

    if (state.editor.elementsMap.size <= 1) {
        return (
            <p className="prop-small" role="alert">
                Add elements to the canvas
            </p>
        );
    }

    return (
        <div className="flex w-[280px] flex-col gap-2">
            <Breadcrumb className="pb-4 pt-2">
                <BreadcrumbList>
                    {pathToCurrentContainer.map((path, i) => (
                        <React.Fragment key={i}>
                            <BreadcrumbItem className="cursor-pointer select-none">
                                <BreadcrumbLink onClick={() => handleChangeCurrentContainerToParentContainer(i)}>
                                    {path.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {i < pathToCurrentContainer.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>

            <ContextMenuWrapper allowed={new Set(['paste'])} ele={currentContainer}>
                <div className="flex h-full flex-col gap-4 pb-64">
                    {Array.isArray(currentContainer.content) &&
                        currentContainer.content.map((ele, i) => (
                            <Layer
                                key={i}
                                ele={ele}
                                handleChangeContainer={handleChangeCurrentContainerToNestedContainer}
                            />
                        ))}
                </div>
            </ContextMenuWrapper>
        </div>
    );
}
