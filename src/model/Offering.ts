import type { FeaturesObject } from './Features';
import type { GalleryObject } from './Gallery';
import type { ImageObject } from './Image';
import type { PricingObject } from './Pricing';
import type { ProjectDetailsObject } from './ProjectDetails';
import type { ProjectQueryObject } from './ProjectQuery';
import type { StripeProductObject } from './StripeProduct';

import { getActionWord } from './Actions';
import { Features } from './Features';
import { Gallery } from './Gallery';
import { Image } from './Image';
import { Pricing } from './Pricing';
import { Project } from './Project';
import { ProjectDetails } from './ProjectDetails';
import { ProjectQuery } from './ProjectQuery';
import { StripeProduct } from './StripeProduct';
import type { ContentObject } from './Content';
import { Content } from './Content';

const OFFERING = ['service', 'product'];
export type Offered = typeof OFFERING[number] | false;

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
  details: Partial<ProjectDetailsObject> | null;
  contentURL: string | null;
  content: ContentObject | null;
  pricing: Partial<PricingObject> | null;
  icon: ImageObject | null;
  gallery: Partial<GalleryObject> | null;
  button_icon: ImageObject | null;
  url: string | null;
  action_word: string | null;
  onboarding_link: string | null;
  project_query: ProjectQueryObject | null;
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
  public details: ProjectDetails | null;
  public contentURL: string | null;
  public content: Content | null;
  public pricing: Pricing | null;
  public icon: Image | null;
  public gallery: Gallery | null;
  public buttonIcon: Image | null;
  public url: string | null;
  public actionWord: string | null;
  public onboardingLink: string | null;
  public projectQuery: ProjectQuery | null;

  constructor(offering?: Partial<OfferingObject>) {
    this.id = offering?.id ? offering.id : null;
    this.type = this.isOffered(offering?.type) ? offering.type : false;
    this.category = offering?.category ? offering.category : null;
    this.title = offering?.title ? offering.title : null;
    this.name = offering?.name ? offering.name : null;
    this.subtitle = offering?.subtitle ? offering.subtitle : null;
    this.promotionalText = offering?.promotional_text
      ? offering.promotional_text
      : null;
    this.description = offering?.description ? offering.description : null;
    this.features = offering?.features ? new Features(offering.features) : null;
    this.details = offering?.details ? new ProjectDetails(offering.details) : null;
    this.contentURL = offering?.contentURL ? offering.contentURL : null;
    this.content = offering?.content ? new Content(offering.content) : null;
    this.pricing = offering?.pricing ? new Pricing(offering.pricing) : null;
    this.icon = offering?.icon ? new Image(offering.icon) : null;
    this.gallery = offering?.gallery ? new Gallery(offering.gallery) : null;
    this.buttonIcon = offering?.button_icon
      ? new Image(offering.button_icon)
      : null;
    this.actionWord = offering?.action_word ? offering.action_word : null;
    this.url = this.getUrl(offering?.url);
    this.onboardingLink = offering?.onboarding_link ? offering.onboarding_link : null;
    this.projectQuery = offering?.project_query ? new ProjectQuery(offering.project_query) : null;
  }

  getUrl(url: string | undefined | null) {
    return url
      ? url
      : (this.type === 'product' || this.type === 'service') && this.id
        ? `/${this.type}/${this.id}`
        : null;
  }

  setContent(content: Content | null) {
    this.content = content;
  }

  fromProject(project: Project) {
    // this.id = project?.id ? project.id : null;
    // this.name = project?.name ? project.name : null;
    this.title = project?.title ? project.title : this.name;
    this.subtitle = project?.subtitle ? project.subtitle : null;
    this.promotionalText = project?.promotionalText
      ? project.promotionalText
      : null;
    this.description = project?.description ? project.description : null;

    if (project?.solution) {
      const solution = project.solution;
      // this.type = this.isOffered(solution?.available) ? solution.available : false;
      // this.category = solution?.category ? solution.category : null;
      // this.features = solution.features ? solution.features : null;
      this.content = solution?.content ? solution.content : null;
      // this.pricing = solution?.pricing ? solution.pricing : null;
      // this.icon = solution?.icon ? solution.icon : null;
      // this.gallery = solution?.gallery ? solution.gallery : null;
      // this.buttonIcon = solution?.buttonIcon ? solution.buttonIcon : null;
      // this.actionWord =
      //   solution?.actionWord ?? getActionWord(solution?.category);
      // this.url = this.getUrl(solution.projectURLs?.homepage?.url);
    }

    if (project?.details) {
      this.details = project.details;
    }

    this.projectQuery = project?.query ? project.query : null;

    return this;
  }

  getGalleryFromStripeProductImages(images: Array<string> | null | undefined): Gallery | null {
    if (!images || !Array.isArray(images) || images.length === 0) return null;
    const gallery = new Gallery();
    const previews: Array<Image> = images.map((imageURL) => {
      return new Image({ url: imageURL });
    });
    gallery.setPreviews(previews)
    return gallery;
  }

  isOffered(value: unknown): value is Offered {
    return typeof value === 'string' && (OFFERING as readonly string[]).includes(value);
  }

  fromStripeProductObject(product: StripeProductObject | undefined | null) {
    if (!product) return null;

    this.id = product?.id ? product.id : null;
    this.type = this.isOffered(product?.metadata?.type) ? product.metadata.type : false;
    this.name = product?.name ? product.name : null;
    this.description = product?.description ? product.description : null;
    this.pricing = product?.default_price ? new Pricing({ id: product.default_price }) : null;
    this.category = product?.metadata?.category ? product.metadata.category : null;
    this.title = product?.metadata?.title ? product.metadata.title : this.name;
    this.subtitle = product?.metadata?.subtitle ? product.metadata.subtitle : null;
    this.promotionalText = product?.metadata?.promotional_text ? product.metadata.promotional_text : null;
    this.contentURL = product?.metadata?.content_url ? product.metadata.content_url : null;
    this.content = product?.metadata?.content ? product.metadata.content : null;
    this.icon = product?.metadata?.icon ? new Image(product.metadata.icon) : null;
    this.buttonIcon = product?.metadata?.button_icon ? new Image(product.metadata.button_icon) : null;
    this.actionWord = product?.metadata?.action_word ? product.metadata.action_word : null;
    this.projectQuery = product?.metadata?.repo_type && product?.metadata?.owner && product?.metadata?.repo
      ? new ProjectQuery({
        repo_type: product.metadata.repo_type,
        owner: product.metadata.owner,
        repo: product.metadata.repo,
      }) : null;

    return this;
  }

  fromStripeProduct(stripeProduct: StripeProduct): Offering | null {
    this.id = stripeProduct?.id ? stripeProduct.id : null;
    this.type = this.isOffered(stripeProduct?.metadata?.type) ? stripeProduct.metadata.type : false;
    this.category = stripeProduct?.metadata?.category ? stripeProduct.metadata.category : null;
    this.name = stripeProduct?.name ? stripeProduct.name : null;
    this.title = stripeProduct?.metadata?.title ? stripeProduct.metadata.title : this.name;
    this.subtitle = stripeProduct?.metadata?.subtitle ? stripeProduct.metadata.subtitle : null;
    this.promotionalText = stripeProduct?.metadata?.promotionalText ? stripeProduct.metadata.promotionalText : null;
    this.description = stripeProduct?.description ? stripeProduct.description : null;
    this.features = stripeProduct?.features ? (new Features().fromStripeFeatures(stripeProduct.features)) : null;
    // this.details = stripeProduct ? ? stripeProduct : null;
    this.contentURL = stripeProduct?.metadata?.contentURL ? stripeProduct.metadata.contentURL : null;
    this.content = stripeProduct?.metadata?.content ? stripeProduct.metadata.content : null;
    this.pricing = stripeProduct?.stripePrice ? (new Pricing().fromStripePrice(stripeProduct.stripePrice) ?? null) : null;
    this.icon = stripeProduct?.metadata?.icon ? stripeProduct.metadata.icon : null;
    this.gallery = this.getGalleryFromStripeProductImages(stripeProduct?.images);
    this.buttonIcon = stripeProduct?.metadata?.buttonIcon ? stripeProduct.metadata.buttonIcon : null;
    this.url = stripeProduct?.url ? stripeProduct.url : null;
    this.actionWord = stripeProduct?.metadata?.actionWord ? stripeProduct.metadata.actionWord : null;
    this.projectQuery = stripeProduct?.metadata?.projectQuery ? stripeProduct.metadata.projectQuery : null;

    return this;
  }

  fromOffering(offering: Offering): this {
    Object.assign(this, offering);
    return this;
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
      details: this.details ? this.details.toDetailsObject() : null,
      contentURL: this.contentURL,
      content: this.content ? this.content.toContentObject() : null,
      pricing: this.pricing ? this.pricing?.toPricingObject() : null,
      icon: this.icon ? this.icon.toImageObject() : null,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      button_icon: this.buttonIcon ? this.buttonIcon.toImageObject() : null,
      url: this.url,
      action_word: this.actionWord,
      onboarding_link: this.onboardingLink,
      project_query: this.projectQuery ? this.projectQuery?.toProjectQueryObject() : null
    };
  }
}
