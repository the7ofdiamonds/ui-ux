import { graphql } from '@octokit/graphql';
import { RepositoryGQL } from '@/model/Repo';

export type OrganizationGQL = {
  id: string;
  __typename: string;
  login: string;
  name: string;
  avatarUrl: string;
  description: string | null;
  email: string | null;
  url: string;
  websiteUrl: string;
  membersWithRole?: {
    totalCount: number;
    nodes: Array<UserGQL>;
  };
  repositories: {
    nodes: Array<RepositoryGQL>;
  };
};

export type OrganizationResponseGQL = {
  organization: OrganizationGQL;
};

export type AccountGQL = {
  id: string;
  __typename: string;
  login: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  organizations: {
    nodes: Array<OrganizationGQL>;
  };
  repositories: {
    nodes: Array<RepositoryGQL>;
  };
};

export type AccountGQLResponse = {
  viewer: AccountGQL;
};

export type UserGQL = {
  id: string;
  __typename: string;
  login: string;
  name: string | null;
  avatarUrl: string | null;
  email: string | null;
  organizations: {
    nodes: Array<OrganizationGQL>;
  };
  repositories: {
    nodes: Array<RepositoryGQL>;
  };
  bio: string | null;
};

export type OrganizationsGQL = {
  nodes: Array<OrganizationGQL>;
};

export type FromGitHubGraphQL =
  | ((data: AccountGQL) => void)
  | ((data: OrganizationGQL) => void)
  | ((data: UserGQL) => void);
