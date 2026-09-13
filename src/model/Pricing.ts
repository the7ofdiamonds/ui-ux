import { StripePrice, isStripePriceType, isStripePriceRecurringInterval, isStripePriceRecurringUsageType } from "./StripePrice";
import type { PricingTierObject } from "./PricingTier";
import { PricingTier } from "./PricingTier";

const SUBSCRIPTION_INTERVAL = [
  'daily',
  'weekly',
  'monthly',
  'quarterly',
  'annual',
  'lifetime'
];
export type SubscriptionInterval = typeof SUBSCRIPTION_INTERVAL[number];

export const subscriptionIntervalLabels: Record<SubscriptionInterval, string> =
{
  daily: '/day',
  weekly: '/week',
  monthly: '/month',
  quarterly: '/quarter',
  annual: '/year',
  lifetime: 'lifetime',
};

export type PricingObject = {
  id: string | number | null;
  price_id: string | null;
  locales: string | null;
  currency: string | null;
  min_fraction_digits: number | null;
  max_fraction_digits: number | null;
  price: number | bigint | null;
  starting_price: number | bigint | null;
  max_price: number | bigint | null;
  range: boolean;
  subscription: boolean;
  interval: SubscriptionInterval | null;
  tiers: Array<PricingTierObject> | null;
  display: string | null;
};

export class Pricing {
  id: string | number | null;
  priceID: string | null;
  locales: string = 'en-US';
  currency: string = 'USD';
  minFractionDigits: number = 2;
  maxFractionDigits: number = 12;
  price: number | bigint | null;
  startingPrice: number | bigint | null;
  maxPrice: number | bigint | null;
  range: boolean = false;
  subscription: boolean = false;
  interval: SubscriptionInterval | null = null;
  tiers: Array<PricingTier> | null;
  display: string | null;

  constructor(data?: Partial<PricingObject>) {
    this.id = data?.id ? data?.id : null;
    this.priceID = data?.price_id ? data.price_id : null;
    this.locales = data?.locales ? data.locales : 'us';
    this.currency = data?.currency ? data.currency : 'USD';
    this.minFractionDigits = data?.min_fraction_digits ? data.min_fraction_digits : 2;
    this.maxFractionDigits = data?.max_fraction_digits ? data.max_fraction_digits : 12;
    this.price = this.isValidPrice(data?.price) ? data.price : null;
    this.startingPrice = this.isValidPrice(data?.starting_price) ? data.starting_price : null;
    this.maxPrice = this.isValidPrice(data?.max_price) ? data.max_price : null;
    this.range = data?.range ? data.range : false;
    this.subscription = data?.subscription ? data.subscription : false;
    this.interval = data?.interval ? data.interval : null;
    this.tiers = this.getTiers(data?.tiers);
    this.display = data?.display ? data.display : this.getDisplay();
  }

  isValidPrice(price: number | bigint | undefined | null) {
    return typeof price === 'number' || typeof price === 'bigint';
  }

  format(
    price: number | bigint | undefined | null,
    locales?: string | undefined | null,
    currency?: string | undefined | null,
    minFractionDigits?: number | undefined | null,
    maxFractionDigits?: number | undefined | null
  ): string | null {
    return this.isValidPrice(price)
      ? new Intl.NumberFormat(locales ?? this.locales, {
        style: 'currency',
        currency: currency ?? this.currency,
        minimumFractionDigits: minFractionDigits ?? this.minFractionDigits,
        maximumFractionDigits: maxFractionDigits ?? this.maxFractionDigits,
      }).format(price)
      : 'Free';
  }

  getDisplayRange(
    startingPrice: number | bigint | undefined | null,
    maxPrice: number | bigint | undefined | null,
    locales?: string | null,
    currency?: string | null,
  ): string | null {
    const locale = locales ?? this.locales;
    const currencyCode = currency ?? this.currency;

    if (this.isValidPrice(startingPrice) && this.isValidPrice(maxPrice)) {
      return `${this.format(
        startingPrice,
        locale,
        currencyCode,
        0
      )} - ${this.format(
        maxPrice,
        locale,
        currencyCode,
        0
      )}`;
    }

    if (this.isValidPrice(startingPrice)) {
      return `Starting At ${this.format(
        startingPrice,
        locale,
        currencyCode,
        0
      )}`;
    }

    return null;
  }

  formatSubscription(cost: string | null, interval: SubscriptionInterval | null) {
    return `${cost ?? '$0'} ${subscriptionIntervalLabels[interval ?? 'monthly']}`;
  }

  getDisplay(): string | null {
    let cost: string | null = null;

    if (this.range && (this.startingPrice || this.maxPrice)) {
      cost = this.getDisplayRange(
        this.startingPrice,
        this.maxPrice,
        this.locales,
        this.currency
      )
    }

    if (!this.range && this.price) {
      cost = this.format(
        this.price,
        this.locales,
        this.currency,
        this.minFractionDigits,
        this.maxFractionDigits
      );
    }

    if (cost && this.subscription && this.interval) {
      return this.formatSubscription(cost, this.interval)
    }

    if (!cost) return 'Free';

    return cost;
  }

  getTiers(tiers: Array<PricingTierObject> | undefined | null): Array<PricingTier> | null {
    return tiers && Array.isArray(tiers) && tiers.length > 0
      ? tiers.map((tier) => new PricingTier(tier))
      : null;
  }

  getIntervalFromPrice(interval: string | undefined | null): SubscriptionInterval | null {
    switch (interval) {
      case 'day':
        return 'daily';

      case 'week':
        return 'weekly';

      case 'month':
        return 'monthly';

      case 'year':
        return 'annual';

      default:
        return null;
    }
  }

  formatStripePrice(amount: number | null): number {
    if (!amount || amount === 0) return 0;
    return amount / 100;
  }

  fromStripePrice(price: StripePrice | null | undefined) {
    if (!price) return;
    this.id = price?.metadata?.id ? price.metadata.id : null;
    this.priceID = price?.id ? price.id : null;
    this.locales = price?.metadata?.locales ? price.metadata.locales : this.locales;
    this.currency = price?.currency ? new String(price.currency).toLocaleUpperCase() : this.currency;
    this.minFractionDigits = price?.metadata?.minFractionDigits ? price.metadata.minFractionDigits : this.minFractionDigits;
    this.maxFractionDigits = price?.metadata?.maxFractionDigits ? price.metadata.maxFractionDigits : this.maxFractionDigits;
    this.price = price?.unitAmount ? this.formatStripePrice(price.unitAmount) : null;
    this.startingPrice = price?.metadata?.startingPrice ? this.formatStripePrice(price.metadata.startingPrice) : null;
    this.maxPrice = price?.metadata?.maxPrice ? this.formatStripePrice(price.metadata.maxPrice) : null;
    this.range = price?.metadata?.range ? price.metadata.range : false;
    this.subscription = isStripePriceType(price?.type) && price.type === 'recurring'
      ? true : false;
    this.interval = isStripePriceRecurringInterval(price?.recurring?.interval) ? this.getIntervalFromPrice(price.recurring.interval) : null;
    this.display = this.getDisplay();

    return this;
  }

  toPricingObject(): PricingObject {
    return {
      id: this.id,
      price_id: this.priceID,
      locales: this.locales,
      currency: this.currency,
      min_fraction_digits: this.minFractionDigits,
      max_fraction_digits: this.maxFractionDigits,
      price: this.price,
      starting_price: this.startingPrice,
      max_price: this.maxPrice,
      range: this.range,
      subscription: this.subscription,
      interval: this.interval,
      tiers: this.tiers ? this.tiers.map((tier) => tier.toPricingTierObject()) : null,
      display: this.display,
    };
  }
}
