import type { ISSpec } from './specTypes';
export interface ISSelect {
    options: ISSelectOption[];
    value: any[];
}
export interface ISSelectOption {
    id: string;
    name: string;
    value: any;
    selected?: boolean;
}
export interface ISSelectSpec extends ISSpec {
    options: ISSelectOptionSpec[];
    min?: number;
    max?: number;
    multiple?: boolean;
}
export interface ISSelectOptionSpec {
    id: string;
    name: string;
    value: any;
}
