import type { Offered, OfferingObject } from './Offering';
import type { StripeProductObject } from './Stripe';

import { Offering } from './Offering';
import { StripeProduct } from './Stripe';

export type ProductObject = OfferingObject & {};
// Add details from project details and etc.
export class Product extends Offering {
  readonly type: Offered = 'product';
  public actionWord: string = 'buy';

  constructor(product?: Partial<ProductObject>) {
    super({ ...product, type: 'product' });

    this.actionWord = product?.action_word ? product.action_word : 'buy';
  }

  override fromStripeProductObject(product: StripeProductObject | undefined | null) {
    if (!product) return null;
    super.fromStripeProductObject(product);

    this.actionWord = product?.metadata?.action_word ? product.metadata.action_word : 'buy';

    return this;
  }

  override fromStripeProduct(product: StripeProduct) {
    if (!product) return null;
    super.fromStripeProduct(product);

    this.actionWord = product?.metadata?.actionWord ? product.metadata.actionWord : 'buy';

    return this;
  }

  override fromOffering(offering: Offering): this {
    super.fromOffering(offering);

    this.actionWord = offering?.actionWord ? offering.actionWord : 'buy';

    return this;
  }

  toProductObject(): ProductObject {
    return {
      id: this.id,
      type: this.type,
      category: this.category,
      title: this.title,
      name: this.name,
      subtitle: this.subtitle,
      promotional_text: this.promotionalText,
      description: this.description,
      features: this.features ? this.features.toFeaturesObject() : null,
      content: this.content,
      pricing: this.pricing ? this.pricing?.toPricingObject() : null,
      icon: this.icon ? this.icon.toImageObject() : null,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      button_icon: this.buttonIcon ? this.buttonIcon.toImageObject() : null,
      url: this.url,
      action_word: this.actionWord,
      contentURL: this.contentURL,
      details: null,
      onboarding_link: this.onboardingLink
    };
  }
}
