import type { ISWysiwygData, ISWysiwygSpec } from '../types/wysiwygTypes';
export interface ISWysiwygGeneratorNode {
    type: string;
    isBlock: boolean;
    content: string;
}
export interface ISWysiwygGenerator {
    (node: ISWysiwygGeneratorNode): string;
}

export default class SWysiwyg {
    private _data;
    private _spec;
    
    constructor(spec: ISWysiwygSpec, data: ISWysiwygData);
    
    toString(generator: ISWysiwygGenerator): string;
}
