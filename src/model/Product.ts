import { Offered, Offering, OfferingObject } from './Offering';

export type ProductObject = OfferingObject & {};

export class Product extends Offering {
  readonly type: Offered = 'product';

  constructor(product?: Partial<ProductObject>) {
    super({ ...product, type: 'product' });
    console.log(product?.category);
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
    };
  }
}
