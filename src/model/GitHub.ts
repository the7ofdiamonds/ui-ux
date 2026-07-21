import { Octokit } from '@octokit/rest';
import type { RestEndpointMethodTypes } from '@octokit/rest';
import type {
  GetResponseDataTypeFromEndpointMethod,
  GetResponseTypeFromEndpointMethod,
} from '@octokit/types';

const octokit: Octokit = new Octokit();

export type RepoResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.get
>;

export type GitHubRepo = RepoResponse['data'];

export type RepoContributorsResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.listContributors
>;

export type RepoContributors = RepoContributorsResponse['data'];

export type RepoContributor = RepoContributors[number];

export type RepoLanguagesResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.listLanguages
>;

export type GitHubLanguages = RepoLanguagesResponse['data'];

export type GitHubUserAccount =
  RestEndpointMethodTypes['users']['getByUsername']['response']['data'];

export type GitHubOrganizationAccount =
  RestEndpointMethodTypes['users']['getByUsername']['response']['data'];

export type GitHubRepoFileResponse =
  RestEndpointMethodTypes['repos']['getContent']['response'];

export type GitHubRepoFileData = GitHubRepoFileResponse['data'];

export type GitHubCommits = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.listCommits
>['data'];

export type GitHubCommit = GitHubCommits[number];

export type GitHubUser = GitHubUserAccount & RepoContributor & {};
