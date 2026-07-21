import type { GitLabHeadersObject } from "./GitLab";
import { GitLabHeaders } from "./GitLab";

export type GitLabQueryObject = {
  headers?: GitLabHeadersObject | null;
  url?: string | null;
  self_hosted?: boolean;
};

export class GitLabQuery {
  headers: GitLabHeaders | null;
  url: string | null;
  selfHosted: boolean;

  constructor(query: GitLabQueryObject) {
    this.headers = query?.headers ? new GitLabHeaders(query.headers) : null;
    this.url = query?.url ? `${query.url}/api/v4/projects` : null;
    this.selfHosted = query?.self_hosted ? query.self_hosted : false;
  }

  setHeaders(headers: GitLabHeaders) {
    this.headers = headers;
  }

  setUrl(url: string) {
    this.url = url;
  }

  setSelfHosted(selfHosted: boolean) {
    this.selfHosted = selfHosted;
  }

  isValid(): boolean {
    if (this.selfHosted && this.headers && this.url) {
      return true;
    }

    if (!this.selfHosted) {
      this.setUrl('http://gitlab.com/api/v4')
      return true;
    }

    return false;
  }

  toGitLabRepobObject(): GitLabQueryObject {
    return {
      headers: this.headers?.isValid() ? this.headers?.toGitLabHeadersObject() : null,
      url: this.url,
      self_hosted: this.selfHosted,
    };
  }
}
