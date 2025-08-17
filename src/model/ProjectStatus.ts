import { formatTime } from '@/utils/String';

import { ProjectProgress } from '@/model/ProjectProgress';
import { Repo } from '@/model/Repo';
import { ProjectDataObject } from '@/model/Project';

export type ProjectStatusObject = {
  created_at: string | null;
  updated_at: string | null;
  progress: number | null;
};

export class ProjectStatus {
  createdAt: string | null;
  updatedAt: string | null;
  progress: ProjectProgress | null;

  constructor(data?: ProjectStatusObject) {
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
  }

  setCreatedAt(dateTime: string | null) {
    this.createdAt = dateTime;
  }

  getCreatedAt(dateTime: string) {
    return formatTime(dateTime);
  }

  setUpdatedAt(dateTime: string | null) {
    this.updatedAt = dateTime;
  }

  getUpdatedAt(dateTime: string) {
    return formatTime(dateTime);
  }

  setProgress(progress: ProjectProgress) {
    this.progress = progress;
  }

  fromRepo(repo: Repo) {
    if (repo.createdAt) {
      this.setCreatedAt(repo.createdAt);
    }

    if (repo.updatedAt) {
      this.setUpdatedAt(repo.updatedAt);
    }
  }

  fromDocumentData(data: ProjectDataObject) {}

  toProjectStatusObject(): ProjectStatusObject {
    return {
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      progress:
        this.progress instanceof ProjectProgress && this.progress.completion
          ? this.progress.completion
          : typeof this.progress === 'number'
          ? this.progress
          : null,
    };
  }
}
