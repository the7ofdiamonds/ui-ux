import type { ImageObject } from "./Image";
import type { OfferingObject } from "./Offering";
import type { StripeProductObject, StripeProductsResponse } from './Stripe';

import { Image } from "./Image";
import { Offering } from "./Offering";
import { StripeProduct } from './Stripe';

export type OfferingsObject<T = OfferingObject> = {
    id: string | number | null;
    title: string | null;
    description: string | null;
    button_image: ImageObject | null;
    button_link: string | null;
    button_text: string | null;
    list: T[] | null;
};

export class Offerings<T extends OfferingObject = OfferingObject> {
    public id: string | number | null;
    public title: string | null;
    public description: string | null;
    public buttonImage: Image | null;
    public buttonLink: string | null;
    public buttonText: string | null;
    public list: Offering[] = [];

    constructor(offerings?: Partial<OfferingsObject<T>>) {
        this.id = offerings?.id ?? null;
        this.title = offerings?.title ?? null;
        this.description = offerings?.description ? offerings.description : null;
        this.buttonImage = offerings?.button_image
            ? new Image(offerings.button_image)
            : null;
        this.buttonLink = offerings?.button_link ?? null;
        this.buttonText = offerings?.button_text ?? null;
        this.list = this.fromArrayOfferingObject(offerings?.list);
    }

    setList(offering: Offering[]) {
        this.list = offering;
    }

    fromStripeProductsResponse(response: StripeProductsResponse | undefined | null) {
        if (!response || !response?.data || !Array.isArray(response.data) || response.data.length <= 0) return [];

        const list: Array<Offering> = response.data
            .filter((offering): offering is StripeProductObject => offering?.object === 'product')
            .map((product: StripeProductObject) => new StripeProduct(product))
            .map((product) => {
                const offering = new Offering();
                offering.fromStripeProduct(product);
                return offering;
            });

        this.setList(list);

        return list;
    }

    fromArrayOfferingObject(data: Array<OfferingObject> | undefined | null): Array<Offering> {
        if (!data || !Array.isArray(data) || data.length <= 0) return [];

        const list: Array<Offering> = data
            .map((offering) => new Offering(offering));

        this.setList(list);

        return list;
    }

    listToArrayOfferingObject(list: Array<Offering> | null): Array<OfferingObject> | null {
        if (!list || !Array.isArray(list) || list.length === 0) return null;
        return list.filter((offering): offering is Offering => offering instanceof Offering)
            .map((offering) => offering.toOfferingObject());
    }

    toProductsObject(): OfferingsObject {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            button_image: this.buttonImage ? this.buttonImage.toImageObject() : null,
            button_link: this.buttonLink,
            button_text: this.buttonText,
            list: this.listToArrayOfferingObject(this.list)
        };
    }
}