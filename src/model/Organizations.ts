import type { OrganizationObject } from './Organization';
import { Organization } from './Organization';
import type { OrganizationGQL } from './GitHubGQL';

export class Organizations {
  list: Array<Organization> = [];
  count: number;

  constructor(data?: Array<OrganizationObject>) {
    if (Array.isArray(data) && data.length > 0) {
      data.map((organization) => {
        this.list.push(new Organization(organization));
      });
    }

    this.count = this.list.length;
  }

  add(organization: Organization) {
    this.list.push(organization);
  }

  fromGitHubGraphQL(organizations: Array<OrganizationGQL>) {
    if (Array.isArray(organizations) && organizations.length > 0) {
      this.list = organizations.map((organization) => {
        const org = new Organization();
        org.fromGitHubGraphQL(organization);
        return org;
      });
    }
  }
}
