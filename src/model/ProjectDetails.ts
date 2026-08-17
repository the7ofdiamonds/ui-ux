import { ContentURL } from '../model/ContentURL';
import { RepoSize } from '../model/RepoSize';
import type { ContributorObject } from '../model/Contributor';
import { Contributor } from '../model/Contributor';
import { Repo } from '../model/Repo';
import type { ProjectDataObject } from '../model/Project';
import type { ContributorsObject } from './Contributors';
import { Contributors } from './Contributors';

export type ProjectDetailsObject = {
  id: string | number | null;
  privacy: string | null;
  client_id: string | null;
  content: string | null;
  team_list: ContributorsObject | null;
  story: string | null;
  repo_size: String | null;
};

export type ProjectDetailsDataObject = {
  id: string | number | null;
  privacy: string | null;
  client_id: string | null;
  content: string | null;
  team_list: Array<string> | null;
  story: string | null;
};

export class ProjectDetails {
  id: string | number | null;
  privacy: string | null;
  teamList: Contributors | null;
  repoSize: String | null;
  content: ContentURL | null;
  story: ContentURL | null;
  clientID: string | null;

  constructor(data?: Partial<ProjectDetailsObject>) {
    this.id = data?.id ? data.id : null;
    this.privacy = data?.privacy ? data.privacy : null;
    this.teamList = data?.team_list?.list && data?.team_list?.list.length > 0 ? new Contributors(data.team_list) : null;
    this.repoSize = data?.repo_size ? data.repo_size : null;
    this.content = data?.content ? new ContentURL({ url: data.content }) : null;
    this.story = data?.story ? new ContentURL({ url: data.story }) : null;
    this.clientID = data?.client_id ? data.client_id : null;
  }

  setID(id: string | number) {
    this.id = id;
  }

  setPrivacy(privacy: string) {
    this.privacy = privacy;
  }

  setClientID(id: string) {
    this.clientID = id;
  }

  setContentURL(content: ContentURL) {
    this.content = content;
  }

  getTeamList(data: Array<ContributorObject>) {
    let teamList: Array<Contributor> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((contributor) => {
        teamList.push(new Contributor(contributor));
      });
    }

    return teamList;
  }

  setStory(url: string) {
    this.story = new ContentURL({ url: url });
  }

  setRepoSize(size: number) {
    this.repoSize = new RepoSize(size).display();
  }

  setTeamList(team: Array<Contributor>) {
    if (!this.teamList) {
      this.teamList = new Contributors();
    }
    this.teamList.set(team);
  }

  hasData(): boolean {
    if (
      this.privacy || this.teamList ||
      this.content || this.story ||
      this.clientID) {
      return true;
    }

    return false;
  }

  fromRepo(repo: Repo) {
    if (
      repo.contributors &&
      repo.contributors.list &&
      Array.isArray(repo.contributors.list) &&
      repo.contributors.list.length > 0
    ) {
      this.setTeamList(repo.contributors.list);
    }

    if (
      repo.contents &&
      repo.contents.details &&
      repo.contents.details.size > 0 &&
      repo.contents.details.downloadURL
    ) {
      this.setContentURL(new ContentURL({ url: repo.contents.details.downloadURL }));
    }

    if (
      repo.contents &&
      repo.contents.story &&
      repo.contents.story.size > 0 &&
      repo.contents.story.downloadURL
    ) {
      this.setStory(repo.contents.story.downloadURL);
    }

    if (repo.size && repo.size > 0) {
      this.setRepoSize(repo.size);
    }

    if (
      repo.contributors &&
      Array.isArray(repo.contributors.list) &&
      repo.contributors.list.length > 0
    ) {
      this.setTeamList(repo.contributors.list);
    }

    return this;
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data?.details) {
      if (data.details?.privacy) {
        this.setPrivacy(data.details.privacy);
      }

      if (data.details?.client_id) {
        this.setClientID(data.details.client_id);
      }
    }
  }

  toDetailsObject(): ProjectDetailsObject {
    return {
      id: this.id,
      privacy: this.privacy,
      client_id: this.clientID,
      content: this.content ? this.content.url : null,
      team_list: this.teamList ? this.teamList.toContributorsObject() : null,
      story: this.story ? this.story.url : null,
      repo_size: this.repoSize ? this.repoSize : null,
    };
  }

  toDetailsDataObject(): ProjectDetailsDataObject {
    return {
      id: this.id,
      privacy: this.privacy,
      client_id: this.clientID,
      content: this.content ? this.content.url : null,
      team_list: this.teamList
        ? this.teamList.list
          .map((contributor) => contributor.id)
          .filter((id): id is string => id !== null)
        : null,
      story: this.story ? this.story.url : null,
    };
  }
}
