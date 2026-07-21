import type { OwnerObject } from './Owner';
import { Owner } from './Owner'
import type { RepoContentsObject } from './RepoContents';
import { RepoContents } from './RepoContents';
import { RepoContent } from './RepoContent';
import type { ContributorsObject } from '../model/Contributors';
import { Contributors } from '../model/Contributors';
import type {
  ProjectSkillsObject,
  LanguageGQL
} from './ProjectSkills';
import {
  ProjectSkills
} from './ProjectSkills';
import type { IssuesObject } from './Issues';
import { Issues } from './Issues';
import type { IssueGQL } from './Issue';
import type { OwnerGQL } from './Owner';

import type { GitHubRepo } from '../model/GitHub';
import type { GitLabRepoObject } from '../model/GitLabRepo';

import { Commits } from './Commits';
import type { CommitObject } from "./Commit";

export type RepositoryGQL = {
  id: string;
  name: string;
  description: string;
  url: string;
  owner: OwnerGQL;
  languages: {
    edges: Array<LanguageGQL>;
  };
  issues: {
    nodes: IssueGQL;
  };
};

export interface RepoObject {
  id: number | string | null;
  name: string | null;
  type: RepoType | null;
  privacy: boolean;
  size: number | null;
  owner: OwnerObject | null;
  created_at: string | null;
  updated_at: string | null;
  homepage: string | null;
  description: string | null;
  api_url: string | null;
  repo_url: string | null;
  skills: ProjectSkillsObject | null;
  contents: RepoContentsObject | null;
  contributors_url: string | null;
  contributors: ContributorsObject | null;
  issues: IssuesObject | null;
  commits: CommitObject[] | null;
  path: string | null;
}

export type RepoType = 'GitHub' | 'GitLab';

export class Repo {
  id: number | string | null;
  type: RepoType | null;
  name: string | null;
  privacy: boolean;
  size: number | null;
  owner: Owner | null;
  createdAt: string | null;
  updatedAt: string | null;
  homepage: string | null;
  description: string | null;
  apiURL: string | null;
  repoURL: string | null;
  skills: ProjectSkills | null;
  contents: RepoContents | null;
  contributorsURL: string | null;
  contributors: Contributors | null;
  issues: Issues | null;
  commits: Commits | null;
  path: string | null;

  constructor(data?: RepoObject) {
    this.id = data?.id ? data.id : null;
    this.type = data?.type ? data.type : null;
    this.name = data?.name ? data.name : null;
    this.privacy = data?.privacy ? data?.privacy : false;
    this.size = data?.size ? data?.size : null;
    this.owner = data?.owner ? new Owner(data.owner) : null;
    this.createdAt = data?.created_at ? data?.created_at : null;
    this.updatedAt = data?.updated_at ? data?.updated_at : null;
    this.homepage = data?.homepage ? data.homepage : null;
    this.description = data?.description ? data.description : null;
    this.apiURL = data?.api_url ? data.api_url : null;
    this.repoURL = data?.repo_url ? data.repo_url : null;
    this.skills = data?.skills ? new ProjectSkills(data.skills) : null;
    this.contents = data?.contents ? new RepoContents(data.contents) : null;
    this.contributorsURL = data?.contributors_url
      ? data.contributors_url
      : null;
    this.contributors = data?.contributors
      ? new Contributors(data.contributors)
      : null;
    this.issues =
      data?.issues && Array.isArray(data.issues.list) && data.issues.list.length > 0
        ? new Issues(data.issues)
        : null;
    this.commits = data?.commits && data.commits.length > 0 ? new Commits(data?.commits) : null;
    this.path = data?.path ? data.path : null;
  }

  fromGitHubGraphQL(repo: RepositoryGQL) {
    this.id = repo.id;
    this.type = 'GitHub';
    this.name = repo.name;
    this.description = repo.description;
    this.repoURL = repo.url;

    let owner = null;

    if (repo.owner) {
      owner = new Owner();
      owner.fromGitHubGraphQL(repo.owner);
    }

    this.owner = owner;

    let issues = null;

    if (Array.isArray(repo.issues.nodes) && repo.issues.nodes.length > 0) {
      issues = new Issues();
      issues.fromGitHubGraphQL(repo.issues.nodes);
    }

    this.issues = issues;

    let skills = null;

    if (
      repo.languages &&
      repo.languages.edges &&
      Array.isArray(repo.languages.edges) &&
      repo.languages.edges.length > 0
    ) {
      skills = new ProjectSkills();
      skills.fromGitHubGraphQL(repo.languages.edges);
    }

    this.skills = skills;
    this.path = repo.owner?.login && repo.name ? `${repo.owner?.login}/${repo.name}` : null;
  }

  fromGitHub(repo: GitHubRepo) {
    this.id = repo?.id;
    this.type = 'GitHub';
    this.name = repo.name;
    this.privacy = repo?.private;
    this.size = repo?.size;
    this.owner = repo?.owner ? new Owner(repo.owner) : null;
    this.createdAt = repo?.created_at;
    this.updatedAt = repo?.pushed_at;
    this.homepage = repo?.homepage;
    this.description = repo?.description;
    this.apiURL = repo?.url;
    this.repoURL = repo?.html_url;
    this.contributorsURL = repo?.contributors_url;
    this.path = repo.owner?.login && repo.name ? `${repo.owner?.login}/${repo.name}` : null;
  }

  fromGitLab(repo: GitLabRepoObject) {
    this.id = repo?.id;
    this.type = 'GitLab';
    this.createdAt = repo?.created_at;
    this.updatedAt = repo?.updated_at;
    this.name = repo.name;
    this.description = repo?.description;
    this.privacy = repo?.visibility === 'private';

    if (repo?.owner) {
      const owner = new Owner(repo.owner);
      owner.fromGitLab(repo.owner);
      this.owner = owner;
    }

    this.path = repo.owner?.username && repo?.path ? `${repo.owner?.username}/${repo.path}` : null;
    // this.size = response?.size;
    // this.homepage = response?.homepage;
    // this.apiURL = response?.url;
    // this.repoURL = response?.html_url;
    // this.contributorsURL = response?.contributors_url;
  }

  getOwner(data: Record<string, any>) {
    if (typeof data === 'object') {
      return data.login;
    }

    if (typeof data === 'string') {
      return data;
    }

    return '';
  }

  setSkills(projectSkills: ProjectSkills) {
    this.skills = projectSkills;
  }

  setContents(contentsObject: Record<string, any>) {
    if (
      contentsObject &&
      (contentsObject.solution ||
        contentsObject.design ||
        contentsObject.development ||
        contentsObject.delivery ||
        contentsObject.problem ||
        contentsObject.details ||
        contentsObject.story)
    ) {
      this.contents ? this.contents : (this.contents = new RepoContents());

      this.contents.setSolution(new RepoContent(contentsObject.solution));
      this.contents.setDesign(new RepoContent(contentsObject.design));
      this.contents.setDevelopment(new RepoContent(contentsObject.development));
      this.contents.setDelivery(new RepoContent(contentsObject.delivery));
      this.contents.setProblem(new RepoContent(contentsObject.problem));
      this.contents.setDetails(new RepoContent(contentsObject.details));
      this.contents.setStory(new RepoContent(contentsObject.story));
    }
  }

  filterContents(contentsObject: Array<Record<string, any>>) {
    if (Array.isArray(contentsObject) && contentsObject.length > 0) {
      contentsObject.forEach((content) => {
        this.contents ? this.contents : (this.contents = new RepoContents());

        if (content.type === 'file' && content.size > 7) {
          switch (content.name) {
            case 'TheSolution.md':
              this.contents.setSolution(new RepoContent(content));
              break;
            case 'Design.md':
              this.contents.setDesign(new RepoContent(content));
              break;
            case 'Development.md':
              this.contents.setDevelopment(new RepoContent(content));
              break;
            case 'Delivery.md':
              this.contents.setDelivery(new RepoContent(content));
              break;
            case 'TheProblem.md':
              this.contents.setProblem(new RepoContent(content));
              break;
            case 'Details.md':
              this.contents.setDetails(new RepoContent(content));
              break;
            case 'Story.md':
              this.contents.setStory(new RepoContent(content));
              break;
          }
        }
      });
    }
  }

  setContributors(contributors: Contributors) {
    this.contributors = contributors;
  }

  setIssues(issues: Issues) {
    this.issues = issues;
  }

  setCommits(commits: Commits) {
    this.commits = commits;
  }

  toRepoObject(): RepoObject {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      privacy: this.privacy,
      size: this.size,
      owner: this.owner ? this.owner.toOwnerObject() : null,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      homepage: this.homepage,
      description: this.description,
      api_url: this.apiURL,
      repo_url: this.repoURL,
      skills: this.skills ? this.skills.toProjectSkillsObject() : null,
      contents: this.contents ? this.contents.toRepoContentsObject() : null,
      contributors_url: this.contributorsURL,
      contributors: this.contributors
        ? this.contributors.toContributorsObject()
        : null,
      issues: this.issues ? this.issues.toIssuesObject() : null,
      commits: this.commits ? this.commits.toCommitsObject() : null,
      path: this.path
    };
  }
}
