import type { ISSpec } from './specTypes';

export type ISVideoFormat = 'webm' | 'mp4' | 'ogg';

export interface ISVideoSourceData {
    url: string;
}

export interface ISVideoSourcesData {
    webm: ISVideoSourceData;
    mp4: ISVideoSourceData;
    ogg: ISVideoSourceData;
}

export interface ISVideoData {
    sources: Partial<ISVideoSourcesData>;
    controls: boolean;
    autoplay: boolean;
    muted: boolean;
}

export interface ISVideoSpec extends ISSpec {
    controls: boolean;
    autoplay: boolean;
    muted: boolean;
}
