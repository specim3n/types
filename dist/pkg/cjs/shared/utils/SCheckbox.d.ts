import type { ISCheckboxData, ISCheckboxHasOptionId, ISCheckboxOptionId, ISCheckboxOptionSpec, ISCheckboxSpec, ISCheckboxValue } from '../types/selectTypes';

export default class SCheckbox {
    private _data;
    private _spec;
    
    constructor(spec: ISCheckboxSpec, data: ISCheckboxData);
    
    isEmpty(): boolean;
    
    isChecked(idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId): boolean;
    
    check(idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId): ISCheckboxOptionSpec;
    
    uncheck(idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId): ISCheckboxOptionSpec;
    
    getOption(idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId): ISCheckboxOptionSpec;
    
    getOptionIdx(idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId): number;
    
    getValue(idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId): ISCheckboxValue;
    
    getValueIdx(idOrValue: ISCheckboxOptionId | ISCheckboxHasOptionId): number;
    
    getChecked(): ISCheckboxValue[];
    
    getCheckedIds(): ISCheckboxOptionId[];
}
