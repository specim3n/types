import type {
    ISDatetimeData,
    ISDatetimeSpec,
    ISDatetimeSpecDisabled,
} from '../types/datetimeTypes';

import { format as __format, parse as __parse } from 'date-format-parse';

/**
 * @name            SDatetime
 * @namespace       shared.utils
 * @type            Class
 * @platform        node
 * @platform        js
 * @status          beta
 *
 * This class wrap an ISDatetimeData object and gives you access to util methods like `isSelected` and more.
 *
 * @example         js
 * import { __SDatetime } from '@specimen/types/utils';
 * const date = new __SDatetime(spec, data);
 * // etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDatetime {
    private _data: ISDatetimeData;
    private _spec: ISDatetimeSpec;
    private _date: Date;

    private static MONTHS = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
    ];

    private static DAYS = [
        'sunday',
        'monday',
        'thuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];

    /**
     * @name        parse
     * @type        Function
     * @static
     *
     * Parse a date string with the passed format and returns a Date instance
     *
     * @param       {String}           dateString           The date string to parse
     * @param       {String}            format              The format with to parse the dateString. See [here](https://www.npmjs.com/package/date-format-parse) for supported formats
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static parse(dateString: string, format: string): Date {
        return __parse(dateString, format);
    }

    /**
     * @name        isDateNeeded
     * @type        Function
     * @static
     *
     * Check in the format is the date part is needed
     *
     * @return      {Boolean}               true if the date part is needed, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isDateNeeded(format: string): boolean {
        return format.match(/(d{1,4}|D{1,2}|M{1,4}|Y{2,4})/) !== null;
    }

    /**
     * @name        isTimeNeeded
     * @type        Function
     * @static
     *
     * Check in the format is the time part is needed
     *
     * @return      {Boolean}               true if the time part is needed, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isTimeNeeded(format: string): boolean {
        return format.match(/(h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3})/) !== null;
    }

    /**
     * @name        isDateDisabled
     * @type        Function
     * @static
     *
     * This static method take a date (Date) and a list of disabled ones (ISDatetimeDisabled)
     * to returns you if your date is disabled or not.
     *
     * @param       {Date}          date            The date to check
     * @param       {ISDatetimeDisabled}        disabled        The list of disabled dates, days, etc...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isDateDisabled(
        date: Date,
        disabled: ISDatetimeSpecDisabled[],
    ): boolean {
        // convert Date to isoString
        // @ts-ignore
        disabled = disabled.map((item) => {
            if (item instanceof Date) {
                return item.toISOString();
            }
            return item;
        });

        // date itself
        // @ts-ignore
        if (disabled.includes(date.toISOString())) {
            return true;
        }

        // check the year
        const year = date.getFullYear();
        // @ts-ignore
        if (disabled.includes(year)) {
            return true;
        }

        // check the month
        const month = SDatetime.MONTHS[date.getMonth()];
        // @ts-ignore
        if (disabled.includes(month)) {
            return true;
        }

        // check days
        const dayInWeek = date.getDay();
        if (disabled.includes[SDatetime.DAYS[dayInWeek]]) {
            return true;
        }

        // week and weekend
        // @ts-ignore
        if (disabled.includes('week') && dayInWeek > 1 && dayInWeek <= 5) {
            return true;
        }
        if (
            // @ts-ignore
            disabled.includes('weekend') &&
            (dayInWeek === 0 || dayInWeek === 6)
        ) {
            return true;
        }
    }

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(spec: ISDatetimeSpec, data: ISDatetimeData) {
        this._spec = spec;
        this._data = data;
        // set the date to be used
        this.set(data);
    }

    /**
     * @name            set
     * @type             Function
     *
     * Set a new date to be used
     *
     * @param       {String}            data          An ISDatetimeData object to set as new value
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set(data: ISDatetimeData): void {
        if (data.value && data.format) {
            this._date = __parse(data.value, data.format);
        } else if (data.iso) {
            this._date = new Date(data.iso);
        } else {
            this._date = new Date();
        }
        this._data.iso = this._date.toISOString();
        this._data.format = this._spec.format;
        this._data.value = this.format(this._spec.format);
    }

    /**
     * @name        isDateNeeded
     * @type        Function
     *
     * Check in the format is the date part is needed
     *
     * @return      {Boolean}               true if the date part is needed, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isDateNeeded(): boolean {
        return SDatetime.isDateNeeded(this._spec.format);
    }

    /**
     * @name        isTimeNeeded
     * @type        Function
     *
     * Check in the format is the time part is needed
     *
     * @return      {Boolean}               true if the time part is needed, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isTimeNeeded(): boolean {
        return SDatetime.isTimeNeeded(this._spec.format);
    }

    /**
     * @name        isDisabled
     * @type        Function
     *
     * Check if the date is disabled.
     * The disable dates, days, etc... are specified in the specs.disabled array.
     *
     * @return      {Boolean}               true if the date is disabled, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isDisabled(): boolean {
        if (!this._spec.disabled || !this._spec.disabled.length) {
            return false;
        }
        return SDatetime._isDateDisabled(this._date, this._spec.disabled);
    }

    /**
     * @name            format
     * @type             Function
     *
     * Get a string formatted version of your date
     *
     * @param       {String}            format          The format of the output ou want
     * @return      {String}                            The formatted datetime
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    format(format: string): string {
        return __format(this._date, format);
    }

    /**
     * @name            toString
     * @type             Function
     *
     * Return the formatted datetime string using the proper spec format
     *
     * @return      {String}                            The formatted datetime
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toString(): string {
        return __format(this._date, this._spec.format);
    }
}
