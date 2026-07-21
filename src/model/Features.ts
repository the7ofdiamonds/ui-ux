import type { FeatureObject } from './Feature';
import { Feature } from './Feature';
import { Version } from './Version';

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

  order(): Array<Feature> {
    return this.list && this.list.size > 0
      ? Array.from(this.list).sort((a, b) => {
        const aFeature =
          a instanceof Feature
            ? a
            : new Feature(a as FeatureObject);
        const bFeature =
          b instanceof Feature
            ? b
            : new Feature(b as FeatureObject);

        return aFeature.order(bFeature.version ?? new Version('1.0.0'))
      })
      : [];
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
