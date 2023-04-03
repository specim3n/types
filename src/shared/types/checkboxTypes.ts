import type { ISSpec } from './specTypes';

export type ISCheckboxOptionId = string;
export type ISCheckboxOptionValue = any;

export interface ISCheckboxHasOptionId {
    id: ISCheckboxOptionId;
}

export interface ISCheckboxValue {
    id: ISCheckboxOptionId;
    value: ISCheckboxOptionValue;
}

export interface ISCheckboxData {
    value: ISCheckboxValue[];
}

export interface ISCheckboxSpec extends ISSpec {
    options: ISCheckboxOptionSpec[];
    min?: number;
    max?: number;
}

export interface ISCheckboxOptionSpec {
    id: ISCheckboxOptionId;
    name: string;
    value?: ISCheckboxOptionValue;
}
