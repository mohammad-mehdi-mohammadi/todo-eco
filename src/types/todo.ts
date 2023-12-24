export interface TodoType {
    title: string;
    isCompleted: boolean;
    token: string;
    id: number;
}

export interface TodoParamsPayloadType {
    page: number;
    limit: number;
    token: string;
    search: string;
}
