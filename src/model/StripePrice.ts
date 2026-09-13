import type { StripeResponse } from './Stripe';

export type StripePriceMetadataObject = {
    id: string | number | null;
    locales: string | null;
    range: boolean;
    min_fraction_digits: number | null;
    max_fraction_digits: number | null;
    starting_price: number | null;
    max_price: number | null;
}

export type StripePriceRecurringObject = {
    interval: string | null,
    interval_count: number | null,
    trial_period_days: null,
    usage_type: string
}

const TIER_MODE = ['graduated', 'volume'];
export type StripePriceTiersMode = typeof TIER_MODE[number];

export type StripePriceTierObject = {
    flat_amount: number | bigint | null;
    flat_amount_decimal: string | null;
    unit_amount: number | null;
    unit_amount_decimal: string | null;
    up_to: number | null;
};

const TYPE = ['one_time', 'recurring'];
export type StripePriceType = typeof TYPE[number];
export function isStripePriceType(value: unknown): value is StripePriceType {
    return typeof value === 'string' && (TYPE as readonly string[]).includes(value);
}

export type StripePriceObject = {
    id: string | null,
    object: string | null,
    active: boolean | null,
    billing_scheme: string | null,
    created: number | null,
    currency: string | null,
    custom_unit_amount: null,
    livemode: boolean | null,
    lookup_key: null,
    metadata: StripePriceMetadataObject | null,
    nickname: string | null,
    product: string | null,
    recurring: StripePriceRecurringObject | null,
    tax_behavior: string | null,
    tiers_mode: StripePriceTiersMode | null,
    tiers: Array<StripePriceTierObject> | null,
    transform_quantity: null,
    type: StripePriceType | null,
    unit_amount: number | null,
    unit_amount_decimal: string | null
}

const INTERVALS = ['day', 'week', 'month', 'year'] as const;
export type StripePriceRecurringInterval = typeof INTERVALS[number];
export function isStripePriceRecurringInterval(value: unknown): value is StripePriceRecurringInterval {
    return typeof value === 'string' && (INTERVALS as readonly string[]).includes(value);
}

const USAGE_TYPES = ['metered', 'licensed'];
export type StripePriceRecurringUsageType = typeof USAGE_TYPES[number];
export function isStripePriceRecurringUsageType(value: unknown): value is StripePriceRecurringUsageType {
    return typeof value === 'string' && (USAGE_TYPES as readonly string[]).includes(value);
}

export class StripePriceRecurring {
    interval: StripePriceRecurringInterval | null;
    intervalCount: number | null;
    trialPeriodDays: number | null;
    usageType: StripePriceRecurringUsageType | null;

    constructor(recurring: Partial<StripePriceRecurringObject>) {
        this.interval = isStripePriceRecurringInterval(recurring?.interval) ? recurring.interval : null;
        this.intervalCount = recurring?.interval_count ? recurring.interval_count : null;
        this.trialPeriodDays = recurring?.trial_period_days ? recurring.trial_period_days : null;
        this.usageType = isStripePriceRecurringUsageType(recurring?.usage_type) ? recurring.usage_type : null;
    }
}

export type StripePricesResponse = StripeResponse<StripePriceObject>;

export class StripePriceMetadata {
    id: string | number | null;
    locales: string | null;
    minFractionDigits: number | null;
    maxFractionDigits: number | null;
    range: boolean = false;
    startingPrice: number | null;
    maxPrice: number | null;

    constructor(metadata: Partial<StripePriceMetadataObject>) {
        this.id = metadata?.id ? metadata.id : null;
        this.locales = metadata?.locales ? metadata.locales : null;
        this.minFractionDigits = metadata?.min_fraction_digits ? metadata.min_fraction_digits : null;
        this.maxFractionDigits = metadata?.max_fraction_digits ? metadata.max_fraction_digits : null;
        this.range = metadata?.range ? metadata.range : false;
        this.startingPrice = metadata?.starting_price ? metadata.starting_price : null;
        this.maxPrice = metadata?.max_price ? metadata.max_price : null;
    }
}

export class StripePriceTier {
    flatAmount: number | bigint | null;
    flatAmountDecimal: string | null;
    unitAmount: number | null;
    unitAmountDecimal: string | null;
    upTo: number | null;

    constructor(tier: Partial<StripePriceTierObject>) {
        this.flatAmount = typeof tier?.flat_amount === 'number' || typeof tier?.flat_amount === 'bigint' ? tier.flat_amount : null;
        this.flatAmountDecimal = typeof tier?.flat_amount_decimal === 'string' ? tier.flat_amount_decimal : null;
        this.unitAmount = typeof tier?.unit_amount === 'number' ? tier.unit_amount : null;
        this.unitAmountDecimal = typeof tier?.unit_amount_decimal === 'string' ? tier.unit_amount_decimal : null;
        this.upTo = typeof tier?.up_to === 'number' ? tier.up_to : null;
    }
}

export class StripePrice {
    id: string | null;
    object: string | null;
    active: boolean | null;
    billingScheme: string | null;
    created: number | null;
    currency: string | null;
    customUnitAmount: null;
    livemode: boolean | null;
    lookupKey: null;
    metadata: StripePriceMetadata | null;
    nickname: string | null;
    product: string | null;
    recurring: StripePriceRecurring | null;
    taxBehavior: string | null;
    tiersMode: StripePriceTiersMode | null;
    tiers: Array<StripePriceTier> | null;
    transformQuantity: null;
    type: StripePriceType | null;
    unitAmount: number | null;
    unitAmountDecimal: string | null;

    constructor(price: Partial<StripePriceObject>) {
        this.id = price?.id ? price.id : null;
        this.object = price?.object ? price.object : null;
        this.active = price?.active ? price.active : null;
        this.billingScheme = price?.billing_scheme ? price.billing_scheme : null;
        this.created = price?.created ? price.created : null;
        this.currency = price?.currency ? price.currency : null;
        this.customUnitAmount = price?.custom_unit_amount ? price.custom_unit_amount : null;
        this.livemode = price?.livemode ? price.livemode : null;
        this.lookupKey = price?.lookup_key ? price.lookup_key : null;
        this.metadata = price?.metadata ? new StripePriceMetadata(price.metadata) : null;
        this.nickname = price?.nickname ? price.nickname : null;
        this.product = price?.product ? price.product : null;
        this.recurring = price?.recurring ? new StripePriceRecurring(price.recurring) : null;
        this.taxBehavior = price?.tax_behavior ? price.tax_behavior : null;
        this.tiersMode = price?.tiers_mode ? price.tiers_mode : null;
        this.tiers = price?.tiers && Array.isArray(price.tiers) && price.tiers.length > 0
            ? price.tiers.map((tier) => new StripePriceTier(tier)) : null;
        this.transformQuantity = price?.transform_quantity ? price.transform_quantity : null;
        this.type = isStripePriceType(price?.type) ? price.type : null;
        this.unitAmount = price?.unit_amount ? price.unit_amount : null;
        this.unitAmountDecimal = price?.unit_amount_decimal ? price.unit_amount_decimal : null;
    }
}