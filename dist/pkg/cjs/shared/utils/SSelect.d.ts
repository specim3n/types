import type { ISSelectData, ISSelectHasOptionId, ISSelectOptionId, ISSelectOptionSpec, ISSelectSpec, ISSelectValue } from '../types/selectTypes';

export default class SSelect {
    private _data;
    private _spec;
    
    constructor(spec: ISSelectSpec, data: ISSelectData);
    
    isSelected(idOrValue: ISSelectOptionId | ISSelectHasOptionId): boolean;
    
    select(idOrValue: ISSelectOptionId | ISSelectHasOptionId): ISSelectOptionSpec;
    
    unselect(idOrValue: ISSelectOptionId | ISSelectHasOptionId): ISSelectOptionSpec;
    
    getOption(idOrValue: ISSelectOptionId | ISSelectHasOptionId): ISSelectOptionSpec;
    
    getOptionIdx(idOrValue: ISSelectOptionId | ISSelectHasOptionId): number;
    
    getValueIdx(idOrValue: ISSelectOptionId | ISSelectHasOptionId): number;
    
    getSelected(): ISSelectValue[];
    
    getSelectedIds(): ISSelectOptionId[];
}
