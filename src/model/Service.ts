import type { Offered, OfferingObject } from './Offering';
import type { StripeProductObject } from './StripeProduct';

import { Offering } from './Offering';
import { StripeProduct } from './StripeProduct';

export type ServiceObject = OfferingObject & {
  onboarding_link: string | null;
};

export class Service extends Offering {
  readonly type: Offered = 'service';
  public actionWord: string = 'request';
  public onboardingLink: string | null;

  constructor(service?: Partial<ServiceObject>) {
    super({ ...service, type: 'service' });

    this.actionWord = service?.action_word
      ? service.action_word
      : 'request';
    this.onboardingLink = service?.onboarding_link
      ? service.onboarding_link
      : null;
  }

  override fromStripeProductObject(product: StripeProductObject | undefined | null) {
    if (!product) return null;
    super.fromStripeProductObject(product);

    this.actionWord = product?.metadata?.action_word
      ? product.metadata.action_word
      : 'request';
    this.onboardingLink = product?.metadata?.onboarding_link
      ? product.metadata.onboarding_link
      : null;

    return this;
  }

  override fromStripeProduct(product: StripeProduct) {
    if (!product) return null;
    super.fromStripeProduct(product);

    this.actionWord = product?.metadata?.actionWord
      ? product.metadata.actionWord
      : 'request';
    this.onboardingLink = product?.metadata?.onboardingLink
      ? product.metadata.onboardingLink
      : null;

    return this;
  }

  override fromOffering(offering: Offering): this {
    super.fromOffering(offering);

    this.actionWord = offering?.actionWord
      ? offering.actionWord
      : 'request';
    this.onboardingLink = offering?.onboardingLink
      ? offering.onboardingLink
      : null;

    return this;
  }

  toServiceObject(): ServiceObject {
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
      onboarding_link: this.onboardingLink,
      contentURL: this.contentURL,
      details: null
    };
  }
}
