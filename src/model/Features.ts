import { Feature, FeatureObject } from './Feature';

export type FeaturesObject = {
  id: string | number | null;
  list: Array<FeatureObject> | null;
};

export class Features {
  id: string | number | null;
  list: Set<Feature>;

  constructor(data?: FeaturesObject) {
    this.id = data?.id ? data.id : null;
    this.list = data?.list
      ? new Set(data.list.map((feature) => new Feature(feature)))
      : new Set();
  }

  setList(list: Set<Feature>) {
    this.list = list;
  }

  toFeaturesObject(): FeaturesObject {
    return {
      id: this.id,
      list: this.list
        ? Array.from(this.list).map((feature) => feature.toFeatureObject())
        : null,
    };
  }
}
