import type { ISSpec } from './specTypes';

export interface ISWysiwygData {
    value: string;
}

export interface ISWysiwygTypoEditorSpec {
    style: any;
}

export interface ISWysiwygTypoSpec {
    label: string;
    style: any;
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
