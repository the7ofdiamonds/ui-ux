import { Account, AccountObject, iAccount } from '@/model/Account';
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
import { Role } from '@/model/Role';

export type UserObject = Omit<AccountObject, 'type' | 'login'> & {
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
  public contactMethods: ContactMethods | null = null;
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
    this.contactMethods = null;

    if (this.email || this.website || data?.contact_methods) {
      this.contactMethods = new ContactMethods();

      if (this.email) {
        this.contactMethods.setContactEmail(this.email);
      }

      if (this.website) {
        this.contactMethods.setContactWebsite(this.website);
      }

      if (this.phone) {
        this.contactMethods?.setContactPhone(this.phone);
      }
    }

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

  getID() {
    if (this.url) {
      const path = new URL(this.url);
      const pathname = path.pathname.split('/');
      return pathname[1];
    }

    return null;
  }

  setName(name: string) {
    this.name = name;
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
    this.login = json.contact_methods.login || null;
    this.avatarURL = json.avatar_url || null;
    this.name = json.name || null;
    this.title = json.title || null;
    this.email = json.contact_methods.email.value || null;
    this.phone = json.contact_methods.phone.value || null;
    this.resume = json.resume || null;
    this.website = json.website || null;
    this.contactMethods = json.contact_methods
      ? new ContactMethods(json.contact_methods)
      : null;
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
      name: this.name,
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
      url: this.url,
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
