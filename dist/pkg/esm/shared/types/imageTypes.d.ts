import type { ISSpec } from './specTypes';
export interface ISImageMediaData {
    url: string;
}
export interface ISImageData {
    url: string;
    alt?: string;
    title?: string;
    media: Record<string, ISImageMediaData>;
}
export interface ISImageSpec extends ISSpec {
}
