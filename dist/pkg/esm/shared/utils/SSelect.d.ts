import type { ISSelectData, ISSelectOptionId, ISSelectOptionSpec, ISSelectOptionValue, ISSelectSpec, ISSelectValue } from '../types/selectTypes';

export default class SSelect {
    private _data;
    private _spec;
    
    constructor(spec: ISSelectSpec, data: ISSelectData);
    
    isSelected(idOrValue: ISSelectOptionId | ISSelectOptionValue): boolean;
    
    select(id: ISSelectOptionId): ISSelectOptionSpec;
    
    unselect(id: ISSelectOptionId): ISSelectOptionSpec;
    
    getOption(id: ISSelectOptionId): ISSelectOptionSpec;
    
    getOptionIdx(id: ISSelectOptionId): number;
    
    getValueIdx(id: ISSelectOptionId): number;
    
    getSelected(): (ISSelectOptionId | ISSelectValue)[];
    
    getSelectedIds(): ISSelectOptionId[];
}
