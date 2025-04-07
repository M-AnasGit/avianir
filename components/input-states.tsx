import React from 'react';

type Props = {
    state: InputStates;
    backgroundColor: string;
    foregroundColor: string;
};

export default function InputStates({ state, backgroundColor, foregroundColor }: Props) {
    const message = React.useMemo(() => {
        switch (state) {
            case 'success':
                return 'The input field is in a success state.';
            case 'error':
                return 'The input field is in an error state.';
            case 'warning':
                return 'The input field is in a warning state.';
            default:
                return 'The input field is in a default state.';
        }
    }, [state]);

    return (
        <div
            style={{
                backgroundColor,
                color: foregroundColor,
                padding: '1rem',
                borderRadius: '0.5rem',
                margin: '1rem 0',
            }}
        >
            <p className="font-semibold">{message}</p>
        </div>
    );
}
