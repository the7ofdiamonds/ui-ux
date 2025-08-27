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
    super({...product, type: 'product'});
    
    this.id = product?.id ? product.id : null;
    this.title = product?.title ? product.title : null;
    this.name = product?.name ? product.name : null;
    this.subtitle = product?.subtitle ? product.subtitle : null;
    this.promotionalText = product?.promotional_text
      ? product.promotional_text
      : null;
    this.description = product?.description ? product.description : null;
    this.features = product?.features ? new Features(product.features) : null;
    this.content = product?.content ? product.content : null;
    this.pricing = product?.pricing ? new Pricing(product.pricing) : null;
    this.icon = product?.icon ? product.icon : null;
    this.gallery = product?.gallery ? new Gallery(product.gallery) : null;
    this.buttonIcon = product?.button_icon
      ? new Image(product.button_icon)
      : null;
    this.url = product?.url ? product.url : null;
    this.actionWord = product?.action_word ? product.action_word : 'buy';
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
      icon: this.icon,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      button_icon: this.buttonIcon ? this.buttonIcon.toImageObject() : null,
      url: this.url,
      action_word: this.actionWord,
    };
  }
}
