import type { ISSelectData, ISSelectOptionId, ISSelectOptionSpec, ISSelectOptionValue, ISSelectSpec } from '../types/selectTypes';

export default class SSelect {
    _data: ISSelectData;
    _spec: ISSelectSpec;
    
    constructor(spec: ISSelectSpec, data: ISSelectData);
    
    isSelected(idOrValue: ISSelectOptionId | ISSelectOptionValue): boolean;
    
    select(id: ISSelectOptionId): ISSelectOptionSpec;
    
    unselect(id: ISSelectOptionId): ISSelectOptionSpec;
    
    getOption(id: ISSelectOptionId): ISSelectOptionSpec;
    
    getOptionIdx(id: ISSelectOptionId): number;
    
    getSelectedIds(): ISSelectOptionId[];
}
