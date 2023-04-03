import type { ISSpec } from './specTypes';
export interface ISImageData {
    url: string;
    alt?: string;
    title?: string;
    media: Record<string, string>;
}
export interface ISImageSpec extends ISSpec {
}
