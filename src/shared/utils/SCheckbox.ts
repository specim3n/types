import type {
    ISCheckboxData,
    ISCheckboxHasOptionId,
    ISCheckboxOptionId,
    ISCheckboxOptionSpec,
    ISCheckboxSpec,
    ISCheckboxValue,
} from '../types/selectTypes';

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
    private _data: ISCheckboxData;
    private _spec: ISCheckboxSpec;

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
    constructor(spec: ISCheckboxSpec, data: ISCheckboxData) {
        this._spec = spec;
        this._data = data;

        // data structure
        if (!Array.isArray(data.value)) {
            data.value = [];
        }

        // default value
        if (!data.value?.length && spec.default) {
            this.check(spec.default);
        }
    }

    /**
     * @name        isEmpty
     * @type        Function
     *
     * Returns you if some checkboxes have something selected or not
     *
     * @return      {Boolean}                                                           true if empty, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isEmpty(): boolean {
        // in depth check
        return this.getCheckedIds().length === 0;
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
    isChecked(idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId): boolean {
        // in depth check
        const idToCheck =
            (<ISCheckboxHasOptionId>idOrValue).id ?? <string>idOrValue;
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
    check(
        idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId,
    ): ISCheckboxOptionSpec {
        const id = (<ISCheckboxHasOptionId>idOrValue).id ?? <string>idOrValue;
        const option = this.getOption(id);
        if (option && !this.isChecked(id)) {
            const valueToAdd = <ISCheckboxValue>{
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
    uncheck(
        idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId,
    ): ISCheckboxOptionSpec {
        const id = (<ISCheckboxHasOptionId>idOrValue).id ?? <string>idOrValue;
        const idx = this.getValueIdx(id);
        if (idx === -1) return;
        this._data.value?.splice?.(idx, 1);
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
    getOption(
        idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId,
    ): ISCheckboxOptionSpec {
        const id = (<ISCheckboxHasOptionId>idOrValue).id ?? <string>idOrValue;
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
    getOptionIdx(
        idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId,
    ): number {
        const id = (<ISCheckboxHasOptionId>idOrValue).id ?? <string>idOrValue;
        for (let [i, option] of this._spec.options.entries?.()) {
            if (id === (option.id ?? option)) {
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
     * @return      {ISCheckboxValue[]}                                The value object for a specific idx or value
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getValue(
        idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId,
    ): ISCheckboxValue {
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
    getValueIdx(idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId): number {
        const id = (<ISCheckboxHasOptionId>idOrValue).id ?? <string>idOrValue;
        for (let [i, option] of this._data.value?.entries?.()) {
            if (id === (option.id ?? option)) {
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
    getChecked(): ISCheckboxValue[] {
        const ids: ISCheckboxValue[] = [];
        this._data.value?.forEach?.((item) => {
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
    getCheckedIds(): ISCheckboxOptionId[] {
        const ids: ISCheckboxOptionId[] = [];
        this._data.value?.forEach?.((item) => {
            ids.push(item.id);
        });
        return ids;
    }
}
