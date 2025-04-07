'use client';
type Props = {
    id: string;
    insertPosition: {
        id: string;
        position: number;
    } | null;
    hoveredElement: HTMLElement | null;
    index: number;
    flexDirection: React.CSSProperties['flexDirection'] | undefined;
    canvasRef: React.RefObject<HTMLDivElement | null>;
};

export default function InsertIndicator({
    id,
    index,
    insertPosition,
    hoveredElement,
    flexDirection,
    canvasRef,
}: Props) {
    return (
        id !== '_body' &&
        hoveredElement &&
        hoveredElement.id !== id &&
        insertPosition?.id === id &&
        insertPosition.position === index &&
        (flexDirection?.includes('row') ? (
            <span
                className="mx-1 w-2 rounded-full bg-blue-500"
                style={{
                    height: canvasRef.current?.clientHeight || 0,
                }}
            />
        ) : (
            <span
                className="mx-auto my-1 h-1 rounded-full bg-blue-500"
                style={{
                    width: (canvasRef.current?.clientWidth || 0) / 2,
                }}
            />
        ))
    );
}
