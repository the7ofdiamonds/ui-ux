import { Commit } from "./Commit";
import type { CommitObject } from "./Commit";

import type { CommitsResponse, GitHubCommit } from "./GitHub";

export class Commits {
    list: Commit[];

    constructor(list?: CommitObject[]) {
        this.list = list ? list.map((commit) => new Commit(commit)) : [];
    }

    fromResponse(response: Array<GitHubCommit>) {
        if(!response) return;
        this.list = response.map((r) => {
            const commit = new Commit();
            commit.fromGitHub(r.commit);
            return commit;
        });
        return this;
    }

    toCommitsObject(): CommitObject[] {
        return this.list.map((commit) => commit.toCommitObject()) ?? [];
    }
}