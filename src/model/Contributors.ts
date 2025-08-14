import { Contributor, ContributorObject } from './Contributor';

import { RepoContributors } from '@/model/GitHub';

export type ContributorsObject = {
  list: Array<ContributorObject> | null;
};

export class Contributors {
  list: Array<Contributor>;

  constructor(contributors?: ContributorsObject) {
    this.list =
      contributors && contributors.list
        ? contributors.list.map((contributor) => new Contributor(contributor))
        : [];
  }

  set(list: Array<Contributor>) {
    this.list = list;
  }

  fromGitHub(contributors: RepoContributors) {
    let list: Array<Contributor> = [];

    if (contributors.length > 0) {
      contributors.forEach((contributor) => {
        const contr = new Contributor();
        contr.fromGitHub(contributor);
        list.push(contr);
      });
    }

    this.list = list;
  }

  toContributorsObject(): ContributorsObject {
    return {
      list: this.list
        ? this.list.map((contributor) => contributor.toContributorObject())
        : null,
    };
  }
}