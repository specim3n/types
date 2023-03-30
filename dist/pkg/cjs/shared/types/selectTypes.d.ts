import type { ISSpec } from './specTypes';
export type ISSelectOptionId = string;
export type ISSelectOptionValue = any;
export interface ISSelectValue {
    id: ISSelectOptionId;
    value: ISSelectOptionValue;
}
export interface ISSelectData {
    value: (ISSelectOptionId | ISSelectValue)[];
}
export interface ISSelectSpec extends ISSpec {
    options: ISSelectOptionSpec[];
    min?: number;
    max?: number;
    multiple?: boolean;
    placeholder?: string;
}
export interface ISSelectOptionSpec {
    id: ISSelectOptionId;
    name: string;
    value: ISSelectOptionValue;
}
