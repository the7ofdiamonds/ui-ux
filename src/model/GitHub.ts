import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';
import {
  GetResponseDataTypeFromEndpointMethod,
  GetResponseTypeFromEndpointMethod,
} from '@octokit/types';

const octokit = new Octokit();

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
