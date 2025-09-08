import { Offered, Offering, OfferingObject } from './Offering';


export type ServiceObject = OfferingObject & {
  onboarding_link: string | null;
};

export class Service extends Offering {
  readonly type: Offered = 'service';
  public actionWord: string = 'request';
  public onboardingLink: string | null;

  constructor(service?: Partial<ServiceObject>) {
    super({ ...service, type: 'service' });

    this.onboardingLink = service?.onboarding_link
      ? service.onboarding_link
      : null;
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
    };
  }
}
