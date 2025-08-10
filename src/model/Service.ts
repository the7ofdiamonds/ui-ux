import { Feature, FeatureObject } from './Feature';
import { Image, ImageObject } from './Image';
import { Skill, SkillObject } from './Skill';

export type ServiceObject = SkillObject & {
  id: string | number | null;
  created_at: string | null;
  updated_at: string | null;
  type: string | null;
  title: string | null;
  content: string | null;
  description: string | null;
  price: string | number | null;
  features: Array<FeatureObject> | null;
  onboarding_link: string | null;
  icons: Array<ImageObject> | null;
  button_icon: ImageObject | null;
  action_word: string | null;
  price_id: string | null;
  currency: string | null;
  url: string | null;
};

export class Service extends Skill {
  id: string | number | null;
  createdAt: string | null;
  updatedAt: string | null;
  title: string | null;
  type: string | null;
  content: string | null;
  description: string | null;
  price: string | number | null;
  features: Array<Feature> | null;
  onboardingLink: string | null;
  icons: Array<Image> | null;
  buttonIcon: Image | null;
  actionWord: string | null;
  priceID: string | null;
  currency: string | null;
  url: string | null;
  path: string = 'service';

  constructor(service?: Partial<ServiceObject>) {
    super({ ...service, path: 'service' });

    this.id = service?.id ? service.id : null;
    this.createdAt = service?.created_at ? service.created_at : null;
    this.updatedAt = service?.updated_at ? service.updated_at : null;
    this.type = service?.type ? service.type : null;
    this.title = service?.title ? service.title : null;
    this.content = service?.content ? service.content : null;
    this.description = service?.description ? service.description : null;
    this.price = service?.price ? service.price : null;
    this.features = service?.features
      ? service.features.map((feature) => new Feature(feature))
      : null;
    this.onboardingLink = service?.onboarding_link
      ? service.onboarding_link
      : null;
    this.icons =
      service?.icons && service.icons.length > 0
        ? service.icons.map((icon) => new Image(icon))
        : null;
    this.buttonIcon = service?.button_icon
      ? new Image(service.button_icon)
      : null;
    this.actionWord = service?.action_word ? service.action_word : null;
    this.priceID = service?.price_id ? service.price_id : null;
    this.currency = service?.currency ? service.currency : null;
    this.url = service?.url ? service.url : null;
  }

  toServiceObject(): ServiceObject {
    return {
      id: this.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      title: this.title,
      type: this.type,
      content: this.content,
      description: this.description,
      price: this.price,
      features: this.features
        ? this.features.map((feature) => feature.toFeatureObject())
        : null,
      onboarding_link: this.onboardingLink,
      icons: this.icons ? this.icons.map((icon) => icon.toImageObject()) : null,
      button_icon: this.buttonIcon ? this.buttonIcon.toImageObject() : null,
      action_word: this.actionWord,
      price_id: this.priceID,
      currency: this.currency,
      url: this.url,
      path: this.path,
    };
  }
}
