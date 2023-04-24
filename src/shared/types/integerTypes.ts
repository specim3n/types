import type { ISSpec, ISSpecData } from './specTypes';

export interface ISIntegerData extends ISSpecData {
    value: string;
}

export interface ISIntegerSpec extends ISSpec {
    min?: number;
    max?: number;
    placeholder?: string;
}
