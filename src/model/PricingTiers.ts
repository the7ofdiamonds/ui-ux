import type { FeatureObject } from "./Feature";
import { Feature } from "./Feature";
import { StripePriceTier } from "./StripePrice";
import { PricingTier } from "./PricingTier";

export type PricingTiersObject = {
    id: string | number | null;
    price_id: string | null;
    name: string | null;
    title: string | null;
    tiers: Array<Partial<PricingTiersObject>> | null;
    features: Array<FeatureObject> | null;
}

export class PricingTiers {
    id: string | number | null;
    priceID: string | null;
    name: string | null;
    title: string | null;
    tiers: Array<PricingTier> | null;
    prices: Array<number>;
    startingAt: number | null;
    maxPrice: number | null;
    features: Array<Feature> | null;

    constructor(pricingTiers?: Partial<PricingTiersObject> | undefined | null) {
        this.id = pricingTiers?.id ? pricingTiers.id : null;
        this.priceID = pricingTiers?.price_id ? pricingTiers.price_id : null;
        this.name = pricingTiers?.name ? pricingTiers.name : null;
        this.title = pricingTiers?.title ? pricingTiers.title : null;
        this.tiers = pricingTiers?.tiers && Array.isArray(pricingTiers.tiers) && pricingTiers.tiers.length > 0
            ? pricingTiers.tiers.map((tier) => new PricingTier(tier))
            : null;
        this.prices = this.getPrices();
        this.startingAt = this.getStartingAt();
        this.maxPrice = this.getMaxPrice();
        this.features = pricingTiers?.features ? pricingTiers.features.map((feature) => new Feature(feature)) : null;
    }

    getPrices(): Array<number> {
        if (this.tiers && Array.isArray(this.tiers) && this.tiers.length > 0) {
            return this.tiers
                .map((tier) => tier.price?.amount)
                .filter((price): price is number => typeof price === 'number');
        }
        return [];
    }

    getStartingAt() {
        let startingAt: number | bigint | null = null;

        const prices = this.prices;
        if (Array.isArray(prices) && prices.length > 0) startingAt = Math.min(...prices)

        return startingAt;
    }

    getMaxPrice() {
        let maxPrice: number | bigint | null = null;

        const prices = this.prices;
        if (Array.isArray(prices) && prices.length > 0) maxPrice = Math.max(...prices)

        return maxPrice;
    }

    fromStripePriceTiers(tiers: Array<StripePriceTier> | undefined | null) {
        if (!tiers || !Array.isArray(tiers) || tiers.length === 0) return null;
        this.tiers = tiers
            .map((tier) => new PricingTier().fromStripePriceTier(tier))
            .filter((tier) => tier instanceof PricingTier);
        return this;
    }

    toArrayPricingTierObject() {
        return this.tiers ? this.tiers.map((tier) => tier.toPricingTierObject()) : null
    }
}