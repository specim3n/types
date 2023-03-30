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
export default class SSelect {
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
            const valueToAdd = option.value !== undefined
                ? {
                    id,
                    value: option.value,
                }
                : id;
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
    unselect(id) {
        var _a, _b;
        const idx = this.getValueIdx(id);
        if (idx === -1)
            return;
        (_b = (_a = this._data.value) === null || _a === void 0 ? void 0 : _a.splice) === null || _b === void 0 ? void 0 : _b.call(_a, idx, 1);
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
    getOption(id) {
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
    getValueIdx(id) {
        var _a, _b, _c;
        for (let [i, option] of (_b = (_a = this._data.value) === null || _a === void 0 ? void 0 : _a.entries) === null || _b === void 0 ? void 0 : _b.call(_a)) {
            if (id === ((_c = option.id) !== null && _c !== void 0 ? _c : option)) {
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
            var _a;
            if (item.value !== undefined) {
                ids.push({
                    id: item.id,
                    value: item.value,
                });
            }
            else {
                ids.push((_a = item.id) !== null && _a !== void 0 ? _a : item);
            }
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
            var _a;
            ids.push((_a = item.id) !== null && _a !== void 0 ? _a : item);
        });
        return ids;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBTztJQUl4Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQWtCLEVBQUUsSUFBa0I7O1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLE1BQU0sQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFVBQVUsQ0FBQyxTQUFpRDs7UUFDeEQsZ0JBQWdCO1FBQ2hCLElBQUksTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSywwQ0FBRSxRQUFRLG1EQUFHLFNBQVMsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxpQkFBaUI7UUFDakIsTUFBTSxTQUFTLEdBQUcsTUFBQSxTQUFTLENBQUMsRUFBRSxtQ0FBSSxTQUFTLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLEVBQW9CO1FBQ3ZCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lB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