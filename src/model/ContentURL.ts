import { RepoContentQuery } from './RepoContentQuery';

import { marked } from 'marked';

export interface ContentURLObject {
  id: string | number | null;
  owner: string | null;
  repo: string | null;
  path: string | null;
  branch: string | null;
  url: string | null;
}

export class ContentURL {
  id: string | number | null;
  owner: string | null;
  repo: string | null;
  path: string | null;
  branch: string | null;
  url: string | null;

  constructor(data: Partial<ContentURLObject>) {
    this.id = data?.id ? data?.id : null;
    this.owner = data?.owner ? data.owner : null;
    this.repo = data?.repo ? data.repo : null;
    this.path = data?.path ? data.path : null;
    this.branch = data?.branch ? data.branch : null;
    this.url = data?.url ? data.url : null;
  }

  setID(id: string | number) { this.id = id; }

  isValid(url: string): boolean {
    try {

      if (!url) {
        throw new Error('No URL has been provided.');
      }

      if (typeof url !== 'string') {
        throw new Error('URL must be a string.');
      }

      new URL(url);

      return true;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  setUrl(url: string) {
    try {

      if (this.isValid(url)) {
        this.url = url;
      }

      this.url = null;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  from(url: string) {
    try {
      this.isValid(url)
      let parts: Array<string> = [];

      const pathname = new URL(url).pathname;
      parts = pathname.split('/');

      if (parts.length >= 5) {
        this.owner = parts[1] ?? null;
        this.repo = parts[2] ?? null;
        this.path = parts[4] ?? null;
        this.branch = parts[3] ?? null;
      }

      this.url = url;

      return this;
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching content:', err);
    }
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