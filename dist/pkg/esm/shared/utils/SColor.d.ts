import { ISColorData, ISColorSpec } from '../types/colorTypes';

export default class SColor {
    private _data;
    private _spec;
    private _sColor;
    
    constructor(spec: ISColorSpec, data: ISColorData);
    
    toString(format?: import("../types/colorTypes").ISColorFormat): string;
}
