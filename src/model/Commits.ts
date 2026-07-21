import { Commit } from "./Commit";
import type { CommitObject } from "./Commit";

import type { GitHubCommits, GitHubCommit } from "./GitHub";

export class Commits {
    list: Commit[];

    constructor(list?: CommitObject[]) {
        this.list = list ? list.map((commit) => new Commit(commit)) : [];
    }

    fromResponse(commits: GitHubCommits) {
        if (!commits) return;
        this.list = commits.map((c: GitHubCommit) => {
            const commit = new Commit();
            commit.fromGitHub(c);
            return commit;
        });
        return this;
    }

    toCommitsObject(): CommitObject[] {
        return this.list.map((commit) => commit.toCommitObject()) ?? [];
    }
}