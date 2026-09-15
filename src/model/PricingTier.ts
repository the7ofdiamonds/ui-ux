import type { FeatureObject } from "./Feature";
import { Feature } from "./Feature";
import { StripePriceTier } from "./StripePrice";
import { Price } from "./Price";

export type PricingTierObject = {
    id: string | number | null;
    name: string | null;
    title: string | null;
    price: number | bigint | null;
    features: Array<FeatureObject> | null;
}

export class PricingTier {
    id: string | number | null;
    name: string | null;
    title: string | null;
    price: Price | null;
    features: Array<Feature> | null;

    constructor(tier?: Partial<PricingTierObject> | undefined | null) {
        this.id = tier?.id ? tier.id : null;
        this.name = tier?.name ? tier.name : null;
        this.title = tier?.title ? tier.title : null;
        this.price = this.getPrice(tier?.price);
        this.features = tier?.features ? tier.features.map((feature) => new Feature(feature)) : null;
    }

    getPrice(amount: number | bigint | undefined | null): Price | null {
        const price = new Price();

        if (price.isValidAmount(amount)) {
            price.setID(this.id)
            price.setAmount(amount)
            return price;
        }

        return null;
    }

    fromStripePriceTier(tier: StripePriceTier | undefined | null) {
        if (!tier) return null;
        this.price = this.getPrice(tier?.flatAmount);
        if (this.price && tier?.id) this.price?.setPriceID(tier?.id)
        return this;
    }

    toPricingTierObject() {
        return {
            id: this.id,
            name: this.name,
            title: this.title,
            price: this.price ? this.price.amount : null,
            features: this.features
                ? this.features.map((feature) => feature.toFeatureObject())
                : null
        }
    }
}