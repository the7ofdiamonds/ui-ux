import { Account, AccountGQL, AccountObject, iAccount } from '@/model/Account';
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
import { SkillsObject, Skills } from '@/model/Skills';
import { Role, RoleObject } from '@/model/Role';
import { GitHubUserAccount } from './GitHub';

export type UserObject = Omit<AccountObject, 'type' | 'login' | 'name'> & {
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  bio: string | null;
  website: string | null;
  story: string | null;
  nickname: string | null;
  nicename: string | null;
  phone: string | null;
  resume: string | null;
};

export class User implements iAccount {
  public id: string | null;
  public createdAt: string | null;
  public updatedAt: string | null;
  public roles: Array<Role>;
  public avatarURL: string | null;
  public bio: string | null;
  public email: string | null;
  public contactMethods: ContactMethods = new ContactMethods();
  public location: string | null;
  public organizationsURL: string | null;
  public organizations: Organizations | null;
  public reposURL: string | null;
  public repos: Repos | null;
  public repoQueries: Array<GitHubRepoQuery>;
  public skills: Skills;
  public portfolio: Portfolio | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  title: string | null;
  website: string | null;
  story: string | null;
  nickname: string | null;
  nicename: string | null;
  phone: string | null;
  resume: string | null;

  constructor(data?: Partial<UserObject>) {
    // super({ ...data, type: 'User' });

    this.id = data?.id ? data.id : null;
    this.createdAt = data?.created_at ? data.created_at : null;
    this.updatedAt = data?.updated_at ? data.updated_at : null;
    this.username = data?.username ? data.username : null;
    this.firstName = data?.first_name ? data.first_name : null;
    this.lastName = data?.last_name ? data.last_name : null;
    this.title = data?.title ? data.title : null;
    this.bio = data?.bio ? data.bio : null;
    this.email = data?.email ? data.email : null;
    this.phone = data?.phone ? data.phone : null;
    this.resume = data?.resume ? data.resume : null;
    this.website = data?.website ? data.website : null;
    this.story =
      data?.story && typeof data.story === 'string' ? data.story : null;
    this.nickname = data?.nickname ? data.nickname : null;
    this.nicename = data?.nicename ? data.nicename : null;
    this.roles =
      data?.roles && data.roles.length > 0
        ? data.roles.map((roleObject) => new Role(roleObject))
        : [];
    this.avatarURL = data?.avatar_url ? data?.avatar_url : null;
    this.location = data?.location ? data.location : null;
    this.contactMethods = data
      ? this.getContactMethods(data)
      : this.contactMethods;
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

  setID(id: string) {
    this.id = id;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setAvatarURL(url: string) {
    this.avatarURL = url;
  }

  setStory(url: string) {
    this.story = url;
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
    this.id = data?.login ? data?.login : this.id;
    this.createdAt = data?.created_at ? data?.created_at : this.createdAt;
    this.updatedAt = data?.updated_at ? data?.updated_at : this.updatedAt;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : this.avatarURL;
    this.email = data?.email ? data?.email : this.email;
    this.location = data?.location ? data?.location : this.location;
    this.reposURL = data?.repos_url ? data?.repos_url : this.reposURL;
    this.website = data?.blog ? data?.blog : null;
    this.contactMethods = this.getContactMethods(data);
  }

  fromGitHubGraphQL(response: AccountGQL) {
    const org = response ? response : null;

    if (!org) {
      return;
    }

    this.id = org.id;
    this.avatarURL = org.avatarUrl;

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
  }

  fromDB(data: Record<string, any>) {
    this.title = data?.title || this.title;

    try {
      const resume = data?.resume ? new URL(data?.resume) : null;
      this.resume = resume ? resume.href : this.resume;
    } catch (error) {
      console.error(`Invalid URL: ${data?.resume}`, error);
    }
  }

  fromJson(json: Record<string, any>) {
    this.id = '0';
    this.avatarURL = json.avatar_url || null;
    this.title = json.title || null;
    this.email = json.contact_methods.email.value || null;
    this.phone = json.contact_methods.phone.value || null;
    this.resume = json.resume || null;
    this.website = json.website || null;
  }

  toUserObject(): UserObject {
    return {
      id: this.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      username: this.username,
      roles: this.roles,
      first_name: this.firstName,
      last_name: this.lastName,
      avatar_url: this.avatarURL,
      title: this.title,
      location: this.location,
      bio: this.bio,
      email: this.email,
      phone: this.phone,
      resume: this.resume,
      website: this.website,
      story: this.story,
      nickname: this.nickname,
      nicename: this.nicename,
      contact_methods: this.contactMethods
        ? this.contactMethods.toContactMethodsObject()
        : null,
      organizations_url: this.organizationsURL,
      organizations:
        this.organizations && this.organizations.list.length > 0
          ? this.organizations.list.map((org) => org.toOrganizationObject())
          : null,
      repos_url: this.reposURL,
      repos:
        this.repos && this.repos.collection.length > 0
          ? this.repos.collection.map((repo) => repo.toRepoObject())
          : null,
      repo_queries:
        this.repoQueries && this.repoQueries.length > 0
          ? this.repoQueries
              .filter((repoQuery) => repoQuery.owner && repoQuery.repo)
              .map((repoQuery) => repoQuery.toGitHubRepoQueryObject())
          : null,
      portfolio: this.portfolio ? this.portfolio.toPortfolioObject() : null,
      skills: this.skills ? this.skills.toSkillsObject() : null,
    };
  }
}
