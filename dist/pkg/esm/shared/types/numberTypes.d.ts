import type { ISSpec } from './specTypes';
export interface ISNumberData {
    value: number;
}
export interface ISNumberSpec extends ISSpec {
    min?: number;
    max?: number;
    placeholder?: string;
}
