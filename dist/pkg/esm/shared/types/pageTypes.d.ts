export interface ISPageNode {
    uid?: string;
    type: 'root' | 'container' | 'component';
    nodes: Record<string, ISPageNode> | ISPageNode[];
}
export interface ISPage extends ISPageNode {
    uid: string;
    scope?: 'user' | 'repo' | string;
    name?: string;
    slug?: string | string[];
    type: 'root';
    layout: string;
}
