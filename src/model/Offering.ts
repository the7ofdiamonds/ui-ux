import { Features, FeaturesObject } from './Features';
import { Gallery, GalleryObject } from './Gallery';

export type OfferingObject = {
  id: string | number | null;
  title: string | null;
  name: string | null;
  subtitle: string | null;
  promotional_text: string | null;
  description: string | null;
  features: FeaturesObject | null;
  content: string | null;
  currency: string | null;
  price: number | null;
  icon: string | null;
  gallery: GalleryObject | null;
  button_icon: string | null;
  url: string | null;
  action_word: string | null;
};

export class Offering {
  public id: string | number | null;
  public title: string | null;
  public name: string | null;
  public subtitle: string | null;
  public promotionalText: string | null;
  public description: string | null;
  public features: Features | null;
  public content: string | null;
  public currency: string | null;
  public price: number | null;
  public icon: string | null;
  public gallery: Gallery | null;
  public buttonIcon: string | null;
  public url: string | null;
  public actionWord: string | null;

  constructor(offering: Partial<OfferingObject>) {
    this.id = offering.id ? offering.id : null;
    this.title = offering.title ? offering.title : null;
    this.name = offering.name ? offering.name : null;
    this.subtitle = offering.subtitle ? offering.subtitle : null;
    this.promotionalText = offering.promotional_text
      ? offering.promotional_text
      : null;
    this.description = offering.description ? offering.description : null;
    this.features = offering.features ? new Features(offering.features) : null;
    this.content = offering.content ? offering.content : null;
    this.currency = offering.currency ? offering.currency : 'USD';
    this.price = offering.price ? offering.price : null;
    this.icon = offering.icon ? offering.icon : null;
    this.gallery = offering.gallery ? new Gallery(offering.gallery) : null;
    this.buttonIcon = offering.button_icon ? offering.button_icon : null;
    this.url = offering.url ? offering.url : null;
    this.actionWord = offering.action_word ? offering.action_word : null;
  }

  toOfferingObject(): OfferingObject {
    return {
      id: this.id,
      title: this.title,
      name: this.name,
      subtitle: this.subtitle,
      promotional_text: this.promotionalText,
      description: this.description,
      features: this.features ? this.features.toFeaturesObject() : null,
      content: this.content,
      currency: this.currency,
      price: this.price,
      icon: this.icon,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      button_icon: this.buttonIcon,
      url: this.url,
      action_word: this.actionWord,
    };
  }
}
