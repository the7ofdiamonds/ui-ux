export type Backend = 'Custom' | 'Firebase' | 'Stripe';

export type APIPANDSObject = {
    backend: Backend | null;
    headers: Record<string, string> | null,
    url: string | null;
}

export class APIPANDS {
    backend: Backend = 'Custom';
    headers: Headers | null;
    url: string | null;

    constructor(api: APIPANDSObject) {
        this.backend = api?.backend ? api.backend : 'Custom';
        this.headers = api?.headers ? new Headers(api.headers) : null;
        this.url = api?.url ?? null;
    }

    setBackend(backend: Backend){
        this.backend = backend;
    }

    setHeaders(headers: Headers) {
        this.headers = headers;
    }

    setURL(url: string) {
        this.url = url;
    }
}