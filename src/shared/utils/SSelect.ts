import type {
    ISSelectData,
    ISSelectOptionId,
    ISSelectOptionSpec,
    ISSelectOptionValue,
    ISSelectSpec,
    ISSelectValue,
} from '../types/selectTypes';

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
    private _data: ISSelectData;
    private _spec: ISSelectSpec;

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
    constructor(spec: ISSelectSpec, data: ISSelectData) {
        this._spec = spec;
        this._data = data;

        // default value
        if (!data.value?.length && spec.default) {
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
    isSelected(idOrValue: ISSelectOptionId | ISSelectOptionValue): boolean {
        // strict search
        if (this._data.value?.includes?.(idOrValue)) {
            return true;
        }

        // in depth check
        const idToCheck = idOrValue.id ?? idOrValue;
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
    select(id: ISSelectOptionId): ISSelectOptionSpec {
        const option = this.getOption(id);
        if (option && !this.isSelected(id)) {
            const valueToAdd =
                option.value !== undefined
                    ? <ISSelectValue>{
                          id,
                          value: option.value,
                      }
                    : id;

            if (this._spec.multiple) {
                this._data.value.push(valueToAdd);
            } else {
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
    unselect(id: ISSelectOptionId): ISSelectOptionSpec {
        const idx = this.getValueIdx(id);
        if (idx === -1) return;
        this._data.value?.splice?.(idx, 1);
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
    getOption(id: ISSelectOptionId): ISSelectOptionSpec {
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
    getOptionIdx(id: ISSelectOptionId): number {
        for (let [i, option] of this._spec.options.entries?.()) {
            if (id === (option.id ?? option)) {
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
    getValueIdx(id: ISSelectOptionId): number {
        for (let [i, option] of this._data.value?.entries?.()) {
            if (id === (option.id ?? option)) {
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
    getSelected(): (ISSelectOptionId | ISSelectValue)[] {
        const ids: (ISSelectOptionId | ISSelectValue)[] = [];
        this._data.value?.forEach?.((item) => {
            if (item.value !== undefined) {
                ids.push({
                    id: item.id,
                    value: item.value,
                });
            } else {
                ids.push(item.id ?? item);
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
    getSelectedIds(): ISSelectOptionId[] {
        const ids: ISSelectOptionId[] = [];
        this._data.value?.forEach?.((item) => {
            ids.push(item.id ?? item);
        });
        return ids;
    }
}
