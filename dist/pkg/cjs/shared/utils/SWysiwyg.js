"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class SWysiwyg {
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
    constructor(spec, data) {
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
    toString(generator) {
        function recursiveNodes(node) {
            var _a;
            let contents = [];
            if (node.type === 'text' && node.text) {
                contents.push(node.text);
            }
            else if ((_a = node.nodes) === null || _a === void 0 ? void 0 : _a.length) {
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
exports.default = SWysiwyg;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBcUIsUUFBUTtJQUl6Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQW1CLEVBQUUsSUFBbUI7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLENBQUMsU0FBNkI7UUFDbEMsU0FBUyxjQUFjLENBQUMsSUFBdUI7O1lBQzNDLElBQUksUUFBUSxHQUFhLEVBQUUsQ0FBQztZQUU1QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ25DLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVCO2lCQUFNLElBQUksTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxNQUFNLEVBQUU7Z0JBQzNCLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUM3QyxNQUFNLEdBQUcsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3RCO2FBQ0o7WUFFRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3JCLE9BQU8sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUM3QixDQUFDLENBQUM7WUFDSCxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFDRCxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUFyREQsMkJBcURDIn0=