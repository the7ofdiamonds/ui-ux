import { ContentURL } from '@/model/ContentURL';

export interface RepoContentObject {
  id: string;
  name: string;
  path: string;
  type: string;
  size: number;
  download_url: string | null;
}

export class RepoContent {
  id: string = '';
  name: string = '';
  path: string = '';
  type: string = '';
  size: number = 0;
  downloadURL: string | null = null;

  constructor(data?: RepoContentObject | Partial<RepoContentObject>) {
    // Get SHA from github as id
    this.id = data?.id ?? '';
    this.name = data?.name ?? '';
    this.path = data?.path ?? '';
    this.type = data?.type ?? '';
    this.size = data?.size ?? 0;
    this.downloadURL = data?.download_url
      ? new ContentURL(data.download_url).url
      : null;
  }

  toRepoContentObject(): RepoContentObject {
    return {
      id: this.id,
      name: this.name,
      path: this.path,
      type: this.type,
      size: this.size,
      download_url: this.downloadURL,
    };
  }
}
