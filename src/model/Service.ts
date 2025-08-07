import { Feature, FeatureObject } from './Feature';
import { Image, ImageObject } from './Image';

export type ServiceObject = {
  id: string | number | null;
  created_at: string | null;
  updated_at: string | null;
  title: string | null;
  content: string | null;
  description: string | null;
  price: string | number | null;
  features: Array<FeatureObject> | null;
  onboarding_link: string | null;
  icon: ImageObject | null;
  button_icon: ImageObject | null;
  action_word: string | null;
  price_id: string | null;
  currency: string | null;
  url: string | null;
};

export class Service {
  id: string | number | null;
  createdAt: string | null;
  updatedAt: string | null;
  title: string | null;
  content: string | null;
  description: string | null;
  price: string | number | null;
  features: Array<Feature> | null;
  onboardingLink: string | null;
  icon: Image | null;
  buttonIcon: Image | null;
  actionWord: string | null;
  priceID: string | null;
  currency: string | null;
  url: string | null;

  constructor(service?: Partial<ServiceObject>) {
    this.id = service?.id ? service.id : null;
    this.createdAt = service?.created_at ? service.created_at : null;
    this.updatedAt = service?.updated_at ? service.updated_at : null;
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
    this.icon = service?.icon ? new Image(service.icon) : null;
    this.buttonIcon = service?.button_icon
      ? new Image(service.button_icon)
      : null;
    this.actionWord = service?.action_word ? service.action_word : null;
    this.priceID = service?.price_id ? service.price_id : null;
    this.currency = service?.currency ? service.currency : null;
    this.url = service?.url ? service.url : null;
  }
}
