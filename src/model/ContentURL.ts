import { RepoContentQuery } from './RepoContentQuery';

import { marked } from 'marked';

export interface ContentURLObject {
  id: string | number | null;
  owner: string | null;
  repo: string | null;
  path: string | null;
  branch: string | null;
  url: string | null;
  isValid: boolean;
}

export class ContentURL {
  id: string | number | null;
  owner: string | null;
  repo: string | null;
  path: string | null;
  branch: string | null;
  url: string | null;
  isValid: boolean;

  constructor(data: Partial<ContentURLObject>) {
    this.id = data?.id ? data?.id : null;
    this.owner = data?.owner ? data.owner : null;
    this.repo = data?.repo ? data.repo : null;
    this.path = data?.path ? data.path : null;
    this.branch = data?.branch ? data.branch : null;

    try {
      if (!data?.url || typeof data?.url !== 'string') {
        throw new Error('URL must be a string.');
      }

      this.url = new URL(data.url).toString();
      this.isValid = true;
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching content:', err);
      this.url = null;
      this.isValid = false;
    }
  }

  setID(id: string | number) { this.id = id; }

  setURL(url: string) {
    try {
      if (typeof url !== 'string') {
        throw new Error('URL must be a string.');
      }

      return new URL(url).toString();
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching content:', err);
    }
  }

  from(url: string) {
    let parts: Array<string> = [];
    this.isValid = false;

    try {
      if (typeof url !== 'string') {
        throw new Error('URL must be a string.');
      }

      const pathname = new URL(url).pathname;
      parts = pathname.split('/');
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching content:', err);
    }

    if (parts.length >= 5) {
      this.isValid = true;
    }

    this.owner = parts[1] ?? null;
    this.repo = parts[2] ?? null;
    this.path = parts[4] ?? null;
    this.branch = parts[3] ?? null;
    this.url = url;

    return this;
  }

  fromMdtoHTML(md: string) {
    try {
      return marked.parse(md);
    } catch (error) {
      console.error(error);
    }
  }

  toContentURLObject(): ContentURLObject {
    return {
      id: this.id,
      owner: this.owner,
      repo: this.repo,
      path: this.path,
      branch: this.branch,
      url: this.url,
      isValid: this.isValid,
    };
  }

  toRepoContentQuery(): RepoContentQuery | null {
    try {
      if (this.owner == null) {
        throw new Error('Owner of repo is required.');
      }

      if (this.repo == null) {
        throw new Error('Repo is required.');
      }

      if (this.path == null) {
        throw new Error('Path to content is required.');
      }

      if (this.branch == null) {
        throw new Error('Branch within the repo is required.');
      }

      if (!this.isValid) {
        return null;
      }

      return new RepoContentQuery(
        this.owner,
        this.repo,
        this.path,
        this.branch
      );
    } catch (error) {
      const err = error as Error;
      throw new Error('Error creating RepoContentQuery:', err);
    }
  }
}