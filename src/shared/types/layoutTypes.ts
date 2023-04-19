import type { ISSpec } from './specTypes';

export interface ISLayoutData {
    layout: ISLayoutDataLayout;
    media: Record<string, ISLayoutDataLayout>;
    cells: string[];
    id?: string;
    frontspec?: any;
    gap?: string;
}

export interface ISLayoutDataLayout {
    id: string;
    layout: string;
}

export interface ISLayoutSpec extends ISSpec {
    layouts: ISLayoutSpecLayout[];
    custom?: boolean;
}

export interface ISLayoutSpecLayout {
    id: string;
    layout: string;
}
