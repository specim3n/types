import type { ISSpec } from './specTypes';

export type ISCheckboxOptionId = string;

export interface ISCheckbox {
    value: ISCheckboxOptionId[];
}

export interface ISCheckboxSpec extends ISSpec {
    options: ISCheckboxOptionSpec[];
    min?: number;
    max?: number;
}

export interface ISCheckboxOptionSpec {
    id: ISCheckboxOptionId;
    name: string;
}
