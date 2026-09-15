import { StripePrice, isStripePriceType, isStripePriceRecurringInterval, isStripePriceRecurringUsageType, StripePriceTier } from "./StripePrice";
import { Price } from './Price';
import type { PricingTierObject } from "./PricingTier";
import { PricingTier } from "./PricingTier";
import type { PricingTiersObject } from "./PricingTiers";
import { PricingTiers } from "./PricingTiers";

const SUBSCRIPTION_INTERVAL = [
  'daily',
  'weekly',
  'monthly',
  'quarterly',
  'annual',
  'lifetime'
] as const;
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
};

export class Pricing {
  id: string | number | null;
  priceID: string | null;
  locales: string = 'en-US';
  currency: string = 'USD';
  minFractionDigits: number = 2;
  maxFractionDigits: number = 12;
  price: Price | null;
  startingPrice: Price | null;
  maxPrice: Price | null;
  range: boolean = false;
  subscription: boolean = false;
  interval: SubscriptionInterval | null = null;
  tiers: PricingTiers | null;

  constructor(data?: Partial<PricingObject>) {
    this.id = data?.id ? data?.id : null;
    this.priceID = data?.price_id ? data.price_id : null;
    this.locales = data?.locales ? data.locales : 'en-US';
    this.currency = data?.currency ? data.currency : 'USD';
    this.minFractionDigits = data?.min_fraction_digits ? data.min_fraction_digits : 2;
    this.maxFractionDigits = data?.max_fraction_digits ? data.max_fraction_digits : 12;
    this.price = this.getPrice(data?.price);
    this.subscription = data?.subscription ? data.subscription : false;
    this.interval = data?.interval ? data.interval : null;
    this.tiers = this.getTiers(data?.tiers);
    this.startingPrice = this.getStartingPrice(data?.starting_price);
    this.maxPrice = this.getMaxPrice(data?.max_price);
    this.range = this.startingPrice && this.maxPrice ? true : false;
  }

  isValidPrice(price: number | bigint | undefined | null) {
    return typeof price === 'number' || typeof price === 'bigint';
  }

  getPrice(amount: number | bigint | undefined | null): Price | null {
    let price: Price | null = null;

    if (this.isValidPrice(amount)) {
      price = new Price();
      price.setID(this.id)
      price.setPriceID(this.priceID)
      price.setLocales(this.locales)
      price.setCurrency(this.currency)
      price.setMinFractionDigits(this.minFractionDigits)
      price.setMaxFractionDigits(this.maxFractionDigits)
      price.setAmount(amount)
    }

    return price;
  }

  getStartingPrice(amount: number | bigint | undefined | null): Price | null {
    return this.getPrice(this.tiers?.startingAt ?? amount);
  }

  getMaxPrice(amount: number | bigint | undefined | null): Price | null {
    return this.getPrice(this.tiers?.maxPrice ?? amount);
  }

  getDisplayRange(
    startingPrice: number | bigint | undefined | null,
    maxPrice: number | bigint | undefined | null,
    locales?: string | null,
    currency?: string | null,
    minFractionDigits?: number | null,
    maxFractionDigits?: number | null
  ): string | null {
    let starting: Price | null = null;
    let max: Price | null = null;

    starting = this.getPrice(startingPrice);
    if (starting) {
      if (locales) starting.setLocales(locales)
      if (currency) starting.setCurrency(currency)
      if (minFractionDigits) starting.setMinFractionDigits(minFractionDigits)
      if (maxFractionDigits) starting.setMaxFractionDigits(maxFractionDigits)
    }

    max = this.getPrice(maxPrice);
    if (max) {
      if (locales) max.setLocales(locales)
      if (currency) max.setCurrency(currency)
      if (minFractionDigits) max.setMinFractionDigits(minFractionDigits)
      if (maxFractionDigits) max.setMaxFractionDigits(maxFractionDigits)
    }

    if (starting && max) {
      return `${starting.format()} - ${max.format()}`;
    }

    if (starting) {
      return `Starting At ${starting.format()}`;
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
        this.startingPrice?.amount,
        this.maxPrice?.amount,
        this.locales,
        this.currency
      )
    }

    if (!this.range && this.price) {
      cost = this.price.format();
    }

    if (cost && this.subscription && this.interval) {
      return this.formatSubscription(cost, this.interval)
    }

    if (!cost) return 'Free';

    return cost;
  }

  getTiers(tiers: Array<PricingTierObject> | undefined | null): PricingTiers | null {
    return tiers && Array.isArray(tiers) && tiers.length > 0
      ? new PricingTiers({ id: this.id, price_id: this.priceID, tiers: tiers })
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

  getPriceFromStripePrice(amount: number | bigint | undefined | null): Price | null {
    return this.getPrice(amount);
  }

  fromStripeTiers(tiers: Array<StripePriceTier> | undefined | null): PricingTiers | null {
    return Array.isArray(tiers) && tiers.length > 0
      ? new PricingTiers().fromStripePriceTiers(tiers)
      : null;
  }

  fromStripePrice(price: StripePrice | null | undefined) {
    if (!price) return;
    this.id = price?.metadata?.id ? price.metadata.id : null;
    this.priceID = price?.id ? price.id : null;
    this.locales = price?.metadata?.locales ? price.metadata.locales : this.locales;
    this.currency = price?.currency ? new String(price.currency).toLocaleUpperCase() : this.currency;
    this.minFractionDigits = price?.metadata?.minFractionDigits ? price.metadata.minFractionDigits : this.minFractionDigits;
    this.maxFractionDigits = price?.metadata?.maxFractionDigits ? price.metadata.maxFractionDigits : this.maxFractionDigits;
    this.price = this.getPriceFromStripePrice(price?.unitAmount);
    this.startingPrice = this.getPriceFromStripePrice(price?.metadata?.startingPrice);
    this.maxPrice = this.getPriceFromStripePrice(price?.metadata?.maxPrice);
    this.range = price?.metadata?.range ? price.metadata.range : false;
    this.subscription = isStripePriceType(price?.type) && price.type === 'recurring'
      ? true : false;
    this.interval = isStripePriceRecurringInterval(price?.recurring?.interval) ? this.getIntervalFromPrice(price.recurring.interval) : null;
    this.tiers = this.fromStripeTiers(price?.tiers);

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
      price: this.price ? this.price.amount : null,
      starting_price: this.startingPrice ? this.startingPrice.amount : null,
      max_price: this.maxPrice ? this.maxPrice.amount : null,
      range: this.range,
      subscription: this.subscription,
      interval: this.interval,
      tiers: this.tiers ? this.tiers.toArrayPricingTierObject() : null
    };
  }
}
