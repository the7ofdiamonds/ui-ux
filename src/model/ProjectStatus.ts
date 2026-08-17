import { formatTime } from '../utils/String';

import { ProjectProgress } from '../model/ProjectProgress';
import { Repo } from '../model/Repo';
import type { ProjectDataObject } from '../model/Project';
import type { CommitObject } from './Commit';
import { Commits } from './Commits';

export type ProjectStatusObject = {
  id: string | number | null;
  created_at: string | null;
  updated_at: string | null;
  progress: number | null;
  commits: CommitObject[]
};

export class ProjectStatus {
  id: string | number | null;
  createdAt: string | null;
  updatedAt: string | null;
  progress: ProjectProgress | null;
  commits: Commits | null;

  constructor(data?: ProjectStatusObject) {
    this.id = data?.id ? data.id : null;
    this.createdAt = data?.created_at
      ? this.getCreatedAt(data?.created_at)
      : null;
    this.updatedAt = data?.updated_at
      ? this.getUpdatedAt(data?.updated_at)
      : null;
    this.progress = new ProjectProgress();

    if (data?.progress) {
      this.progress.completion = data.progress;
    }

    this.commits = data?.commits ? new Commits(data.commits) : null;
  }

  setID(id: string | number) {
    this.id = id;
  }

  setCreatedAt(dateTime: string | null) {
    this.createdAt = dateTime ? formatTime(dateTime) : null;
  }

  getCreatedAt(dateTime: string) {
    return formatTime(dateTime);
  }

  setUpdatedAt(dateTime: string | null) {
    this.updatedAt = dateTime ? formatTime(dateTime) : null;
  }

  getUpdatedAt(dateTime: string) {
    return formatTime(dateTime);
  }

  setProgress(progress: ProjectProgress) {
    this.progress = progress;
  }

  setCommits(commits: Commits) {
    this.commits = commits;
  }

  fromRepo(repo: Repo) {
    if (repo.createdAt) {
      this.setCreatedAt(repo.createdAt);
    }

    if (repo.updatedAt) {
      this.setUpdatedAt(repo.updatedAt);
    }

    if (repo.commits) {
      this.setCommits(repo.commits);
    }

    return this;
  }

  fromDocumentData(data: ProjectDataObject) { }

  toProjectStatusObject(): ProjectStatusObject {
    return {
      id: this.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      progress:
        this.progress instanceof ProjectProgress && this.progress.completion
          ? this.progress.completion
          : typeof this.progress === 'number'
            ? this.progress
            : null,
      commits: this.commits ? this.commits.toCommitsObject() : []
    };
  }
}
