import { ContactMethods, ContactMethodsObject } from '@/model/ContactMethods';
import {
  GitHubRepoQuery,
  GitHubRepoQueryObject,
} from '@/model/GitHubRepoQuery';
import { OrganizationGQL, OrganizationObject } from '@/model/Organization';
import { Organizations } from '@/model/Organizations';
import { Portfolio, PortfolioObject } from '@/model/Portfolio';
import { Repo, RepoObject, RepositoryGQL } from '@/model/Repo';
import { Repos } from '@/model/Repos';
import { Role, RoleObject } from '@/model/Role';
import { SkillsObject, Skills } from '@/model/Skills';
import { GitHubUserAccount } from './GitHub';

export type AccountGQL = {
  id: string;
  __typename: string;
  login: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  organizations: {
    nodes: Array<OrganizationGQL>;
  };
  repositories: {
    nodes: Array<RepositoryGQL>;
  };
};

export type AccountGQLResponse = {
  viewer: AccountGQL;
};

export type AccountObject = {
  id: string | null;
  created_at: string | null;
  updated_at: string | null;
  type?: string | null;
  login: string | null;
  roles: Array<RoleObject>;
  avatar_url: string | null;
  name: string | null;
  bio: string | null;
  email: string | null;
  website: string | null;
  contact_methods: ContactMethodsObject | null;
  location: string | null;
  organizations_url: string | null;
  organizations: Array<OrganizationObject> | null;
  repos_url: string | null;
  repos: Array<RepoObject> | null;
  repo_queries: Array<GitHubRepoQueryObject> | null;
  skills: SkillsObject | null;
  portfolio: PortfolioObject | null;
};

export interface iAccount {
  id: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  type: string | null;
  login: string | null;
  roles: Array<Role> | null;
  name: string | null;
  avatarURL: string | null;
  bio: string | null;
  email: string | null;
  website: string | null;
  contactMethods: ContactMethods | null;
  location: string | null;
  organizationsURL: string | null;
  organizations: Organizations | null;
  reposURL: string | null;
  repos: Repos | null;
  repoQueries: Array<GitHubRepoQuery>;
  portfolio: Portfolio | null;
  skills: Skills | null;
  getRoles: (roles: Array<RoleObject>) => Array<Role>;
  setRoles: (roles: Array<RoleObject>) => void;
  getContactMethods: (contacts: Record<string, any>) => ContactMethods;
  setContactMethonds: (contacts: ContactMethods) => void;
  getOrganizations: (organizations: Array<OrganizationObject>) => Organizations;
  setOrganizations: (organizations: Array<OrganizationObject>) => void;
  setReposURL: (url: string) => void;
  setRepos: (repos: Repos) => void;
  getRepoQueries: (data: Array<Record<string, any>>) => Array<GitHubRepoQuery>;
  setRepoQueries: (repos: Array<RepoObject>) => void;
  setPortfolio: (portfolio: Portfolio) => void;
  setSkills: (skills: Skills) => void;
  fromGitHub: (data: any) => void;
  fromGitHubGraphQL: (data: AccountGQL) => void;
  fromDB: (data: Record<string, any>) => void;
  fromJson: (data: Record<string, any>) => void;
}

export class Account implements iAccount {
  public id: string | null;
  public createdAt: string | null;
  public updatedAt: string | null;
  public type: string | null;
  public login: string | null;
  public roles: Array<Role> | null;
  public avatarURL: string | null;
  public name: string | null;
  public bio: string | null;
  public email: string | null;
  public website: string | null;
  public contactMethods: ContactMethods | null = null;
  public location: string | null;
  public organizationsURL: string | null;
  public organizations: Organizations | null;
  public reposURL: string | null;
  public repos: Repos | null;
  public repoQueries: Array<GitHubRepoQuery>;
  public skills: Skills;
  public portfolio: Portfolio | null;

  constructor(data?: Partial<AccountObject>) {
    this.id = data?.id ? data.id : null;
    this.createdAt = data?.created_at ? data.created_at : null;
    this.updatedAt = data?.updated_at ? data.updated_at : null;
    this.type = data?.type ? data.type : null;
    this.login = data?.login ? data.login : null;
    this.roles = data?.roles ? this.getRoles(data.roles) : null;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : null;
    this.name = data?.name ? data.name : null;
    this.bio = data?.bio ? data.bio : null;
    this.location = data?.location ? data.location : null;
    this.email = data?.email ? data.email : null;
    this.website = data?.website ? data.website : null;
    this.contactMethods = data ? this.getContactMethods(data) : null;
    this.organizationsURL = data?.organizations_url
      ? data.organizations_url
      : null;
    this.organizations = data?.organizations
      ? new Organizations(data.organizations)
      : null;
    this.reposURL = data?.repos_url ? data.repos_url : null;
    this.repos = data?.repos ? new Repos(data.repos) : null;
    this.repoQueries = data?.repo_queries
      ? data.repo_queries.map(
          (repoQuery) => new GitHubRepoQuery(repoQuery.owner, repoQuery.repo)
        )
      : [];
    this.portfolio = data?.portfolio ? new Portfolio(data.portfolio) : null;
    this.skills = data?.skills ? new Skills(data.skills) : new Skills();
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

  setPortfolio(portfolio: Portfolio) {
    this.portfolio = portfolio;
  }

  setSkills(skills: Skills) {
    this.skills = skills;
  }

  fromGitHub(data: GitHubUserAccount) {
    this.id = data?.login;
    this.avatarURL = data?.avatar_url;
    this.name = data?.name;
    this.bio = data?.bio;
    this.email = data?.email;
    this.website = data?.blog;
    this.organizationsURL = data?.organizations_url;
    this.reposURL = data?.repos_url;
    this.login = data?.login;
    this.contactMethods = this.getContactMethods(data);
  }

  fromGitHubGraphQL(user: AccountGQL) {
    this.id = user.id;
    this.avatarURL = user.avatarUrl;
    this.name = user.name;
    this.bio = user.bio;
    this.email = user.email;
    this.login = user.login;

    if (
      Array.isArray(user.organizations.nodes) &&
      user.organizations.nodes.length > 0
    ) {
      const orgs = new Organizations();
      orgs.fromGitHubGraphQL(user.organizations.nodes);
      this.organizations = orgs;
    }

    if (
      Array.isArray(user.repositories.nodes) &&
      user.repositories.nodes.length > 0
    ) {
      const repos = new Repos();
      const orgRepos =
        this.organizations && this.organizations.list
          ? this.organizations.list.flatMap((org) =>
              org.repos &&
              org.repos?.collection &&
              Array.isArray(org.repos?.collection)
                ? org.repos.collection
                : []
            )
          : [];
      repos.fromGitHubGraphQL(user.repositories.nodes);
      const totalRepos: Array<Repo> = [...orgRepos, ...repos.collection];
      repos.setCollection(totalRepos);
      this.repos = repos;
    }

    if (this.repos && this.repos.collection.length > 0) {
      const portfolio = new Portfolio();
      portfolio.fromRepos(this.repos);
      this.portfolio = portfolio;
    }
  }

  fromDB(data: Record<string, any>) {
    // this.title = data?.title || this.title;
    // try {
    //   const resume = data?.resume ? new URL(data?.resume) : null;
    //   this.resume = resume ? resume.href : this.resume;
    // } catch (error) {
    //   console.error(`Invalid URL: ${data?.resume}`, error);
    // }
  }

  fromJson(json: Record<string, any>) {
    this.id = '0';
    this.login = json.contact_methods.login || null;
    this.avatarURL = json.avatar_url || null;
    this.name = json.name || null;
    this.email = json.contact_methods.email.value || null;
    // this.phone = json.contact_methods.phone.value || null;
    // this.website = json.website || null;
    this.contactMethods = json.contact_methods
      ? new ContactMethods(json.contact_methods)
      : null;
  }
}
