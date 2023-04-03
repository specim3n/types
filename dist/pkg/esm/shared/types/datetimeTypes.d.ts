import type { ISSpec } from './specTypes';
export interface ISDatetimeData {
    iso: string;
    value: string;
    format: string;
}
export interface ISDatetimeSpec extends ISSpec {
    format: string;
    calendar?: boolean;
    min?: string;
    max?: string;
    disabled: ISDatetimeSpecDisabled;
    placeholder?: string;
}
export type ISDatetimeSpecDisabled = (number | string | Date | 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december' | 'sunday' | 'monday' | 'thuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'week' | 'weekend')[];
