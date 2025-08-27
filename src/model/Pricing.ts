export type PricingObject = {
  id: string | number | null;
  price_id: string | null;
  locales: string | null;
  currency: string | null;
  price: number | null;
  starting_price: number | null;
  max_price: number | null;
  range: boolean;
  display: string | null;
};

export class Pricing {
  id: string | number | null;
  priceID: string | null;
  locales: string = 'us';
  currency: string = 'USD';
  price: number | null;
  startingPrice: number | null;
  maxPrice: number | null;
  range: boolean = false;
  display: string | null;

  constructor(data?: Partial<PricingObject>) {
    this.id = data?.id ? data?.id : null;
    this.priceID = data?.price_id ? data.price_id : null;
    this.locales = data?.locales ? data.locales : 'us';
    this.currency = data?.currency ? data.currency : 'USD';
    this.price = data?.price ? data.price : null;
    this.startingPrice = data?.starting_price ? data.starting_price : null;
    this.maxPrice = data?.max_price ? data.max_price : null;
    this.range = data?.range ? data.range : false;
    this.display = data?.display
      ? data.display
      : this.range
      ? this.getDisplayRange(
          this.startingPrice,
          this.maxPrice,
          this.locales,
          this.currency
        )
      : this.getDisplay(this.price, this.locales, this.currency);
  }

  format(
    price: number | null,
    locales: string = 'us',
    currency: string = 'USD',
    minFractionDigits: number = 2,
    maxFractionDigits: number = 2
  ): string | null {
    return price
      ? new Intl.NumberFormat(locales, {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: minFractionDigits,
          maximumFractionDigits: maxFractionDigits,
        }).format(price)
      : null;
  }

  getDisplay(
    price: number | null,
    locales: string = 'us',
    currency: string = 'USD',
    minFractionDigits: number = 2,
    maxFractionDigits: number = 2
  ): string | null {
    return this.format(
      price,
      locales,
      currency,
      minFractionDigits,
      maxFractionDigits
    );
  }

  getDisplayRange(
    startingPrice: number | null,
    maxPrice: number | null,
    locales: string = 'us',
    currency: string = 'USD'
  ): string | null {
    return startingPrice && maxPrice
      ? `${this.format(startingPrice, locales, currency, 0)} - ${this.format(
          maxPrice,
          locales,
          currency,
          0
        )}`
      : startingPrice
      ? `Starting At ${this.format(startingPrice, locales, currency, 0)}`
      : null;
  }

  toPricingObject(): PricingObject {
    return {
      id: this.id,
      price_id: this.priceID,
      locales: this.locales,
      currency: this.currency,
      price: this.price,
      starting_price: this.startingPrice,
      max_price: this.maxPrice,
      range: this.range,
      display: this.display,
    };
  }
}
