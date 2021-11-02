// technically, better to have clear definition type instead of Object, any, etc.
export interface QueryResponse {
    result: Object|null;
    reject: String|null;
    error: Error|null;
}

export interface TabMeta {
    path: string;
    label: string;
    qType: string;
    title: string;
}