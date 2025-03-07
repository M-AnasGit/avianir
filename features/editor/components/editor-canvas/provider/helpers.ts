import { InsertPositionType } from '.';

export const calculateInsertPosition = (
    children: Element[],
    mouse: number,
    direction: 'x' | 'y',
    elementId?: string,
): InsertPositionType | null => {
    let closestElement: Element | null = null;
    let minDistance = Infinity;
    let childPosition = Infinity;

    for (let child of children) {
        if (!child.id) {
            continue;
        }
        if (elementId && child.id === elementId) {
            continue;
        }
        const rect = child.getBoundingClientRect();
        let distance: number;
        if (direction === 'x') {
            const centerX = rect.left + rect.width / 2;
            distance = Math.abs(mouse - centerX);
        } else {
            const centerY = rect.top + rect.height / 2;
            distance = Math.abs(mouse - centerY);
        }

        if (distance < minDistance) {
            minDistance = distance;
            closestElement = child;
            childPosition = parseInt(child.getAttribute('data-position') || '0');
        }
    }
    if (!closestElement) return null;

    let compare_to: number = 0;
    if (direction === 'x') {
        compare_to = closestElement.getBoundingClientRect().left + closestElement.getBoundingClientRect().width / 2;
    } else {
        compare_to = closestElement.getBoundingClientRect().top + closestElement.getBoundingClientRect().height / 2;
    }

    const value_to_update_position = mouse > compare_to ? 1 : 0;
    const newPosition = parseInt(closestElement.getAttribute('data-position') || '0') + value_to_update_position;
    return {
        id: closestElement.id,
        position: newPosition,
    };
};
