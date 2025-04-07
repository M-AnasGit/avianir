//@CUSTOM COMPONENTS
import PresetsTab from './presets';
import PaletteTab from './palette';

export const CONFIG_TAB_ITEM: Record<string, React.ReactNode> = {
    presets: <PresetsTab />,
    'default palette': <PaletteTab isDefault={true} />,
    'custom palette': <PaletteTab isDefault={false} />,
};
