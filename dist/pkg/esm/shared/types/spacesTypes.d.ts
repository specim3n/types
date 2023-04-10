import type { ISSpec } from './specTypes';
export interface ISSpacesMediaData {
    paddingTop?: string | number;
    paddingRight?: string | number;
    paddingBottom?: string | number;
    paddingLeft?: string | number;
    marginTop?: string | number;
    marginRight?: string | number;
    marginBottom?: string | number;
    marginLeft?: string | number;
}
export interface ISSpacesData {
    media: Record<string, ISSpacesMediaData>;
}
export interface ISSpacesSpec extends ISSpec {
    options: ISSpacesOptionSpec[];
}
export interface ISSpacesOptionSpec {
    id: string;
    name: string;
    value: string;
}
