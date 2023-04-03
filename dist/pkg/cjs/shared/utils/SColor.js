"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
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
class SColor {
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
        this._sColor = new s_color_1.default(this._data.value, {
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
exports.default = SColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRzdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQXFCLE1BQU07SUFLdkI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFpQixFQUFFLElBQWlCO1FBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDbkM7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDMUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtTQUM1QixDQUFDLENBQUM7UUFFSCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLEtBQUssbUNBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FDdkIsSUFBSSxDQUFDLEtBQUssQ0FDaEIsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0o7QUFyREQseUJBcURDIn0=