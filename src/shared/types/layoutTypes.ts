import type { ISSpec } from './specTypes';

export interface ISLayoutData {
    layout: string;
    media: Record<string, string>;
    cells: string[];
    id?: string;
    frontspec?: any;
    gap?: string;
}

export interface ISLayoutSpec extends ISSpec {
    layouts: Record<string, string>;
    custom?: boolean;
}
