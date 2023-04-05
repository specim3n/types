import type { ISSpec } from './specTypes';

export interface ISImageMediaData {
    url: string;
}

export interface ISImageData {
    alt?: string;
    title?: string;
    media: Record<string, ISImageMediaData>; // '(max-width: 799px)': { url: '/my/cool/image.jpg' }
}

export interface ISImageSpec extends ISSpec {}
