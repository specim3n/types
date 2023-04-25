export interface ISPageNode {
    uid?: string;
    type: 'root' | 'container' | 'component';
    nodes: Record<string, ISPageNode>;
}

export interface ISPage extends ISPageNode {
    uid: string;
    type: 'root';
    layout: string;
}
