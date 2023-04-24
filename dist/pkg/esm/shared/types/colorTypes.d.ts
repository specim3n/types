import type { ISSpec, ISSpecData } from './specTypes';
export type ISColorValue = string;
export type ISColorFormat = 'hex' | 'hexa' | 'hsl' | 'hsla' | 'rgb' | 'rgba';
export interface ISColorData extends ISSpecData {
    h?: number;
    s?: number;
    l?: number;
    a?: number;
    r?: number;
    g?: number;
    b?: number;
    hex?: string;
    hexa?: string;
    format: ISColorFormat;
    value: ISColorValue;
}
export interface ISColorSpec extends ISSpec {
    format: ISColorFormat;
    placeholder?: string;
}
