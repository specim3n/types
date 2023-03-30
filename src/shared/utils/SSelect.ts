import type {
    ISSelectData,
    ISSelectOptionId,
    ISSelectOptionSpec,
    ISSelectOptionValue,
    ISSelectSpec,
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
 * const select = new __SSelect(data);
 * select.isSelected('option-2');
 * // etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSelect {
    _data: ISSelectData;
    _spec: ISSelectSpec;

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
            this._data.value.push(
                option.value !== undefined
                    ? {
                          id,
                          value: option.value,
                      }
                    : id,
            );
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
        const option = this.getOption(id);
        if (this.isSelected(id)) {
            const idx = this.getOptionIdx(id);
            this._data.value?.splice?.(idx, 1);
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
    getOption(id: ISSelectOptionId): ISSelectOptionSpec {
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
    getOptionIdx(id: ISSelectOptionId): number {
        for (let [i, option] of this._spec.options.entries?.()) {
            if (id === (option.id ?? option)) {
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
    getSelectedIds(): ISSelectOptionId[] {
        const ids: ISSelectOptionId[] = [];
        this._data.value?.forEach?.((item) => {
            ids.push(item.id ?? item);
        });
        return ids;
    }
}
