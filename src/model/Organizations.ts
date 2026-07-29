import type { OrganizationObject } from './Organization';
import { Organization } from './Organization';
import type { OrganizationGQL } from './GitHubGQL';

export type OrganizationsObject = Array<OrganizationObject>;

export class Organizations {
  list: Array<Organization> = [];
  count: number;

  constructor(data?: OrganizationsObject) {
    if (Array.isArray(data) && data.length > 0) {
      data.map((organization: OrganizationObject) => {
        this.add(new Organization(organization));
      });
    }

    this.count = this.list.length;

    return this;
  }

  filterOrganizationsByLogin(login: string): Organization | null {
    let org: Organization | null = null;

    if (login && Array.isArray(this.list) && this.list.length > 0) {
      this.list.forEach((organization: Organization) => {
        if (organization?.login === login) {
          org = organization;
        }
      });
    }

    return org;
  }

  add(organization: Organization) {
    if (!(organization instanceof Organization) || !organization?.login) return;
    const index = this.list.findIndex(
      org => org.login === organization.login
    );
    
    if (index !== -1) {
      this.list[index] = this.list[index].update(organization);
    } else {
      this.list.push(organization);
    }
  }

  fromGitHubGraphQL(organizations: Array<OrganizationGQL>) {
    if (Array.isArray(organizations) && organizations.length > 0) {
      organizations.map((organization) => {
        const org = new Organization();
        org.fromGitHubGraphQL(organization);
        this.add(org);
      });
    }

    return this;
  }

  toOrganizationsObject(): OrganizationsObject {
    return this.list.map((org) => org.toOrganizationObject())
  }
}
