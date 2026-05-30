import { RepoContentQuery } from "./RepoContentQuery";

export class RepoContentURL {
  owner: string | null;
  repo: string | null;
  path: string | null;
  branch: string | null;
  url: string | null;
  isValid: boolean;

  constructor(url: string) {
    let parts: Array<string> = [];

    this.isValid = false;

    try {
      if (typeof url !== 'string') {
        throw new Error('URL must be an email.');
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