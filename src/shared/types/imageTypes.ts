import type { ISSpec } from './specTypes';

export interface ISImageMediaData {
    url: string;
}

export interface ISImageData {
    url: string;
    alt?: string;
    title?: string;
    media: Record<string, ISImageMediaData>;
    // '(max-width: 799px)': { url: 'something.jpg' }
    // mobile: { url: 'else.jpg' }
}

export interface ISImageSpec extends ISSpec {
    alt?: boolean;
    maxWidth?: number; // in px
    maxHeight?: number; // in px
    minWidth?: number; // in px
    minHeight?: number; // in px
    maxSize?: number; // size in bytes
}
