import type { ISSpec, ISSpecData } from './specTypes';
export interface ISNumberData extends ISSpecData {
    value: number;
}
export interface ISNumberSpec extends ISSpec {
    min?: number;
    max?: number;
    placeholder?: string;
}
