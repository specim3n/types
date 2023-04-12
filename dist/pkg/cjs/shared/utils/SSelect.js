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
     * @name        isEmpty
     * @type        Function
     *
     * Returns you if the select has something selected or not
     *
     * @return      {Boolean}                                                           true if empty, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isEmpty() {
        // in depth check
        return this.getSelectedIds().length === 0;
    }
    /**
     * @name        isSelected
     * @type        Function
     *
     * Pass a value object or an option id to check if it is selected or not.
     *
     * @param       {ISSelectOptionId|ISSelectOptionvalue}          idOrValue          The option (id) or value to check
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
     *
     * @param       {ISSelectOptionId|ISSelectHasOptionId}          idOrValue        The option (id) you want to select
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
     *
     * @param       {ISSelectOptionId|ISSelectHasOptionId}          idOrValue       The option (id) you want to select
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
     * @param       {ISSelectOptionId|ISSelectHasOptionId}          idOrValue          The option (id) you want to get back
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
     * @param       {ISSelectOptionId|ISSelectHasOptionId}          idOrValue          The option (id) you want to get the idx back
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
     * Returns an integer representing where is the requested value in the value array
     *
     * @param       {ISSelectOptionId|ISSelectHasOptionId}          idOrValue          The option (id) you want to get the idx back
     * @return      {Number}                                The array value idx of the requested option id or -1 if not found
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getValue(idOrValue) {
        const idx = this.getValueIdx(idOrValue);
        return this._data.value[idx];
    }
    /**
     * @name        getValueIdx
     * @type        Function
     *
     * Returns you an array index for the requested option id in the _data.value array
     *
     * @param       {ISSelectOptionId|ISSelectHasOptionId}          idOrValue          The option (id) you want to get the idx back
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
     * Returns you an array of all the selected options.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBcUIsT0FBTztJQUl4Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQWtCLEVBQUUsSUFBa0I7O1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLE1BQU0sQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU87UUFDSCxpQkFBaUI7UUFDakIsT0FBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxVQUFVLENBQUMsU0FBaUQ7O1FBQ3hELGlCQUFpQjtRQUNqQixNQUFNLFNBQVMsR0FDWCxNQUFzQixTQUFVLENBQUMsRUFBRSxtQ0FBWSxTQUFTLENBQUM7UUFDN0QsT0FBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FDRixTQUFpRDs7UUFFakQsTUFBTSxFQUFFLEdBQUcsTUFBc0IsU0FBVSxDQUFDLEVBQUUsbUNBQVksU0FBUyxDQUFDO1FBQ3BFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxNQUFNLElBQUksQ0FBQyxJ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