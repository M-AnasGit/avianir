import { MediaType } from './types';

export const MAX_SIZES: Record<string, number> = {
    image: 5 * 1024 * 1024,
    video: 1 * 1024 * 1024 * 1024,
    audio: 50 * 1024 * 1024,
};

export const INPUT_FILE_TYPES: Record<MediaType, string> = {
    image: 'image/webp, image/avif, image/jpeg, image/png',
    video: 'video/webm, video/mp4',
    audio: 'audio/ogg, audio/mp3, audio/aac',
};

export const DEFAULT_PALETTE: Palette = {
    default: {
        text: {
            light: '#222222',
            dark: '#EAEAEA',
        },
        link: {
            light: '#0077CC',
            dark: '#66BFFF',
        },
        quote: {
            light: '#555555',
            dark: '#BBBBBB',
        },
        'btn text': {
            light: '#FFFFFF',
            dark: '#FFFFFF',
        },
        'btn background': {
            light: '#0366D6',
            dark: '#58A6FF',
        },
        'input text': {
            light: '#24292E',
            dark: '#E1E4E8',
        },
        'input border': {
            light: '#E1E4E8',
            dark: '#30363D',
        },
        'input background': {
            light: '#FAFBFC',
            dark: '#0D1117',
        },
        'success background': {
            light: '#D4EDDA',
            dark: '#1E4620',
        },
        'success foreground': {
            light: '#155724',
            dark: '#A3E635',
        },
        'warning background': {
            light: '#FFF3CD',
            dark: '#664D03',
        },
        'warning foreground': {
            light: '#856404',
            dark: '#FFDD57',
        },
        'error background': {
            light: '#F8D7DA',
            dark: '#58151C',
        },
        'error foreground': {
            light: '#721C24',
            dark: '#F87171',
        },
        'code keyword': {
            light: '#D73A49',
            dark: '#FF7B72',
        },
        'code variable': {
            light: '#005CC5',
            dark: '#79B8FF',
        },
        'code number': {
            light: '#986801',
            dark: '#E1C16E',
        },
        'code string': {
            light: '#032F62',
            dark: '#9ECBFF',
        },
        'code title': {
            light: '#6F42C1',
            dark: '#B392F0',
        },
        'code comment': {
            light: '#6A737D',
            dark: '#8B949E',
        },
        'code background': {
            light: '#F6F8FA',
            dark: '#0D1117',
        },
        'table header': {
            light: '#0366D6',
            dark: '#58A6FF',
        },
        'table select': {
            light: '#EAEAEA',
            dark: '#2D2D2D',
        },
        'table border color': {
            light: '#D1D5DA',
            dark: '#30363D',
        },
    },
    custom: {},
};
