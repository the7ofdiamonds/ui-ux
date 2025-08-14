import { RepoContributor } from './GitHub';
import { User, UserObject } from './User';

export type ContributorObject = UserObject & {};

export class Contributor extends User {
  constructor(data?: UserObject) {
    super(data);
  }

  override fromGitHub(data: RepoContributor) {
    this.id = data?.login ? data?.login : this.id;
    // this.createdAt = data?.created_at ? data?.created_at : this.createdAt;
    // this.updatedAt = data?.updated_at ? data?.updated_at : this.updatedAt;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : this.avatarURL;
    this.login = data?.login ? data.login : null;
    this.email = data?.email ? data?.email : this.email;
    // this.location = data?.location ? data?.location : this.location;
    this.reposURL = data?.repos_url ? data?.repos_url : this.reposURL;
    // this.website = data?.blog ? data?.blog : null;
    this.contactMethods = this.getContactMethods(data);
  }

  toContributorObject(): ContributorObject {
    return {
      id: this.id,
      type: this.type,
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
      login: this.login,
      name: this.name,
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
