import { Features } from './Features';
import { Gallery } from './Gallery';
import { Image } from './Image';
import { Offered, Offering, OfferingObject } from './Offering';
import { Pricing } from './Pricing';
import { Project } from './Project';

export type ServiceObject = OfferingObject & {
  onboarding_link: string | null;
};

export class Service extends Offering {
  readonly type: Offered = 'service';
  public actionWord: string = 'request';
  public onboardingLink: string | null;

  constructor(service?: Partial<ServiceObject>) {
    super({ ...service, type: 'service' });

    this.id = service?.id ? service.id : null;
    this.title = service?.title ? service.title : null;
    this.name = service?.name ? service.name : null;
    this.subtitle = service?.subtitle ? service.subtitle : null;
    this.promotionalText = service?.promotional_text
      ? service.promotional_text
      : null;
    this.description = service?.description ? service.description : null;
    this.features = service?.features ? new Features(service.features) : null;
    this.content = service?.content ? service.content : null;
    this.pricing = service?.pricing ? new Pricing(service.pricing) : null;
    this.icon = service?.icon ? service.icon : null;
    this.gallery = service?.gallery ? new Gallery(service.gallery) : null;
    this.buttonIcon = service?.button_icon
      ? new Image(service.button_icon)
      : null;
    this.url = service?.url ? service.url : null;
    this.actionWord = service?.action_word ? service.action_word : 'request';
    this.onboardingLink = service?.onboarding_link
      ? service.onboarding_link
      : null;
  }

  fromProject(project: Project) {
    this.id = project?.id ? project.id : null;
    this.title = project?.title ? project.title : null;
    this.name = project?.name ? project.name : null;
    this.subtitle = project?.subtitle ? project.subtitle : null;
    this.promotionalText = project?.promotionalText
      ? project.promotionalText
      : null;
    this.description = project?.description ? project.description : null;

    if (project?.solution) {
      const solution = project?.solution;
      this.features = solution?.features ? solution.features : null;
      this.content = solution?.contentURL ? solution.contentURL.url : null;
      this.pricing = solution?.pricing ? solution.pricing : null;
      this.icon = solution?.icon ? solution.icon : null;
      this.gallery = solution?.gallery ? solution.gallery : null;
      this.buttonIcon = solution?.buttonIcon ? solution.buttonIcon : null;
      this.url =
        solution?.projectURLs &&
        solution.projectURLs?.homepage &&
        solution.projectURLs.homepage?.url
          ? solution.projectURLs.homepage.url
          : null;
    }
  }

  toServiceObject(): ServiceObject {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      name: this.name,
      subtitle: this.subtitle,
      promotional_text: this.promotionalText,
      description: this.description,
      features: this.features ? this.features.toFeaturesObject() : null,
      content: this.content,
      pricing: this.pricing ? this.pricing?.toPricingObject() : null,
      icon: this.icon,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      button_icon: this.buttonIcon ? this.buttonIcon.toImageObject() : null,
      url: this.url,
      action_word: this.actionWord,
      onboarding_link: this.onboardingLink
    };
  }
}
