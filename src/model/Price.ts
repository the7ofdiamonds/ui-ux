export type PriceObject = {
    id: string | number | null;
    price_id: string | null;
    amount: number | bigint | null
    locales: string | null;
    currency: string | null;
    min_fraction_digits: number | null;
    max_fraction_digits: number | null;
}

export class Price {
    id: string | number | null;
    priceID: string | null;
    locales: string = 'en-US';
    currency: string = 'USD';
    minFractionDigits: number = 2;
    maxFractionDigits: number = 12;
    amount: number | bigint | null;

    constructor(price?: Partial<PriceObject>) {
        this.id = price?.id ? price?.id : null;
        this.priceID = price?.price_id ? price.price_id : null;
        this.locales = price?.locales ? price.locales : 'en-US';
        this.currency = price?.currency ? price.currency : 'USD';
        this.minFractionDigits = price?.min_fraction_digits ? price.min_fraction_digits : 2;
        this.maxFractionDigits = price?.max_fraction_digits ? price.max_fraction_digits : 12;
        this.amount = this.isValidAmount(price?.amount) ? price.amount : null;
    }

    setID(id: string | number | null) {
        this.id = id;
    }

    setPriceID(priceID: string | null) {
        this.priceID = priceID;
    }

    setLocales(locales: string | null) {
        if (!locales) return;
        this.locales = locales;
    }

    setCurrency(currency: string | null) {
        if (!currency) return;
        this.currency = currency;
    }

    setMinFractionDigits(minFractionDigits: number | null) {
        if (!minFractionDigits) return;
        this.minFractionDigits = minFractionDigits;
    }

    setMaxFractionDigits(maxFractionDigits: number | null) {
        if (!maxFractionDigits) return;
        this.maxFractionDigits = maxFractionDigits;
    }

    isValidAmount(amount: number | bigint | undefined | null) {
        return typeof amount === 'number' || typeof amount === 'bigint';
    }

    setAmount(amount: number | bigint | null) {
        if (!this.isValidAmount(amount)) return;
        this.amount = amount;
    }

    format(): string {
        return this.isValidAmount(this.amount)
            ? new Intl.NumberFormat(this.locales, {
                style: 'currency',
                currency: this.currency,
                minimumFractionDigits: this.minFractionDigits,
                maximumFractionDigits: this.maxFractionDigits,
            }).format(this.amount)
            : 'Free';
    }

    getDisplay(): string | null {
        return this.isValidAmount(this.amount) ? this.format() : null;
    }

    toPriceObject() {
        return {
            id: this.id,
            price_id: this.priceID,
            amount: this.amount,
            locales: this.locales,
            currency: this.currency,
            min_fraction_digits: this.minFractionDigits,
            max_fraction_digits: this.maxFractionDigits
        }
    }
}