import type { GitHubCommit } from "./GitHub";
import {formatTime} from "../utils/String";

export type CommitObject = {
    date: string | null;
    author: string | null;
    message: string | null;
}

export class Commit {
    date: string | null;
    author: string | null;
    message: string | null;

    constructor(commit?: CommitObject) {
        this.date = commit ? commit.date : null;
        this.author = commit ? commit.author : null;
        this.message = commit ? commit.message : null;
    }

    fromGitHub(commit: GitHubCommit) {
        if (!commit) return;
        this.date = formatTime(commit.committer?.date) ?? '';
        this.author = commit.committer?.name ?? '';
        this.message = commit.message ?? '';
        return this;
    }

    toCommitObject() {
        return {
            date: this.date,
            author: this.author,
            message: this.message
        }
    }
}