import type { ISSpec, ISSpecData } from './specTypes';

export interface ISLayoutData extends ISSpecData {
    container: boolean;
    media: Record<string, ISLayoutSpecLayout>;
    nodes?: Record<string, string>;
    html?: string;
    id?: string;
    frontspec?: any;
    gap?: ISLayoutDataGap;
    spacing?: ISLayoutDataSpacing;
}

export interface ISLayoutDataGap {
    id: string;
    value: string;
}

export interface ISLayoutDataSpacing {
    id: string;
    value: string;
}

export interface ISLayoutSpec extends ISSpec {
    layouts: ISLayoutSpecLayout[];
    // custom?: boolean; // not supported for now...
}

export interface ISLayoutSpecLayout {
    id: string;
    layout: string;
}
