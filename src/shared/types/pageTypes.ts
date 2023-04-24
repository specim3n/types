export interface ISPageNode {
    id?: string;
    type: 'root' | 'container' | 'component';
    nodes: Record<string, ISPageNode>;
}

export interface ISPage extends ISPageNode {
    id: string;
    type: 'root';
    layout: string;
}
