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
 * const select = new __SSelect(spec, data);
 * select.isSelected('option-2');
 * select.select('option-2');
 * select.getSelectedIds();
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
        var _a;
        this._spec = spec;
        this._data = data;
        // default value
        if (!((_a = data.value) === null || _a === void 0 ? void 0 : _a.length) && spec.default) {
            this.select(spec.default);
        }
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
        var _a;
        // in depth check
        const idToCheck = (_a = idOrValue.id) !== null && _a !== void 0 ? _a : idOrValue;
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
    select(idOrValue) {
        var _a;
        const id = (_a = idOrValue.id) !== null && _a !== void 0 ? _a : idOrValue;
        const option = this.getOption(id);
        if (option && !this.isSelected(id)) {
            const valueToAdd = {
                id,
                value: option.value,
            };
            if (this._spec.multiple) {
                this._data.value.push(valueToAdd);
            }
            else {
                this._data.value = [valueToAdd];
            }
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
    unselect(idOrValue) {
        var _a, _b, _c;
        const id = (_a = idOrValue.id) !== null && _a !== void 0 ? _a : idOrValue;
        const idx = this.getValueIdx(id);
        if (idx === -1)
            return;
        (_c = (_b = this._data.value) === null || _b === void 0 ? void 0 : _b.splice) === null || _c === void 0 ? void 0 : _c.call(_b, idx, 1);
        return this.getOption(id);
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
    getOption(idOrValue) {
        var _a;
        const id = (_a = idOrValue.id) !== null && _a !== void 0 ? _a : idOrValue;
        const idx = this.getOptionIdx(id);
        return this._spec.options[idx];
    }
    /**
     * @name        getOptionIdx
     * @type        Function
     *
     * Returns you an array index for the requested option id in the _spec.options array
     *
     * @param       {ISSelectOptionId}          id          The option id you want to get the idx back
     * @return      {Number}                                The array value idx of the requested option id or -1 if not found
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getOptionIdx(idOrValue) {
        var _a, _b, _c, _d;
        const id = (_a = idOrValue.id) !== null && _a !== void 0 ? _a : idOrValue;
        for (let [i, option] of (_c = (_b = this._spec.options).entries) === null || _c === void 0 ? void 0 : _c.call(_b)) {
            if (id === ((_d = option.id) !== null && _d !== void 0 ? _d : option)) {
                return i;
            }
        }
        return -1;
    }
    /**
     * @name        getValueIdx
     * @type        Function
     *
     * Returns you an array index for the requested option id in the _data.value array
     *
     * @param       {ISSelectOptionId}          id          The option id you want to get the idx back
     * @return      {Number}                                The array value idx of the requested option id or -1 if not found
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getValueIdx(idOrValue) {
        var _a, _b, _c, _d;
        const id = (_a = idOrValue.id) !== null && _a !== void 0 ? _a : idOrValue;
        for (let [i, option] of (_c = (_b = this._data.value) === null || _b === void 0 ? void 0 : _b.entries) === null || _c === void 0 ? void 0 : _c.call(_b)) {
            if (id === ((_d = option.id) !== null && _d !== void 0 ? _d : option)) {
                return i;
            }
        }
        return -1;
    }
    /**
     * @name        getSelected
     * @type        Function
     *
     * Returns you an array of all the selected options. It can returns either an array of id's if theirs no value
     * in the option, or an ISSelectValue object if their's a value in the spec option.
     *
     * @return      {(ISSelectOptionId|ISSelectValue)[]}                An array of all the selected ids or ISSelectValue objects
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getSelected() {
        var _a, _b;
        const ids = [];
        (_b = (_a = this._data.value) === null || _a === void 0 ? void 0 : _a.forEach) === null || _b === void 0 ? void 0 : _b.call(_a, (item) => {
            ids.push({
                id: item.id,
                value: item.value,
            });
        });
        return ids;
    }
    /**
     * @name        getSelectedIds
     * @type        Function
     *
     * Returns you an array of all the selected option's ids
     *
     * @return      {String[]}                An array of all the selected ids
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getSelectedIds() {
        var _a, _b;
        const ids = [];
        (_b = (_a = this._data.value) === null || _a === void 0 ? void 0 : _a.forEach) === null || _b === void 0 ? void 0 : _b.call(_a, (item) => {
            ids.push(item.id);
        });
        return ids;
    }
}
exports.default = SSelect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBcUIsT0FBTztJQUl4Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQWtCLEVBQUUsSUFBa0I7O1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLE1BQU0sQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFVBQVUsQ0FBQyxTQUFpRDs7UUFDeEQsaUJBQWlCO1FBQ2pCLE1BQU0sU0FBUyxHQUNYLE1BQXNCLFNBQVUsQ0FBQyxFQUFFLG1DQUFZLFNBQVMsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQ0YsU0FBaUQ7O1FBRWpELE1BQU0sRUFBRSxHQUFHLE1BQXNCLFNBQVUsQ0FBQyxFQUFFLG1DQUFZLFNBQVMsQ0FBQztRQUNwRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNoQyxNQUFNLFVBQVUsR0FBa0I7Z0JBQzlCLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2FBQ3RC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