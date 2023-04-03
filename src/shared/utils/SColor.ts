import __SColor from '@coffeekraken/s-color';
import { ISColorData, ISColorSpec } from '../types/colorTypes';

/**
 * @name            SColor
 * @namespace       shared.utils
 * @type            Class
 * @platform        node
 * @platform        js
 * @status          beta
 *
 * This class wrap an ISSelectData object and gives you access to util methods like `isSelected` and more.
 *
 * @example         js
 * import { __SSelect } from '@specimen/types/utils';
 * const select = new __SSelect(spec, data);
 * select.isSelected('option-2');
 * select.select('option-2');
 * select.getSelectedIds();
 * // etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SColor {
    private _data: ISColorData;
    private _spec: ISColorSpec;
    private _sColor: __SColor;

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
    constructor(spec: ISColorSpec, data: ISColorData) {
        this._spec = spec;
        this._data = data;

        // default value
        if (!data.value && spec.default) {
            this._data.value = spec.default;
        }
        if (!data.format && spec.format) {
            this._data.format = spec.format;
        }

        // init the SColor
        this._sColor = new __SColor(this._data.value, {
            format: this._spec.format,
        });

        // set the values
        this._data = {
            ...this._sColor.toObject(),
            ...this._data,
        };
    }

    /**
     * @name        toString
     * @type        Function
     *
     * Return the color in the specified format
     *
     * @return      {String}                The color in the specified format
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toString(format = this._spec.format): string {
        return this._sColor.toString(format);
    }
}
