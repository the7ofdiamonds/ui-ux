import { Feature } from './Feature';
import { Features } from './Features';

export class FeaturesRoadmap {
  path: Array<Feature> | null;

  constructor(features: Set<Feature>) {
    const fList = new Features();
    fList.setList(features)
    this.path = fList.order()
  }

  display() {
    if (!this.path) return null;

    return this.path.map((feature) => feature.toFeatureObject())
  }
}