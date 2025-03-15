type Color = {
    light: string;
    dark: string;
};

type TextValueWithStyle = {
    value: string;
    style: React.CSSProperties;
};

type Palette = {
    default: {
        text: Color;
        link: Color;
        quote: Color;
        'code keyword': Color;
        'code variable': Color;
        'code number': Color;
        'code string': Color;
        'code title': Color;
        'code comment': Color;
        'code background': Color;
        'table header': Color;
        'table select': Color;
        'table border color': Color;
    };
    custom: Record<string, Color>;
};
