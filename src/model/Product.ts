import { Features } from './Features';
import { Gallery } from './Gallery';
import { Image } from './Image';
import { Offered, Offering, OfferingObject } from './Offering';
import { Pricing } from './Pricing';
import { Project } from './Project';

export type ProductObject = OfferingObject & {};

export class Product extends Offering {
  readonly type: Offered = 'product';
  public actionWord: string = 'buy';

  constructor(product?: Partial<ProductObject>) {
    super({ ...product, type: 'product' });
  }

  toProductObject(): ProductObject {
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
      icon: this.icon ? this.icon.toImageObject() : null,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      button_icon: this.buttonIcon ? this.buttonIcon.toImageObject() : null,
      url: this.url,
      action_word: this.actionWord,
    };
  }
}
