import type { ISSpec, ISSpecData } from './specTypes';

export interface ISLayoutData extends ISSpecData {
    container: boolean;
    media: Record<string, string>;
    areas: Record<string, string>;
    id?: string;
    frontspec?: any;
    gap?: string;
}

export interface ISLayoutSpec extends ISSpec {
    layouts: ISLayoutSpecLayout[];
    // custom?: boolean; // not supported for now...
}

export interface ISLayoutSpecLayout {
    id: string;
    layout: string;
}
