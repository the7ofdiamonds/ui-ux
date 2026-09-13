export type StripeResponse<T> = {
    data?: Array<T> | null;
    has_more?: boolean | null;
    object?: string | null;
    url?: string | null;
    error?: {
        message?: string | null;
        type?: string | null;
    }
};