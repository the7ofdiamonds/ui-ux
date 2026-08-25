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
    metadata: Record<string, any> | null;

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
        this.metadata = product?.metadata ? product.metadata : null;
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