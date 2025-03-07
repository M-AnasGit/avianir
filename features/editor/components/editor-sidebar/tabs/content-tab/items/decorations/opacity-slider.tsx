'use client';
//@SHADCNUI
import { Slider } from '@/components/ui/slider';
//@CUSTOM COMPONENTS
import { useContent } from '../../provider';

const renderOpacity = (value: number) => {
    return Math.round(value).toString() + '%';
};

export default function OpacitySlider() {
    const { currentStyle: style, handleStyleChange } = useContent();

    const handleOpacityChange = (value: number) => {
        handleStyleChange({
            target: {
                id: 'opacity',
                value: renderOpacity(value),
            },
        });
    };

    return (
        <section className="prop-container">
            <div className="flex justify-between">
                <h5 className="prop-label">Opacity</h5>
                <small className="text-muted-foreground">
                    {renderOpacity(parseInt(style.opacity as string) ?? 100)}
                </small>
            </div>
            <Slider
                aria-label={'Opacity'}
                min={0}
                max={1}
                step={0.01}
                defaultValue={[parseInt(style.opacity as string) ?? 100]}
                onValueChange={(v) => handleOpacityChange(v[0] * 100)}
            />
        </section>
    );
}
