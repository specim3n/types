import type { ISSpec } from './specTypes';
export interface ISVideoData {
    url: string;
    source: Record<string, string>;
    controls: boolean;
    autoplay: boolean;
    muted: boolean;
}
export interface ISVideoSpec extends ISSpec {
    controls: boolean;
    autoplay: boolean;
    muted: boolean;
}
