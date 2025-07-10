import { ProjectVersions } from '@/model/ProjectVersions';

export class Roadmap {
  path: Array<string>;

  constructor(versions: ProjectVersions) {
    this.path = versions.order();
  }
}
