import { Gallery, GalleryObject } from '@/model/Gallery';
import { Feature, FeatureObject } from '@/model/Feature';
import {
  ProjectURLs,
  ProjectURLsDataObject,
  ProjectURLsObject,
} from '@/model/ProjectURLs';
import { ContentURL } from '@/model/ContentURL';
import { Repo } from '@/model/Repo';
import { ProjectDataObject } from '@/model/Project';
import { Features } from './Features';
import { Pricing, PricingObject } from './Pricing';
import { Offered } from './Offering';
import { Image, ImageObject } from './Image';

export type ProjectSolutionObject = {
  gallery: GalleryObject | null;
  features: Array<FeatureObject> | null;
  pricing: PricingObject | null;
  icon: ImageObject | null;
  button_icon: ImageObject | null;
  action_word: string | null;
  content_url: string | null;
  project_urls: ProjectURLsObject | null;
  available: Offered | null;
};

export type ProjectSolutionDataObject = {
  gallery: GalleryObject | null;
  features: Array<FeatureObject> | null;
  pricing: PricingObject | null;
  icon: ImageObject | null;
  button_icon: ImageObject | null;
  action_word: string | null;
  content_url: string | null;
  project_urls: ProjectURLsDataObject | null;
  available: Offered | null;
};

export class ProjectSolution {
  gallery: Gallery | null;
  features: Features | null;
  pricing: Pricing | null;
  icon: Image | null;
  buttonIcon: Image | null;
  actionWord: string | null;
  contentURL: ContentURL | null;
  projectURLs: ProjectURLs | null;
  available: Offered = false;

  constructor(data?: Partial<ProjectSolutionObject>) {
    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.features = data?.features ? this.getFeatures(data.features) : null;
    this.pricing = data?.pricing ? new Pricing(data.pricing) : null;
    this.icon = data?.icon ? new Image(data.icon) : null;
    this.buttonIcon = data?.button_icon ? new Image(data.button_icon) : null;
    this.actionWord = data?.action_word ? data.action_word : null;

    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
    this.projectURLs =
      data?.project_urls &&
      (data.project_urls.homepage ||
        data.project_urls.ios ||
        data.project_urls.android)
        ? new ProjectURLs(data.project_urls)
        : null;
    this.available = data?.available ? data.available : false;
  }

  setGallery(gallery: Gallery) {
    this.gallery = gallery;
  }

  setFeatures(list: Set<Feature>) {
    const features = new Features();
    features.setList(list);
    this.features = features;
  }

  getFeatures(data?: Array<FeatureObject>): Features {
    const features = new Features();

    let list = new Set<Feature>();

    if (data && data?.length > 0) {
      data.forEach((feature) => {
        list.add(new Feature(feature));
      });
    }

    features.setList(list);

    return features;
  }

  setPricing(pricing: Pricing) {
    this.pricing = pricing;
  }

  setIcon(icon: Image) {
    this.icon = icon;
  }

  setButtonIcon(buttonIcon: Image) {
    this.buttonIcon = buttonIcon;
  }

  setActionWord(actionWord: string) {
    this.actionWord = actionWord;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  setProjectURLs(projectURLs: ProjectURLs) {
    this.projectURLs = projectURLs;
  }

  setAvailable(available: Offered) {
    this.available = available;
  }

  fromRepo(repo: Repo) {
    if (repo.contents?.solution?.downloadURL) {
      this.setContentURL(repo.contents.solution.downloadURL);
    }

    if (repo?.homepage) {
      const projectURLs = new ProjectURLs();
      projectURLs.setHomepage(repo.homepage);
      this.setProjectURLs(projectURLs);
    }

    if (repo.issues?.features) {
      this.setFeatures(new Set(repo.issues.toFeatures(repo.issues?.features)));
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data?.solution) {
      if (data?.solution?.project_urls) {
        const projectURLs = new ProjectURLs();

        if (data.solution.project_urls?.homepage) {
          projectURLs.setHomepage(data.solution.project_urls.homepage);
        }

        if (data.solution.project_urls?.ios) {
          projectURLs?.setIos(data.solution.project_urls.ios);
        }

        if (data.solution.project_urls?.android) {
          projectURLs.setAndroid(data.solution.project_urls.android);
        }
      }

      if (data.solution?.gallery) {
        const gallery = new Gallery(data?.solution?.gallery);
        this.setGallery(gallery);
      }

      this.available = data.solution?.available
        ? data.solution?.available
        : false;

      this.pricing = data.solution?.pricing
        ? new Pricing(data.solution.pricing)
        : null;

      this.actionWord = data?.solution?.action_word
        ? data.solution.action_word
        : null;
    }
  }

  toProjectSolutionObject(): ProjectSolutionObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      features:
        this.features && this.features.list.size > 0
          ? Array.from(this.features.list).map((feature) =>
              feature.toFeatureObject()
            )
          : null,
      pricing: this.pricing ? this.pricing.toPricingObject() : null,
      icon: this.icon ? this.icon.toImageObject() : null,
      button_icon: this.buttonIcon ? this.buttonIcon.toImageObject() : null,
      action_word: this.actionWord,
      content_url: this.contentURL ? this.contentURL.url : null,
      project_urls: this.projectURLs
        ? this.projectURLs.toProjectURLsObject()
        : null,
      available: this.available,
    };
  }

  toProjectSolutionDataObject(): ProjectSolutionDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      features:
        this.features && this.features.list.size > 0
          ? Array.from(this.features.list).map((feature) =>
              feature.toFeatureObject()
            )
          : null,
      pricing: this.pricing ? this.pricing.toPricingObject() : null,
      icon: this.icon ? this.icon.toImageObject() : null,
      button_icon: this.buttonIcon ? this.buttonIcon.toImageObject() : null,
      action_word: this.actionWord,
      content_url: this.contentURL?.url ? this.contentURL.url : null,
      project_urls: this.projectURLs
        ? this.projectURLs.toProjectURLsDataObject()
        : null,
      available: this.available,
    };
  }
}
