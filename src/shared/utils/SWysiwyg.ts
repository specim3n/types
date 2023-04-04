import type {
    ISWysiwygData,
    ISWysiwygNodeData,
    ISWysiwygSpec,
} from '../types/wysiwygTypes';

export interface ISWysiwygGeneratorNode {
    type: string;
    isBlock: boolean;
    content: string;
}

export interface ISWysiwygGenerator {
    (node: ISWysiwygGeneratorNode): string;
}

/**
 * @name            SWysiwyg
 * @namespace       shared.utils
 * @type            Class
 * @platform        node
 * @platform        js
 * @status          beta
 *
 * This class wrap an ISWysiwygData object and gives you access to util methods like `toString` and more.
 *
 * @example         js
 * import { __SWysiwyg } from '@specimen/types/utils';
 * const wysiwyg = new __SWysiwyg(spec, data);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SWysiwyg {
    private _data: ISWysiwygData;
    private _spec: ISWysiwygSpec;

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
    constructor(spec: ISWysiwygSpec, data: ISWysiwygData) {
        this._spec = spec;
        this._data = data;
    }

    /**
     * @name        toString
     * @type        Function
     *
     * Return the color in the specified format
     *
     * @return      {String}                The color in the specified format
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toString(generator: ISWysiwygGenerator): string {
        function recursiveNodes(node: ISWysiwygNodeData): string {
            let contents: string[] = [];

            if (node.type === 'text' && node.text) {
                contents.push(node.text);
            } else if (node.nodes?.length) {
                for (let [i, childNode] of node.nodes.entries()) {
                    const res = recursiveNodes(childNode);
                    contents.push(res);
                }
            }

            const res = generator({
                type: node.type,
                isBlock: node.isBlock,
                content: contents.join(''),
            });
            return res;
        }
        const result = recursiveNodes(this._data.value);
        return result;
    }
}
