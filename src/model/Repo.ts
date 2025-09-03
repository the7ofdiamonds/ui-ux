import { Owner, OwnerObject } from './Owner';
import { RepoContents, RepoContentsObject } from './RepoContents';
import { RepoContent } from './RepoContent';
import { Contributors, ContributorsObject } from '@/model/Contributors';
import {
  ProjectSkills,
  ProjectSkillsObject,
  LanguageGQL,
} from './ProjectSkills';
import { Issues, IssuesObject } from './Issues';
import { IssueGQL } from './Issue';
import { OwnerGQL } from './Owner';

import { GitHubRepo } from '@/model/GitHub';

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
  id: string | null;
  name: string | null;
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
}

export class Repo {
  id: string | null;
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

  constructor(data?: RepoObject) {
    this.id = data?.id ? data.id : null;
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
  }

  fromGitHubGraphQL(repo: RepositoryGQL) {
    this.id = repo.id;
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
  }

  fromGitHub(response: GitHubRepo) {
    this.id = response?.name;
    this.name = response.name;
    this.privacy = response?.private;
    this.size = response?.size;
    this.owner = response?.owner ? new Owner(response.owner) : null;
    this.createdAt = response?.created_at;
    this.updatedAt = response?.pushed_at;
    this.homepage = response?.homepage;
    this.description = response?.description;
    this.apiURL = response?.url;
    this.repoURL = response?.html_url;
    this.contributorsURL = response?.contributors_url;
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

  toRepoObject(): RepoObject {
    return {
      id: this.id,
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
    };
  }
}
