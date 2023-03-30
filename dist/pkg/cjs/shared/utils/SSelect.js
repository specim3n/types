"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            SSelect
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
 * const select = new __SSelect(data);
 * select.isSelected('option-2');
 * // etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSelect {
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
    }
    /**
     * @name        isSelected
     * @type        Function
     *
     * Pass a value object or an option id to check if it is selected or not
     * If you pass a value object, if will first make a strict check with "includes",
     * then a search by id if not found.
     *
     * @param       {ISSelectOptionId|ISSelectOptionvalue}          idOrValue          The option id or value to check
     * @return      {Boolean}                                                           true if selected, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isSelected(idOrValue) {
        var _a, _b, _c;
        // strict search
        if ((_b = (_a = this._data.value) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.call(_a, idOrValue)) {
            return true;
        }
        // in depth check
        const idToCheck = (_c = idOrValue.id) !== null && _c !== void 0 ? _c : idOrValue;
        return this.getSelectedIds().includes(idToCheck);
    }
    /**
     * @name        select
     * @type        Function
     *
     * Allows you to select an ISSelectOption.
     * If the option does not have any "value" property, it will add the "id" in the values stack.
     * If the option does have a "value", an ISSelectValue object will be added in the values stack.
     *
     * @param       {ISSelectOptionId}          id        The option id you want to select
     * @return      {ISSelectOptionSpec}            The added option
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    select(id) {
        const option = this.getOption(id);
        if (option && !this.isSelected(id)) {
            this._data.value.push(option.value !== undefined
                ? {
                    id,
                    value: option.value,
                }
                : id);
        }
        return option;
    }
    /**
     * @name        unselect
     * @type        Function
     *
     * Allows you to unselect an ISSelectOption.
     * If the option does not have any "value" property, it will remove the "id" from the values stack.
     * If the option does have a "value", an ISSelectValue object will be removed from the values stack.
     *
     * @param       {ISSelectOptionId}       id       The option id you want to select
     * @return      {ISSelectOptionSpec}                The removed option
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    unselect(id) {
        var _a, _b;
        const option = this.getOption(id);
        if (this.isSelected(id)) {
            const idx = this.getOptionIdx(id);
            (_b = (_a = this._data.value) === null || _a === void 0 ? void 0 : _a.splice) === null || _b === void 0 ? void 0 : _b.call(_a, idx, 1);
        }
        return option;
    }
    /**
     * @name        getOption
     * @type        Function
     *
     * Returns you an ISSelectOptionSpec object for the requested option id
     *
     * @param       {ISSelectOptionId}          id          The option id you want to get back
     * @return      {ISSelectOptionSpec}                         The grabed option spec object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getOption(id) {
        const idx = this.getOptionIdx(id);
        return this._spec.options[idx];
    }
    /**
     * @name        getOptionIdx
     * @type        Function
     *
     * Returns you an the array value index for the requested option id
     *
     * @param       {ISSelectOptionId}          id          The option id you want to get the idx back
     * @return      {Number}                                The array value idx of the requested option id or -1 if not found
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getOptionIdx(id) {
        var _a, _b, _c;
        for (let [i, option] of (_b = (_a = this._spec.options).entries) === null || _b === void 0 ? void 0 : _b.call(_a)) {
            if (id === ((_c = option.id) !== null && _c !== void 0 ? _c : option)) {
                return i;
            }
        }
        return -1;
    }
    /**
     * @name        getSelectedIds
     * @type        Function
     *
     * Returns you an array of all the selected option's ids
     *
     * @return      {String}                An array of all the selected ids
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getSelectedIds() {
        var _a, _b;
        const ids = [];
        (_b = (_a = this._data.value) === null || _a === void 0 ? void 0 : _a.forEach) === null || _b === void 0 ? void 0 : _b.call(_a, (item) => {
            var _a;
            ids.push((_a = item.id) !== null && _a !== void 0 ? _a : item);
        });
        return ids;
    }
}
exports.default = SSelect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQXFCLE9BQU87SUFJeEI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFrQixFQUFFLElBQWtCO1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsVUFBVSxDQUFDLFNBQWlEOztRQUN4RCxnQkFBZ0I7UUFDaEIsSUFBSSxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLDBDQUFFLFFBQVEsbURBQUcsU0FBUyxDQUFDLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELGlCQUFpQjtRQUNqQixNQUFNLFNBQVMsR0FBRyxNQUFBLFNBQVMsQ0FBQyxFQUFFLG1DQUFJLFNBQVMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsRUFBb0I7UUFDdkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNqQixNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQ3RCLENBQUMsQ0FBQztvQkFDSSxFQUFFO29CQUNGLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztpQkFDdEI7Z0JBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FDWCxDQUFDO1NBQ0w7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFFBQVEsQ0FBQyxFQUFvQjs7UUFDekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQyxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLDBDQUFFLE1BQU0sbURBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsU0FBUyxDQUFDLEVBQW9CO1FBQzFCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLENBQUMsRUFBb0I7O1FBQzdCLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUMsT0FBTyxrREFBSSxFQUFFO1lBQ3BELElBQUksRUFBRSxLQUFLLENBQUMsTUFBQSxNQUFNLENBQUMsRUFBRSxtQ0FBSSxNQUFNLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLENBQUM7YUFDWjtTQUNKO1FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsY0FBYzs7UUFDVixNQUFNLEdBQUcsR0FBdUIsRUFBRSxDQUFDO1FBQ25DLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssMENBQUUsT0FBTyxtREFBRyxDQUFDLElBQUksRUFBRSxFQUFFOztZQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQUEsSUFBSSxDQUFDLEVBQUUsbUNBQUksSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQXhKRCwwQkF3SkMifQ==