import { getActionWord } from './Actions';
import { Features, FeaturesObject } from './Features';
import { Gallery, GalleryObject } from './Gallery';
import { Image, ImageObject } from './Image';
import { Pricing, PricingObject } from './Pricing';
import { Project } from './Project';

export type Offered = 'service' | 'product' | false;

export type OfferingObject = {
  id: string | number | null;
  type: Offered | null;
  category: string | null;
  title: string | null;
  name: string | null;
  subtitle: string | null;
  promotional_text: string | null;
  description: string | null;
  features: FeaturesObject | null;
  contentURL: string | null;
  content: string | null;
  pricing: Partial<PricingObject> | null;
  icon: ImageObject | null;
  gallery: Partial<GalleryObject> | null;
  button_icon: ImageObject | null;
  url: string | null;
  action_word: string | null;
};

export class Offering {
  public id: string | number | null;
  public type: Offered = false;
  public category: string | null;
  public title: string | null;
  public name: string | null;
  public subtitle: string | null;
  public promotionalText: string | null;
  public description: string | null;
  public features: Features | null;
  public contentURL: string | null;
  public content: string | null;
  public pricing: Pricing | null;
  public icon: Image | null;
  public gallery: Gallery | null;
  public buttonIcon: Image | null;
  public url: string | null;
  public actionWord: string | null;

  constructor(offering?: Partial<OfferingObject>) {
    this.id = offering?.id ? offering.id : null;
    this.type = offering?.type ? offering.type : false;
    this.category = offering?.category ? offering.category : null;
    this.title = offering?.title ? offering.title : null;
    this.name = offering?.name ? offering.name : null;
    this.subtitle = offering?.subtitle ? offering.subtitle : null;
    this.promotionalText = offering?.promotional_text
      ? offering.promotional_text
      : null;
    this.description = offering?.description ? offering.description : null;
    this.features = offering?.features ? new Features(offering.features) : null;
    this.contentURL = offering?.contentURL ? offering.contentURL : null;
    this.content = offering?.content ? offering.content : null;
    this.pricing = offering?.pricing ? new Pricing(offering.pricing) : null;
    this.icon = offering?.icon ? new Image(offering.icon) : null;
    this.gallery = offering?.gallery ? new Gallery(offering.gallery) : null;
    this.buttonIcon = offering?.button_icon
      ? new Image(offering.button_icon)
      : null;
    this.actionWord = offering?.action_word ? offering.action_word : null;
    this.url = this.getUrl(offering?.url);
  }

  getUrl(url: string | undefined | null) {
    return url
      ? url
      : (this.type === 'product' || this.type === 'service') && this.id
      ? `/${this.type}/${this.id}`
      : null;
  }

  setContent(content: string | null) {
    this.content = content;
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
      const solution = project.solution;
      this.type = solution?.available ? solution.available : false;
      this.category = solution?.category ? solution.category : null;
      this.features = solution.features ? solution.features : null;
      this.contentURL = solution?.contentURL ? solution.contentURL.url : null;
      this.pricing = solution?.pricing ? solution.pricing : null;
      this.icon = solution?.icon ? solution.icon : null;
      this.gallery = solution?.gallery ? solution.gallery : null;
      this.buttonIcon = solution?.buttonIcon ? solution.buttonIcon : null;
      this.actionWord =
        solution?.actionWord ?? getActionWord(solution?.category);
      this.url = this.getUrl(solution.projectURLs?.homepage?.url);
    }
  }

  toOfferingObject(): OfferingObject {
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
      contentURL: this.contentURL,
      content: this.content,
      pricing: this.pricing ? this.pricing?.toPricingObject() : null,
      icon: this.icon ? this.icon.toImageObject() : null,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      button_icon: this.buttonIcon ? this.buttonIcon.toImageObject() : null,
      url: this.url,
      action_word: this.actionWord,
    };
  }
}
