import __SColor from '@coffeekraken/s-color';
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
        this._data = Object.assign(Object.assign({}, this._sColor.toObject()), this._data);
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
    toString(format = this._spec.format) {
        return this._sColor.toString(format);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRzdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTTtJQUt2Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQWlCLEVBQUUsSUFBaUI7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNuQztRQUVELGtCQUFrQjtRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQzFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07U0FDNUIsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxLQUFLLG1DQUNILElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQ2hCLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUNKIn0=