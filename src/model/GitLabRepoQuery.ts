import type { GitLabQueryObject } from './GitLabQuery';
import { GitLabQuery } from './GitLabQuery';

export type GitLabRepoQueryObject  = GitLabQueryObject & {
  owner: string | null;
  id: string | null;
  account_type?: string | null;
  privacy?: string;
};

export class GitLabRepoQuery extends GitLabQuery {
  owner: string | null;
  id: string | null;
  accountType: string | null;
  privacy: string;

  constructor(query: GitLabRepoQueryObject) {
    super(query)
    this.owner = query?.owner ? query.owner : null;
    this.id = query?.id ? query.id : null;
    this.accountType = query?.account_type ? query.account_type : null;
    this.privacy = query?.privacy ? query.privacy : 'public';
  }

  setOwner(owner: string) {
    this.owner = owner;
  }

  setID(id: string) {
    this.id = id;
  }

  setAccountType(accountType: string) {
    this.accountType = accountType;
  }

  setPrivacy(privacy: string) {
    this.privacy = privacy;
  }

  isValid(): boolean {
    if (this.selfHosted && this.headers && this.url) {
      return true;
    }

    if (this.privacy === 'private' && !this.selfHosted && this.headers && this.url) {
      this.setUrl('gitlab.com')
      return true;
    }

    return false;
  }

  toGitLabRepoQueryObject(): GitLabRepoQueryObject {
    return {
      headers: this.headers?.isValid() ? this.headers?.toGitLabHeadersObject() : null,
      url: this.url,
      owner: this.owner,
      id: this.id,
      account_type: this.accountType,
      self_hosted: this.selfHosted,
      privacy: this.privacy
    };
  }
}
