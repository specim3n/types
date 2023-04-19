export interface ISMedia {
    defaultAction: '<' | '<=' | '>' | '>=' | '=';
    defaultMedia: string;
    queries: Record<string, ISMediaQuery>;
}

export interface ISMediaQuery {
    minWidth: number;
    maxWidth: number;
}
