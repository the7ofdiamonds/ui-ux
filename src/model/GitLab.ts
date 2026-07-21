export type GitLabHeadersObject = {
    "PRIVATE-TOKEN"?: string;
}

export class GitLabHeaders {
    token: string | null;

    constructor(headers: GitLabHeadersObject) {
        this.token = headers?.["PRIVATE-TOKEN"] ?? null;
    }

    isValid() {
        if (!this.token) return false;
        return true;
    }

    toGitLabHeadersObject(): GitLabHeadersObject {
        return {
            "PRIVATE-TOKEN": this.token ?? undefined
        }
    }
}