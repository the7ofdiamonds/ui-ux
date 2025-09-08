import { AccountObject, iAccount } from '@/model/Account';
import { ContactMethods, ContactMethodsObject } from '@/model/ContactMethods';
import { GitHubUserAccount } from '@/model/GitHub';
import {
  UserGQL,
  OrganizationGQL,
  OrganizationResponseGQL,
} from '@/model/GitHubGQL';
import {
  GitHubRepoQuery,
  GitHubRepoQueryObject,
} from '@/model/GitHubRepoQuery';
import { Organizations } from '@/model/Organizations';
import { Portfolio, PortfolioObject } from '@/model/Portfolio';
import { Role, RoleObject } from './Role';
import { RepoObject } from '@/model/Repo';
import { Repos } from '@/model/Repos';
import { Skills } from '@/model/Skills';
import { User, UserObject } from './User';
import { Hours } from './Hours';
import { Service, ServiceObject } from './Service';
import { Products, ProductsObject } from './Products';
import { Services, ServicesObject } from './Services';

export interface OrganizationObject extends AccountObject {
  id: string | null;
  created_at: string | null;
  updated_at: string | null;
  avatar_url: string | null;
  login: string | null;
  description: string | null;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  website: string | null;
  phone: string | null;
  contact_methods: ContactMethodsObject | null;
  repos_url: string | null;
  repos: Array<RepoObject> | null;
  repo_queries: Array<GitHubRepoQueryObject> | null;
  portfolio: PortfolioObject | null;
  team: Array<UserObject> | null;
  office_hours: Array<Hours> | null;
  products: ProductsObject | null;
  services: ServicesObject | null;
}

export class Organization implements iAccount {
  public id: string | null;
  public createdAt: string | null;
  public updatedAt: string | null;
  public type: string = 'organization';
  public login: string | null;
  public name: string | null;
  public roles: Array<Role>;
  public avatarURL: string | null;
  public bio: string | null;
  public email: string | null;
  public website: string | null;
  public phone: string | null;
  public contactMethods: ContactMethods = new ContactMethods();
  public location: string | null;
  public organizationsURL: string | null;
  public organizations: Organizations | null;
  public reposURL: string | null;
  public repos: Repos | null;
  public repoQueries: Array<GitHubRepoQuery>;
  public skills: Skills;
  public portfolio: Portfolio | null;
  public company: string | null;
  public description: string | null;
  public blog: string | null;
  public team: Array<User> | null;
  public officeHours: Array<Hours> | null;
  public products: Products | null;
  public services: Services | null;

  constructor(data?: OrganizationObject | Partial<OrganizationObject>) {
    this.id = data?.id ? data.id : null;
    this.createdAt = data?.created_at ? data?.created_at : null;
    this.updatedAt = data?.updated_at ? data.updated_at : null;
    this.roles =
      data?.roles && data.roles.length > 0
        ? data.roles.map((roleObject) => new Role(roleObject))
        : [];
    this.login = data?.login ? data.login : null;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : null;
    this.bio = data?.bio ? data.bio : null;
    this.description = data?.description ? data.description : null;
    this.name = data?.name ? data.name : null;
    this.company = data?.company ? data.company : null;
    this.blog = data?.blog ? data.blog : null;
    this.location = data?.location ? data.location : null;
    this.organizationsURL = data?.organizations_url
      ? data.organizations_url
      : null;
    this.organizations = data?.organizations
      ? new Organizations(data.organizations)
      : null;
    this.email = data?.email ? data.email : null;
    this.website = data?.website ? data?.website : null;
    this.phone = data?.phone ? data.phone : null;
    this.contactMethods = data
      ? this.getContactMethods(data)
      : this.contactMethods;
    this.reposURL = data?.repos_url ? data?.repos_url : null;
    this.repos = data?.repos ? new Repos(data.repos) : null;
    this.repoQueries = data?.repo_queries
      ? this.getRepoQueries(data?.repo_queries)
      : [];
    this.portfolio = data?.portfolio ? new Portfolio(data.portfolio) : null;
    this.skills = data?.skills ? new Skills(data.skills) : new Skills();
    this.team = data?.team ? data.team.map((user) => new User(user)) : null;
    this.officeHours = data?.office_hours ? data.office_hours : null;
    this.products = data?.products ? new Products(data.products) : null;
    this.services = data?.services ? new Services(data.services) : null;
  }

  setLogin(login: string) {
    this.login = login;
  }

  getRoles(roles: Array<RoleObject>): Array<Role> {
    if (roles.length > 0) {
      return roles.map((roleObject) => new Role(roleObject));
    }

    return [];
  }

  setRoles(roles: Array<RoleObject>) {
    this.roles =
      roles.length > 0 ? roles.map((roleObject) => new Role(roleObject)) : [];
  }

  getContactMethods(
    data: Record<string, any> | GitHubUserAccount
  ): ContactMethods {
    if (data.html_url || data.login || data.blog) {
      const contactMethods = new ContactMethods();
      contactMethods.setContactGitHub(data.login);

      if (data.blog) {
        contactMethods.setContactWebsite(data.blog);
      }

      return contactMethods;
    }

    if ('contact_methods' in data) {
      return new ContactMethods(data.contact_methods);
    }

    return new ContactMethods();
  }

  setContactMethonds(contacts: Record<string, any>) {
    this.contactMethods = new ContactMethods(contacts);
  }

  setOrganizationsURL(url: string) {
    this.organizationsURL = url;
  }

  getOrganizations(organizations: Array<OrganizationObject>) {
    if (organizations.length > 0) {
      this.organizations = new Organizations(organizations);
    }

    return new Organizations();
  }

  setOrganizations(organizations: Array<OrganizationObject>) {
    this.organizations = new Organizations(organizations);
  }

  setReposURL(url: string) {
    this.reposURL = url;
  }

  setRepos(repos: Repos) {
    this.repos = repos;
  }

  getRepos(data: Array<RepoObject>) {
    const repos = new Repos(data);
    return repos.collection.map((repo) => repo.toRepoObject());
  }

  getRepoQueries(data: Array<Record<string, any>>): Array<GitHubRepoQuery> {
    let repoQueries: Array<GitHubRepoQuery> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((query) => {
        repoQueries.push(new GitHubRepoQuery(query.owner?.login, query.id));
      });
    }

    return repoQueries;
  }

  setRepoQueries(repos: Array<RepoObject>) {
    let repoQueries: Array<GitHubRepoQuery> = [];

    if (repos.length > 0) {
      repos.forEach((repo) => {
        const repoQuery =
          repo?.owner?.login && repo?.id
            ? new GitHubRepoQuery(repo?.owner?.login, repo?.id)
            : null;

        if (repoQuery) {
          repoQueries.push(repoQuery);
        }
      });
    }

    this.repoQueries = repoQueries;
  }

  setPortfolio(portfolio: Portfolio | null) {
    this.portfolio = portfolio;
  }

  setSkills(skills: Skills) {
    this.skills = skills;
  }

  setOfficeHours(officeHours: Array<Hours>) {
    this.officeHours = officeHours;
  }

  setProducts(products: Products | null) {
    this.products = products;
  }

  setServices(services: Services | null) {
    this.services = services;
  }

  fromJSON(json: Record<string, any>) {
    this.id = '0';
    this.login = json.login ? json.login : null;
    this.avatarURL = json.avatar_url ? json.avatar_url : null;
    this.name = json.name ? json.name : null;
    this.email =
      json.contact_methods?.email && json.contact_methods.email !== ''
        ? json.contact_methods.email
        : null;
    this.phone = json.contact_methods?.phone
      ? json.contact_methods.phone
      : null;
    this.website = json.website ? json.website : null;

    this.contactMethods.fromJson(json.contact_methods);

    this.team = json.team
      ? json.team.map((user: UserObject) => {
          const usr = new User();
          usr.fromJSON(user);
          return usr;
        })
      : null;
  }

  fromGitHubGraphQL(response: OrganizationGQL) {
    const org = response ? response : null;

    if (!org) {
      return;
    }
    this.id = org.id;
    this.login = org.login;
    this.name = org.name;
    this.avatarURL = org.avatarUrl;
    this.bio = org.description ? org.description : null;

    if (
      Array.isArray(org.repositories.nodes) &&
      org.repositories.nodes.length > 0
    ) {
      const repos = new Repos();
      repos.fromGitHubGraphQL(org.repositories.nodes);
      this.repos = repos;
    }

    if (this.repos && this.repos.count > 0) {
      const portfolio = new Portfolio();
      portfolio.fromRepos(this.repos);
      this.portfolio = portfolio;
    }

    this.team =
      org.membersWithRole && org.membersWithRole.nodes.length > 0
        ? org.membersWithRole.nodes.map((user) => {
            const usr = new User();
            usr.fromGitHubGraphQL(user);
            return usr;
          })
        : null;

    return this;
  }

  fromGitHub(data: GitHubUserAccount) {
    this.id = data?.login ? data?.login : this.id;
    this.createdAt = data?.created_at ? data?.created_at : this.createdAt;
    this.updatedAt = data?.updated_at ? data?.updated_at : this.updatedAt;
    this.login = data?.login ? data?.login : this.login;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : this.avatarURL;
    this.name = data?.name ? data?.name : this.name;
    this.company = data?.company ? data?.company : this.company;
    this.email = data?.email ? data?.email : this.email;
    this.blog = data?.blog ? data?.blog : this.blog;
    this.location = data?.location ? data?.location : this.location;
    this.reposURL = data?.repos_url ? data?.repos_url : this.reposURL;
    this.website = data?.blog ? data?.blog : null;
    this.contactMethods = this.getContactMethods(data);
  }

  fromDB(data: Record<string, any>) {
    this.company = data?.company ? data?.company : this.company;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : this.avatarURL;
  }

  toOrganizationObject(): OrganizationObject {
    return {
      id: this.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      avatar_url: this.avatarURL,
      login: this.login,
      roles: this.roles,
      description: this.description,
      bio: this.bio,
      name: this.name,
      company: this.company,
      blog: this.blog,
      location: this.location,
      email: this.email,
      website: this.website,
      phone: this.phone,
      contact_methods: this.contactMethods
        ? this.contactMethods.toContactMethodsObject()
        : null,
      repos_url: this.reposURL,
      repos: this.repos
        ? this.repos.collection.map((repo) => repo.toRepoObject())
        : null,
      repo_queries: this.repoQueries
        ? this.repoQueries.map((repoQuery) =>
            repoQuery.toGitHubRepoQueryObject()
          )
        : null,
      portfolio: this.portfolio ? this.portfolio.toPortfolioObject() : null,
      skills: this.skills ? this.skills.toSkillsObject() : null,
      organizations_url: null,
      organizations: null,
      team: this.team ? this.team.map((user) => user.toUserObject()) : null,
      office_hours: this.officeHours,
      products: this.products ? this.products.toProductsObject() : null,
      services: this.services ? this.services.toServicesObject() : null,
    };
  }
}
