import type { ISSpec, ISSpecData } from './specTypes';

export interface ISStringData extends ISSpecData {
    value: string;
}

export interface ISStringSpec extends ISSpec {
    min?: number;
    max?: number;
    placeholder?: string;
}
