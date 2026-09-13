import type { ContentObject } from './Content';
import { Content } from './Content';
import type { ImageObject } from './Image';
import { Image } from './Image';
import type { ProjectQueryObject } from './ProjectQuery';
import { ProjectQuery } from './ProjectQuery';
import { StripePrice } from './StripePrice';
import type { StripeResponse } from './Stripe';

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
    type: string | null;
    unit_label?: string | null;
    updated: number | null;
    url?: string | null;
}

export type CustomStripeProductMetadataObject = {
    type: string | null;
    category: string | null;
    title: string | null;
    subtitle: string | null;
    promotional_text: string | null;
    content_url: string | null;
    content: ContentObject | null;
    icon: Partial<ImageObject> | null;
    button_icon: ImageObject | null;
    action_word: string | null;
    onboarding_link: string | null;
    repo_type: string | null;
    owner: string | null;
    repo: string | null;
}

export type CustomStripeProductObject = Omit<StripeProductObject, 'metadata'> & {
    metadata: CustomStripeProductMetadataObject;
}

export class CustomStripeProductMetadata {
    type: string | null;
    category: string | null;
    title: string | null;
    subtitle: string | null;
    promotionalText: string | null;
    contentURL: string | null;
    content: Content | null;
    icon: Image | null;
    buttonIcon: Image | null;
    actionWord: string | null;
    onboardingLink: string | null;
    projectQuery: ProjectQuery | null;


    constructor(metadata: CustomStripeProductMetadataObject | Record<string, any>) {
        this.type = metadata?.type ? metadata.type : null;
        this.category = metadata?.category ? metadata.category : null;
        this.title = metadata?.title ? metadata.title : null;
        this.subtitle = metadata?.subtitle ? metadata.subtitle : null;
        this.promotionalText = metadata?.promotional_text ? metadata.promotional_text : null;
        this.contentURL = metadata?.content_url ? metadata.content_url : null;
        this.content = metadata?.content ? metadata.content : null;
        this.icon = metadata?.icon ? new Image({ class_name: metadata.icon }) : null;
        this.buttonIcon = metadata?.button_icon ? new Image(metadata.button_icon) : null;
        this.actionWord = metadata?.action_word ? metadata.action_word : null;
        this.onboardingLink = metadata?.onboarding_link ? metadata.onboarding_link : null;
        this.projectQuery = metadata?.repo_type && metadata?.owner && metadata?.repo ? new ProjectQuery({
            repo_type: metadata.repo_type,
            owner: metadata.owner,
            repo: metadata.repo,
        }) : null;
    }
}

export type StripeProductsResponse = StripeResponse<StripeProductObject>;

export type StripeProductDeletedResponse = {
    id: string | null;
    object: string | null;
    deleted: boolean | null;
};

export class StripeProduct {
    id: string | null;
    object: string | null;
    type: string | null;
    active: boolean | null;
    created: number | null;
    updated: number | null;
    name: string | null;
    stripePrice: StripePrice | null;
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
        this.object = product?.object ? product.object : null;
        this.active = product?.active ? product.active : null;
        this.attributes = product?.attributes ? product.attributes : null;
        this.created = product?.created ? product.created : null;
        this.stripePrice = this.id && product?.default_price ? new StripePrice({ id: product.default_price, product: this.id }) : null;
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
        this.type = product?.metadata?.type ? product.metadata.type : null;
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
            default_price: this.stripePrice ? this.stripePrice.id : null,
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