import type { ISSpec } from './specTypes';

export interface ISStringData {
    value: string;
}

export interface ISStringSpec extends ISSpec {
    min?: number;
    max?: number;
    placeholder?: string;
}
