import type { ImageObject } from '@the7ofdiamonds/ui-ux';
import { Image } from '@the7ofdiamonds/ui-ux';

export type StripeProductType = 'good' | 'service';
export type StripeProductFeature = { name: string; };
export type StripeProductPackageDimensions = {
    height: number;
    length: number;
    weight: number;
    width: number;
};

export type StripeProductObject = {
    id: string | null;
    object: 'product';
    active: boolean | null;
    attributes?: string[] | null;
    created: number | null;
    default_price?: string | null;
    description?: string | null;
    features: Array<StripeProductFeature> | null;
    images: string[] | null;
    livemode: boolean | null;
    marketing_features: Array<StripeProductFeature> | null;
    metadata: Record<string, any> | null;
    name: string | null;
    package_dimensions?: StripeProductPackageDimensions | null;
    shippable?: boolean | null;
    statement_descriptor?: string | null;
    tax_code?: string | null;
    type: StripeProductType | null;
    unit_label?: string | null;
    updated: number | null;
    url?: string | null;
}

export type CustomStripeProductMetadataObject = {
    category: string | null;
    title: string | null;
    subtitle: string | null;
    promotional_text: string | null;
    content_url: string | null;
    content: string | null;
    pricing_id: string | null;
    icon: ImageObject | null;
    button_icon: ImageObject | null;
    action_word: string | null;
}

export type CustomStripeProductObject = Omit<StripeProductObject, 'metadata'> & {
    metadata: CustomStripeProductMetadataObject;
}

export class CustomStripeProductMetadata {
    category: string | null;
    title: string | null;
    subtitle: string | null;
    promotionalText: string | null;
    contentURL: string | null;
    content: string | null;
    pricingID: string | null;
    icon: Image | null;
    buttonIcon: Image | null;
    actionWord: string | null;

    constructor(metadata: CustomStripeProductMetadataObject | Record<string, any>) {
        this.category = metadata?.category ? metadata.category : null;
        this.title = metadata?.title ? metadata.title : null;
        this.subtitle = metadata?.subtitle ? metadata.subtitle : null;
        this.promotionalText = metadata?.promotional_text ? metadata.promotional_text : null;
        this.contentURL = metadata?.content_url ? metadata.content_url : null;
        this.content = metadata?.content ? metadata.content : null;
        this.pricingID = metadata?.pricing_id ? metadata.pricing_id : null;
        this.icon = metadata?.icon ? new Image(metadata.icon) : null;
        this.buttonIcon = metadata?.button_icon ? new Image(metadata.button_icon) : null;
        this.actionWord = metadata?.action_word ? metadata.action_word : null;
    }
}

export type StripeProductsResponse = {
    data?: Array<StripeProductObject> | null;
    has_more?: boolean | null;
    object?: string | null;
    url?: string | null;
    error?: {
        message?: string | null;
        type?: string | null;
    }
};

export type StripeProductDeletedResponse = {
    id: string | null;
    object: string | null;
    deleted: boolean | null;
};

export class StripeProduct {
    id: string | null;
    object: string = 'product';
    type: StripeProductType | null;
    active: boolean | null;
    created: number | null;
    updated: number | null;
    name: string | null;
    defaultPrice: string | null;
    images: string[] | null;
    description: string | null;
    marketingFeatures: Array<StripeProductFeature> | null;
    features: Array<StripeProductFeature> | null;
    packageDimensions: StripeProductPackageDimensions | null;
    shippable: boolean | null;
    statementDescriptor: string | null;
    taxCode: string | null;
    unitLabel: string | null;
    url: string | null;
    livemode: boolean | null;
    attributes: string[] | null;
    metadata: CustomStripeProductMetadata | null;

    constructor(product: Partial<StripeProductObject>) {
        this.id = product?.id ? product.id : null;
        this.active = product?.active ? product.active : null;
        this.attributes = product?.attributes ? product.attributes : null;
        this.created = product?.created ? product.created : null;
        this.defaultPrice = product?.default_price ? product.default_price : null;
        this.description = product?.description ? product.description : null;
        this.features = product?.features ? product.features : null;
        this.images = product?.images ? product.images : null;
        this.livemode = product?.livemode ? product.livemode : null;
        this.marketingFeatures = product?.marketing_features ? product.marketing_features : null;
        this.metadata = product?.metadata ? new CustomStripeProductMetadata(product.metadata) : null;
        this.name = product?.name ? product.name : null;
        this.packageDimensions = product?.package_dimensions ? product.package_dimensions : null;
        this.shippable = product?.shippable ? product.shippable : null;
        this.statementDescriptor = product?.statement_descriptor ? product.statement_descriptor : null;
        this.taxCode = product?.tax_code ? product.tax_code : null;
        this.type = product?.type ? product.type : null;
        this.unitLabel = product?.unit_label ? product.unit_label : null;
        this.updated = product?.updated ? product.updated : null;
        this.url = product?.url ? product.url : null;
    }

    toStripeProductObject(): StripeProductObject {
        return {
            id: this.id,
            object: 'product',
            type: this.type,
            active: this.active,
            created: this.created,
            updated: this.updated,
            name: this.name,
            default_price: this.defaultPrice,
            images: this.images,
            description: this.description,
            marketing_features: this.marketingFeatures,
            features: this.features,
            package_dimensions: this.packageDimensions,
            shippable: this.shippable,
            statement_descriptor: this.statementDescriptor,
            tax_code: this.taxCode,
            unit_label: this.unitLabel,
            url: this.url,
            livemode: this.livemode,
            attributes: this.attributes,
            metadata: this.metadata
        }
    }
}