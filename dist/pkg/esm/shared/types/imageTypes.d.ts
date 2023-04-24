import type { ISSpec, ISSpecData } from './specTypes';
export interface ISImageMediaData {
    url: string;
}
export interface ISImageData extends ISSpecData {
    url: string;
    alt?: string;
    title?: string;
    media: Record<string, ISImageMediaData>;
}
export interface ISImageSpec extends ISSpec {
    alt?: boolean;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    maxSize?: number;
}
