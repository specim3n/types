import type { ISSpec } from './specTypes';

export interface ISWysiwygData {
    value: ISWysiwygRootData;
}
export interface ISWysiwygNodeData {
    type: string;
    text?: string;
    block: boolean;
    data: any;
    nodes: ISWysiwygNodeData[];
}
export interface ISWysiwygRootData {
    type: 'root';
    block: true;
    nodes: ISWysiwygNodeData[];
}

export interface ISWysiwygTypoEditorSpec {
    style: any;
}
export interface ISWysiwygTypoButtonSpec {
    label?: string;
    style?: any;
}
export interface ISWysiwygTypoSpec {
    label?: string;
    style?: any;
    group?: string;
    editor?: ISWysiwygTypoEditorSpec;
}
export interface ISWysiwygTyposSpec {
    [key: string]: ISWysiwygTypoSpec;
}
export interface ISWysiwygSpec extends ISSpec {
    min?: number;
    max?: number;
    frontspec: boolean;
    typo?: ISWysiwygTyposSpec;
}
