'use client';
import { useCanvas } from '.';

type Props = {
    id: string;
    index: number;
    flexDirection: React.CSSProperties['flexDirection'] | undefined;
    canvasRef: React.RefObject<HTMLDivElement | null>;
};

export default function InsertIndicator({ id, index, flexDirection, canvasRef }: Props) {
    const { insertPosition, hoveredElement } = useCanvas();

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
