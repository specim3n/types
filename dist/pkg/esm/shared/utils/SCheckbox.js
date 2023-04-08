/**
 * @name            SCheckbox
 * @namespace       shared.utils
 * @type            Class
 * @platform        node
 * @platform        js
 * @status          beta
 *
 * This class wrap an ISCheckboxData object and gives you access to util methods like `isChecked` and more.
 *
 * @example         js
 * import { __SCheckbox } from '@specimen/types/utils';
 * const select = new __SCheckbox(spec, data);
 * select.isChecked('option-2');
 * select.select('option-2');
 * select.getCheckedIds();
 * // etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCheckbox {
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
        // data structure
        if (!Array.isArray(data.value)) {
            data.value = [];
        }
        // default value
        if (!((_a = data.value) === null || _a === void 0 ? void 0 : _a.length) && spec.default) {
            this.check(spec.default);
        }
    }
    /**
     * @name        isChecked
     * @type        Function
     *
     * Pass a value object or an option id to check if it is checked or not
     *
     * @param       {ISCheckboxOptionId|ISCheckboxOptionvalue}          idOrValue          The option id or value to check
     * @return      {Boolean}                                                           true if checked, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isChecked(idOrValue) {
        var _a;
        // in depth check
        const idToCheck = (_a = idOrValue.id) !== null && _a !== void 0 ? _a : idOrValue;
        return this.getCheckedIds().includes(idToCheck);
    }
    /**
     * @name        check
     * @type        Function
     *
     * Allows you to check an ISCheckboxOption.
     *
     * @param       {ISSelectOptionId|ISSelectHasOptionId}          idOrValue        The option (id) you want to select
     * @return      {ISCheckboxOptionSpec}            The added option
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    check(idOrValue) {
        var _a;
        const id = (_a = idOrValue.id) !== null && _a !== void 0 ? _a : idOrValue;
        const option = this.getOption(id);
        if (option && !this.isChecked(id)) {
            const valueToAdd = {
                id,
                value: option.value,
            };
            this._data.value.push(valueToAdd);
        }
        return option;
    }
    /**
     * @name        uncheck
     * @type        Function
     *
     * Allows you to uncheck an ISCheckboxOption.
     *
     * @param       {ISSelectOptionId|ISSelectHasOptionId}          idOrValue       The option (id) you want to select
     * @return      {ISCheckboxOptionSpec}                The removed option
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    uncheck(idOrValue) {
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
     * Returns you an ISCheckboxOptionSpec object for the requested option id
     *
     * @param       {ISSelectOptionId|ISSelectHasOptionId}          idOrValue          The option (id) you want to get back
     * @return      {ISCheckboxOptionSpec}                         The grabed option spec object
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
     * @name        getValue
     * @type        Function
     *
     * Returns you the value corresponding to the passed ISCheckboxHasOptionId | ISCheckboxOptionId.
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
     * Returns you an idx integer representing where is the requested value in the value array
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
     * @name        getChecked
     * @type        Function
     *
     * Returns you an array of all the checked options.
     *
     * @return      {(ISCheckboxOptionId|ISCheckboxValue)[]}                An array of all the checked ids or ISCheckboxValue objects
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getChecked() {
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
     * @name        getCheckedIds
     * @type        Function
     *
     * Returns you an array of all the checked option's ids
     *
     * @return      {String[]}                An array of all the checked ids
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getCheckedIds() {
        var _a, _b;
        const ids = [];
        (_b = (_a = this._data.value) === null || _a === void 0 ? void 0 : _a.forEach) === null || _b === void 0 ? void 0 : _b.call(_a, (item) => {
            ids.push(item.id);
        });
        return ids;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBUztJQUkxQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQW9CLEVBQUUsSUFBb0I7O1FBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbkI7UUFFRCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLENBQUEsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxNQUFNLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsU0FBUyxDQUFDLFNBQXFEOztRQUMzRCxpQkFBaUI7UUFDakIsTUFBTSxTQUFTLEdBQ1gsTUFBd0IsU0FBVSxDQUFDLEVBQUUsbUNBQVksU0FBUyxDQUFDO1FBQy9ELE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxLQUFLLENBQ0QsU0FBcUQ7O1FBRXJELE1BQU0sRUFBRSxHQUFHLE1BQXdCLFNBQVUsQ0FBQyxFQUFFLG1DQUFZLFNBQVMsQ0FBQztRQUN0RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLElB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