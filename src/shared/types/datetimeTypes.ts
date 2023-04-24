import type { ISSpec, ISSpecData } from './specTypes';

export interface ISDatetimeData extends ISSpecData {
    iso: string; // 2011-10-05T14:48:00.000Z
    value: string; // 2023-10-23
    format: string; // YYYY-MM-DD
}

export interface ISDatetimeSpec extends ISSpec {
    format: string;
    calendar?: boolean;
    min?: string;
    max?: string;
    disabled: ISDatetimeSpecDisabled;
    placeholder?: string;
}

export type ISDatetimeSpecDisabled = (
    | number
    | string
    | Date
    | 'january'
    | 'february'
    | 'march'
    | 'april'
    | 'may'
    | 'june'
    | 'july'
    | 'august'
    | 'september'
    | 'october'
    | 'november'
    | 'december'
    | 'sunday'
    | 'monday'
    | 'thuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'week'
    | 'weekend'
)[];
