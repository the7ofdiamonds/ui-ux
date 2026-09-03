export type APIPANDSObject = {
    headers: Record<string, string> | null,
    url: string | null;
}

export class APIPANDS {
    headers: Headers | null;
    url: string | null;

    constructor(api: APIPANDSObject) {
        this.headers = api?.headers ? new Headers(api.headers) : null;
        this.url = api?.url ?? null;
    }

    setHeaders(headers: Headers) {
        this.headers = headers;
    }

    setURL(url: string) {
        this.url = url;
    }
}