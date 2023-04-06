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
    static parse(dateString, format) {
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
    static isDateNeeded(format) {
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
    static isTimeNeeded(format) {
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
    static isDateDisabled(date, disabled) {
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
            (dayInWeek === 0 || dayInWeek === 6)) {
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
    constructor(spec, data) {
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
    set(data) {
        if (data.value && data.format) {
            this._date = __parse(data.value, data.format);
        }
        else if (data.iso) {
            this._date = new Date(data.iso);
        }
        else {
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
    isDateNeeded() {
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
    isTimeNeeded() {
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
    isDisabled() {
        if (!this._spec.disabled || !this._spec.disabled.length) {
            return false;
        }
        return SDatetime.isDateDisabled(this._date, this._spec.disabled);
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
    format(format) {
        return __format(this._date, format);
    }
    /**
     * @name            toString
     * @type             Function
     *
     * Return the formatted datetime string using the proper spec format
     *
     * @param       {String}            [format=this._spec.format]          The format of the output ou want
     * @return      {String}                            The formatted datetime
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toString(format = this._spec.format) {
        return __format(this._date, format);
    }
}
SDatetime.MONTHS = [
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
SDatetime.DAYS = [
    'sunday',
    'monday',
    'thuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFBRSxNQUFNLElBQUksUUFBUSxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV6RTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFNBQVM7SUE4QjFCOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBa0IsRUFBRSxNQUFjO1FBQzNDLE9BQU8sT0FBTyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQWM7UUFDOUIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLEtBQUssSUFBSSxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBYztRQUM5QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFVLEVBQ1YsUUFBa0M7UUFFbEMsNEJBQTRCO1FBQzVCLGFBQWE7UUFDYixRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdCLElBQUksSUFBSSxZQUFZLElBQUksRUFBRTtnQkFDdEIsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDN0I7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUVILGNBQWM7UUFDZCxhQUFhO1FBQ2IsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FB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