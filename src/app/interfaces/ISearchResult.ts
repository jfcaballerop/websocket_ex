export interface ISearchResult {
    id: number;
    name: string;
    status: string;
}

export interface ISearchResults {
    data: ISearchResult[];
}
