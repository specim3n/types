import type { ISSpec, ISSpecData } from './specTypes';
export interface ISLinkData extends ISSpecData {
    text: string;
    url: string;
    title?: string;
    newWindow?: boolean;
}
export interface ISLinkSpec extends ISSpec {
}
