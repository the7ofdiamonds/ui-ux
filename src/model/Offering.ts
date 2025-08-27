import { Features, FeaturesObject } from './Features';
import { Gallery, GalleryObject } from './Gallery';
import { Image, ImageObject } from './Image';
import { Pricing, PricingObject } from './Pricing';
import { Project } from './Project';

export type Offered = 'service' | 'product' | false;

export type OfferingObject = {
  id: string | number | null;
  type: Offered | null;
  title: string | null;
  name: string | null;
  subtitle: string | null;
  promotional_text: string | null;
  description: string | null;
  features: FeaturesObject | null;
  content: string | null;
  pricing: Partial<PricingObject> | null;
  icon: string | null;
  gallery: Partial<GalleryObject> | null;
  button_icon: ImageObject | null;
  url: string | null;
  action_word: string | null;
};

export class Offering {
  public id: string | number | null;
  public type: Offered = false;
  public title: string | null;
  public name: string | null;
  public subtitle: string | null;
  public promotionalText: string | null;
  public description: string | null;
  public features: Features | null;
  public content: string | null;
  public pricing: Pricing | null;
  public icon: string | null;
  public gallery: Gallery | null;
  public buttonIcon: Image | null;
  public url: string | null;
  public actionWord: string | null;

  constructor(offering?: Partial<OfferingObject>) {
    this.id = offering?.id ? offering.id : null;
    this.type = offering?.type ? offering.type : false;
    this.title = offering?.title ? offering.title : null;
    this.name = offering?.name ? offering.name : null;
    this.subtitle = offering?.subtitle ? offering.subtitle : null;
    this.promotionalText = offering?.promotional_text
      ? offering.promotional_text
      : null;
    this.description = offering?.description ? offering.description : null;
    this.features = offering?.features ? new Features(offering.features) : null;
    this.content = offering?.content ? offering.content : null;
    this.pricing = offering?.pricing ? new Pricing(offering.pricing) : null;
    this.icon = offering?.icon ? offering.icon : null;
    this.gallery = offering?.gallery ? new Gallery(offering.gallery) : null;
    this.buttonIcon = offering?.button_icon
      ? new Image(offering.button_icon)
      : null;
    this.url = offering?.url ? offering.url : null;
    this.actionWord = offering?.action_word ? offering.action_word : null;
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

  toOfferingObject(): OfferingObject {
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
    };
  }
}
