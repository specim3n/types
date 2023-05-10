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
        // default
        if (!this._data.value) {
            if (this._spec.multiple) {
                this._data.value = [];
            }
        }
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
        const idToCheck = (_a = idOrValue === null || idOrValue === void 0 ? void 0 : idOrValue.id) !== null && _a !== void 0 ? _a : idOrValue;
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
                this._data.value = valueToAdd;
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
        var _a, _b, _c, _d;
        const id = (_a = idOrValue.id) !== null && _a !== void 0 ? _a : idOrValue;
        const idx = this.getValueIdx(id);
        if (idx === -1)
            return;
        if (this._spec.multiple) {
            (_c = (_b = this._data.value) === null || _b === void 0 ? void 0 : _b.splice) === null || _c === void 0 ? void 0 : _c.call(_b, idx, 1);
        }
        else if (id === ((_d = this._data.value) === null || _d === void 0 ? void 0 : _d.id)) {
            this._data.value = null;
        }
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
     * @name        getValue
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
        if (this._spec.multiple) {
            const idx = this.getValueIdx(idOrValue);
            return this._data.value[idx];
        }
        return this._data.value;
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
        if (this._spec.multiple) {
            for (let [i, option] of (_c = (_b = this._data.value) === null || _b === void 0 ? void 0 : _b.entries) === null || _c === void 0 ? void 0 : _c.call(_b)) {
                if (id === ((_d = option.id) !== null && _d !== void 0 ? _d : option)) {
                    return i;
                }
            }
        }
        else {
            return 0;
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
        if (this._spec.multiple) {
            return ids;
        }
        return ids[0];
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
        var _a, _b, _c;
        const ids = [];
        if (this._spec.multiple) {
            (_b = (_a = this._data.value) === null || _a === void 0 ? void 0 : _a.forEach) === null || _b === void 0 ? void 0 : _b.call(_a, (item) => {
                ids.push(item.id);
            });
        }
        else {
            if ((_c = this._data.value) === null || _c === void 0 ? void 0 : _c.id) {
                ids.push(this._data.value.id);
            }
        }
        return ids;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBTztJQUl4Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQWtCLEVBQUUsSUFBa0I7O1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLFVBQVU7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ3pCO1NBQ0o7UUFFRCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLENBQUEsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxNQUFNLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPO1FBQ0gsaUJBQWlCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsVUFBVSxDQUFDLFNBQWlEOztRQUN4RCxpQkFBaUI7UUFDakIsTUFBTSxTQUFTLEdBQ1gsTUFBc0IsU0FBVSxhQUFWLFNBQVMsdUJBQVQsU0FBUyxDQUFHLEVBQUUsbUNBQVksU0FBUyxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQ0YsU0FBaUQ7O1FBRWpELE1BQU0sRUFBRSxHQUFHLE1BQXNCLFNBQVUsQ0FBQyxFQUFFLG1DQUFZLFNBQVMsQ0FBQztRQUNwRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNoQyxNQUFNLFVBQVUsR0FBa0I7Z0JBQzlCLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2FBQ3RCLENBQUM7WUFFRixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDckM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO2FBQ2pDO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxRQUFRLENBQ0osU0FBaUQ7O1FBRWpELE1BQU0sRUFBRSxHQUFHLE1BQXNCLFNBQVUsQ0FBQyxFQUFFLG1DQUFZLFNBQVMsQ0FBQztRQUNwRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDdkIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNyQixNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLDBDQUFFLE1BQU0sbURBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxFQUFFLE1BQUssTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssMENBQUUsRUFBRSxDQUFBLEVBQUU7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFNBQVMsQ0FDTCxTQUFpRDs7UUFFakQsTUFBTSxFQUFFLEdBQUcsTUFBc0IsU0FBVSxDQUFDLEVBQUUsbUNBQVksU0FBUyxDQUFDO1FBQ3BFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLENBQUMsU0FBaUQ7O1FBQzFELE1BQU0sRUFBRSxHQUFHLE1BQXNCLFNBQVUsQ0FBQyxFQUFFLG1DQUFZLFNBQVMsQ0FBQztRQUNwRSxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFDLE9BQU8sa0RBQUksRUFBRTtZQUNwRCxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQUEsTUFBTSxDQUFDLEVBQUUsbUNBQUksTUFBTSxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7U0FDSjtRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxRQUFRLENBQUMsU0FBaUQ7UUFDdEQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDaEM7UUFDRCxPQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxXQUFXLENBQUMsU0FBaUQ7O1FBQ3pELE1BQU0sRUFBRSxHQUFHLE1BQXNCLFNBQVUsQ0FBQyxFQUFFLG1DQUFZLFNBQVMsQ0FBQztRQUNwRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3JCLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLDBDQUFFLE9BQU8sa0RBQUksRUFBRTtnQkFDbkQsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFBLE1BQU0sQ0FBQyxFQUFFLG1DQUFJLE1BQU0sQ0FBQyxFQUFFO29CQUM5QixPQUFPLENBQUMsQ0FBQztpQkFDWjthQUNKO1NBQ0o7YUFBTTtZQUNILE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxXQUFXOztRQUNQLE1BQU0sR0FBRyxHQUFvQixFQUFFLENBQUM7UUFDaEMsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSywwQ0FBRSxPQUFPLG1EQUFHLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDTCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNyQixPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxjQUFjOztRQUNWLE1BQU0sR0FBRyxHQUF1QixFQUFFLENBQUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNyQixNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLDBDQUFFLE9BQU8sbURBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSywwQ0FBRSxFQUFFLEVBQUU7Z0JBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDakM7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKIn0=