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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBUztJQUkxQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQW9CLEVBQUUsSUFBb0I7O1FBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLE1BQU0sQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxTQUFTLENBQUMsU0FBcUQ7O1FBQzNELGlCQUFpQjtRQUNqQixNQUFNLFNBQVMsR0FDWCxNQUF3QixTQUFVLENBQUMsRUFBRSxtQ0FBWSxTQUFTLENBQUM7UUFDL0QsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEtBQUssQ0FDRCxTQUFxRDs7UUFFckQsTUFBTSxFQUFFLEdBQUcsTUFBd0IsU0FBVSxDQUFDLEVBQUUsbUNBQVksU0FBUyxDQUFDO1FBQ3RFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQy9CLE1BQU0sVUFBVSxHQUFvQjtnQkFDaEMsRUFBRTtnQkFDRixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7YUFDdEIsQ0FBQztZQUVGLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNyQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sQ0FDSCxTQUFxRDs7UUFFckQsTUFBTSxFQUFFLEdBQUcsTUFBd0IsU0FBVSxDQUFDLEVBQUUsbUNBQVksU0FBUyxDQUFDO1FBQ3RFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUN2QixNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLDBDQUFFLE1BQU0sbURBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxTQUFTLENBQ0wsU0FBcUQ7O1FBRXJELE1BQU0sRUFBRSxHQUFHLE1BQXdCLFNBQVUsQ0FBQyxFQUFFLG1DQUFZLFNBQVMsQ0FBQztRQUN0RSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsWUFBWSxDQUNSLFNBQXFEOztRQUVyRCxNQUFNLEVBQUUsR0FBRyxNQUF3QixTQUFVLENBQUMsRUFBRSxtQ0FBWSxTQUFTLENBQUM7UUFDdEUsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQyxPQUFPLGtEQUFJLEVBQUU7WUFDcEQsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFBLE1BQU0sQ0FBQyxFQUFFLG1DQUFJLE1BQU0sQ0FBQyxFQUFFO2dCQUM5QixPQUFPLENBQUMsQ0FBQzthQUNaO1NBQ0o7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsUUFBUSxDQUNKLFNBQXFEO1FBRXJELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxXQUFXLENBQUMsU0FBcUQ7O1FBQzdELE1BQU0sRUFBRSxHQUFHLE1BQXdCLFNBQVUsQ0FBQyxFQUFFLG1DQUFZLFNBQVMsQ0FBQztRQUN0RSxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSywwQ0FBRSxPQUFPLGtEQUFJLEVBQUU7WUFDbkQsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFBLE1BQU0sQ0FBQyxFQUFFLG1DQUFJLE1BQU0sQ0FBQyxFQUFFO2dCQUM5QixPQUFPLENBQUMsQ0FBQzthQUNaO1NBQ0o7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVOztRQUNOLE1BQU0sR0FBRyxHQUFzQixFQUFFLENBQUM7UUFDbEMsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSywwQ0FBRSxPQUFPLG1EQUFHLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDTCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILGFBQWE7O1FBQ1QsTUFBTSxHQUFHLEdBQXlCLEVBQUUsQ0FBQztRQUNyQyxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLDBDQUFFLE9BQU8sbURBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKIn0=