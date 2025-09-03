import { Version } from '@/model/Version';
import { Issue } from './Issue';

export type FeatureObject = {
  id: string | number | null;
  description: string | null;
  version: string | null;
};

export class Feature {
  id: string | number | null;
  description: string | null;
  version: Version | null;

  constructor(data?: FeatureObject) {
    this.id = data?.id ? data.id : null;
    this.description = data?.description ? data.description : null;
    this.version = data?.version ? new Version(data.version) : null;
  }

  order(version: Version) {
    const major =
      (this.version && this.version.major ? this.version.major : 1) -
      (version && version.major ? version.major : 1);
    const minor =
      (this.version && this.version.minor ? this.version.minor : 0) -
      (version && version.minor ? version.minor : 0);
    const patch =
      (this.version && this.version.patch ? this.version.patch : 0) -
      (version && version.patch ? version.patch : 0);

    return major + minor + patch;
  }

  setID(id: string | number) {
    this.id = id;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setVersion(version: string) {
    this.version = new Version(version);
  }

  fromIssue(issue: Issue) {
    this.id = issue.id;
    this.description = issue.title;
    this.version = issue.milestone ? new Version(issue.milestone) : null;
  }

  toFeatureObject(): FeatureObject {
    return {
      id: this.id,
      description: this.description,
      version: this.version ? this.version.toString() : null,
    };
  }
}
