import type { ISSpec } from './specTypes';
export interface ISIntegerData {
    value: string;
}
export interface ISIntegerSpec extends ISSpec {
    min?: number;
    max?: number;
    placeholder?: string;
}
