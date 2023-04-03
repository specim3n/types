import type { ISDatetimeData, ISDatetimeSpec, ISDatetimeSpecDisabled } from '../types/datetimeTypes';

export default class SDatetime {
    private _data;
    private _spec;
    private _date;
    private static MONTHS;
    private static DAYS;
    
    static parse(dateString: string, format: string): Date;
    
    static isDateNeeded(format: string): boolean;
    
    static isTimeNeeded(format: string): boolean;
    
    static isDateDisabled(date: Date, disabled: ISDatetimeSpecDisabled[]): boolean;
    
    constructor(spec: ISDatetimeSpec, data: ISDatetimeData);
    
    set(data: ISDatetimeData): void;
    
    isDateNeeded(): boolean;
    
    isTimeNeeded(): boolean;
    
    isDisabled(): boolean;
    
    format(format: string): string;
    
    toString(): string;
}
