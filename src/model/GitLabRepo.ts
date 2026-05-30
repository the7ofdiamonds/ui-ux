import type { OwnerObject } from './Owner';
import { Owner } from './Owner'
import type { RepoContentsObject } from './RepoContents';
import { RepoContents } from './RepoContents';
import { RepoContent } from './RepoContent';
import type { ContributorsObject } from '../model/Contributors';
import { Contributors } from '../model/Contributors';
import type {
  ProjectSkillsObject,
  LanguageGQL
} from './ProjectSkills';
import {
  ProjectSkills
} from './ProjectSkills';
import type { IssuesObject } from './Issues';
import { Issues } from './Issues';
import type { IssueGQL } from './Issue';
import type { OwnerGQL } from './Owner';

import type { CommitsResponse, GitHubRepo } from '../model/GitHub';
import { Commits } from './Commits';
import type { CommitObject } from "./Commit";

// export type RepositoryGQL = {
//   id: string;
//   name: string;
//   description: string;
//   url: string;
//   owner: OwnerGQL;
//   languages: {
//     edges: Array<LanguageGQL>;
//   };
//   issues: {
//     nodes: IssueGQL;
//   };
// };
export interface GitLabOwnerObject {
  id: string | null;
  name: string | null;
  username: string | null;
  public_email: string | null;
  web_url: string | null;
  avatar_url: string | null;
  locked: boolean | null;
  state: string | null;
}

export interface GitLabRepoObject {
  id: string | null;
  description: string | null;
  name: string | null;
  name_with_namespace: string | null;
  path: string | null;
  path_with_namespace: string | null;
  created_at: string | null;
  owner: GitLabOwnerObject | null;
  default_branch: string | null;
  tag_list: string | null;
  topics: Array<string>;
  ssh_url_to_repo: string | null;
  http_url_to_repo: string | null;
  web_url: string | null;
  readme_url: string | null;
  forks_count: number | null;
  avatar_url: string | null;
  star_count: number | null;
  last_activity_at: string | null;
  visibility: string | null;
  repository_storage: string | null;
  marked_for_deletion_at: string | null;
  marked_for_deletion_on: string | null;
  packages_enabled: boolean | null;
  empty_repo: boolean | null;
  archived: boolean | null;
  resolve_outdated_diff_discussions: boolean | null;
  repository_object_format: string | null;
  issues_enabled: boolean | null;
  merge_requests_enabled: boolean | null;
  wiki_enabled: boolean | null;
  jobs_enabled: boolean | null;
  snippets_enabled: boolean | null;
  container_registry_enabled: boolean | null;
  service_desk_enabled: boolean | null;
  service_desk_address: string | null;
  can_create_merge_request_in: boolean | null;
  issues_access_level: boolean | null;
  repository_access_level: boolean | null;
  merge_requests_access_level: boolean | null;
  forking_access_level: boolean | null;
  wiki_access_level: boolean | null;
  builds_access_level: boolean | null;
  snippets_access_level: boolean | null;
  pages_access_level: string | null;
  analytics_access_level: boolean | null;
  container_registry_access_level: boolean | null;
  security_and_compliance_access_level: string | null;
  releases_access_level: boolean | null;
  environments_access_level: boolean | null;
  feature_flags_access_level: boolean | null;
  infrastructure_access_level: boolean | null;
  monitor_access_level: boolean | null;
  model_experiments_access_level: boolean | null;
  model_registry_access_level: boolean | null;
  package_registry_access_level: boolean | null;
  emails_disabled: boolean | null;
  emails_enabled: boolean | null;
  show_diff_preview_in_email: boolean | null;
  shared_runners_enabled: boolean | null;
  lfs_enabled: boolean | null;
  creator_id: number | null;
  import_url: string | null;
  import_type: string | null;
  import_status: string | null;
  open_issues_count: number | null;
  description_html: string | null;
  updated_at: string | null;
  ci_default_git_depth: number | null;
  ci_delete_pipelines_in_seconds: number | null;
  ci_forward_deployment_enabled: boolean | null;
  ci_forward_deployment_rollback_allowed: boolean | null;
  ci_job_token_scope_enabled: boolean | null;
  ci_separated_caches: boolean | null;
  ci_allow_fork_pipelines_to_run_in_parent_project: boolean | null;
  build_git_strategy: string | null;
  keep_latest_artifact: boolean | null;
  restrict_user_defined_variables: boolean | null;
  ci_pipeline_variables_minimum_override_role: string | null;
  runner_token_expiration_interval: string | null;
  group_runners_enabled: boolean | null;
  resource_group_default_process_mode: string | null;
  auto_cancel_pending_pipelines: string | null;
  build_timeout: number | null;
  auto_devops_enabled: boolean | null;
  auto_devops_deploy_strategy: string | null;
  ci_push_repository_for_job_token_allowed: boolean | null;
  protect_merge_request_pipelines: boolean | null;
  ci_display_pipeline_variables: boolean | null;
  runners_token: string | null;
  ci_config_path: string | null;
  public_jobs: boolean | null;
  shared_with_groups: Array<string>;
  only_allow_merge_if_pipeline_succeeds: boolean | null;
  allow_merge_on_skipped_pipeline: null
  request_access_enabled: boolean | null;
  only_allow_merge_if_all_discussions_are_resolved: boolean | null;
  remove_source_branch_after_merge: boolean | null;
  printing_merge_request_link_enabled: boolean | null;
  merge_method: string | null;
  squash_option: string | null;
  enforce_auth_checks_on_uploads: boolean | null;
  suggestion_commit_message: string | null;
  merge_commit_template: string | null;
  squash_commit_template: string | null;
  issue_branch_template: string | null;
  warn_about_potentially_unwanted_characters: boolean | null;
  autoclose_referenced_issues: boolean | null;
  max_artifacts_size: number | null;
  project_access: string | null;
  group_access: string | null;
}

// export class Repo {
//   id: string | null;
//   name: string | null;
//   privacy: boolean;
//   size: number | null;
//   owner: Owner | null;
//   createdAt: string | null;
//   updatedAt: string | null;
//   homepage: string | null;
//   description: string | null;
//   apiURL: string | null;
//   repoURL: string | null;
//   skills: ProjectSkills | null;
//   contents: RepoContents | null;
//   contributorsURL: string | null;
//   contributors: Contributors | null;
//   issues: Issues | null;
//   commits: Commits | null;

//   constructor(data?: RepoObject) {
//     this.id = data?.id ? data.id : null;
//     this.name = data?.name ? data.name : null;
//     this.privacy = data?.privacy ? data?.privacy : false;
//     this.size = data?.size ? data?.size : null;
//     this.owner = data?.owner ? new Owner(data.owner) : null;
//     this.createdAt = data?.created_at ? data?.created_at : null;
//     this.updatedAt = data?.updated_at ? data?.updated_at : null;
//     this.homepage = data?.homepage ? data.homepage : null;
//     this.description = data?.description ? data.description : null;
//     this.apiURL = data?.api_url ? data.api_url : null;
//     this.repoURL = data?.repo_url ? data.repo_url : null;
//     this.skills = data?.skills ? new ProjectSkills(data.skills) : null;
//     this.contents = data?.contents ? new RepoContents(data.contents) : null;
//     this.contributorsURL = data?.contributors_url
//       ? data.contributors_url
//       : null;
//     this.contributors = data?.contributors
//       ? new Contributors(data.contributors)
//       : null;
//     this.issues =
//       data?.issues && Array.isArray(data.issues.list) && data.issues.list.length > 0
//         ? new Issues(data.issues)
//         : null;
//     this.commits = data?.commits && data.commits.length > 0 ? new Commits(data?.commits) : null;
//   }

//   fromGitHubGraphQL(repo: RepositoryGQL) {
//     this.id = repo.id;
//     this.name = repo.name;
//     this.description = repo.description;
//     this.repoURL = repo.url;

//     let owner = null;

//     if (repo.owner) {
//       owner = new Owner();
//       owner.fromGitHubGraphQL(repo.owner);
//     }

//     this.owner = owner;

//     let issues = null;

//     if (Array.isArray(repo.issues.nodes) && repo.issues.nodes.length > 0) {
//       issues = new Issues();
//       issues.fromGitHubGraphQL(repo.issues.nodes);
//     }

//     this.issues = issues;

//     let skills = null;

//     if (
//       repo.languages &&
//       repo.languages.edges &&
//       Array.isArray(repo.languages.edges) &&
//       repo.languages.edges.length > 0
//     ) {
//       skills = new ProjectSkills();
//       skills.fromGitHubGraphQL(repo.languages.edges);
//     }

//     this.skills = skills;
//   }

//   fromGitHub(response: GitHubRepo) {
//     this.id = response?.name;
//     this.name = response.name;
//     this.privacy = response?.private;
//     this.size = response?.size;
//     this.owner = response?.owner ? new Owner(response.owner) : null;
//     this.createdAt = response?.created_at;
//     this.updatedAt = response?.pushed_at;
//     this.homepage = response?.homepage;
//     this.description = response?.description;
//     this.apiURL = response?.url;
//     this.repoURL = response?.html_url;
//     this.contributorsURL = response?.contributors_url;
//   }

//   getOwner(data: Record<string, any>) {
//     if (typeof data === 'object') {
//       return data.login;
//     }

//     if (typeof data === 'string') {
//       return data;
//     }

//     return '';
//   }

//   setSkills(projectSkills: ProjectSkills) {
//     this.skills = projectSkills;
//   }

//   setContents(contentsObject: Record<string, any>) {
//     if (
//       contentsObject &&
//       (contentsObject.solution ||
//         contentsObject.design ||
//         contentsObject.development ||
//         contentsObject.delivery ||
//         contentsObject.problem ||
//         contentsObject.details ||
//         contentsObject.story)
//     ) {
//       this.contents ? this.contents : (this.contents = new RepoContents());

//       this.contents.setSolution(new RepoContent(contentsObject.solution));
//       this.contents.setDesign(new RepoContent(contentsObject.design));
//       this.contents.setDevelopment(new RepoContent(contentsObject.development));
//       this.contents.setDelivery(new RepoContent(contentsObject.delivery));
//       this.contents.setProblem(new RepoContent(contentsObject.problem));
//       this.contents.setDetails(new RepoContent(contentsObject.details));
//       this.contents.setStory(new RepoContent(contentsObject.story));
//     }
//   }

//   filterContents(contentsObject: Array<Record<string, any>>) {
//     if (Array.isArray(contentsObject) && contentsObject.length > 0) {
//       contentsObject.forEach((content) => {
//         this.contents ? this.contents : (this.contents = new RepoContents());

//         if (content.type === 'file' && content.size > 7) {
//           switch (content.name) {
//             case 'TheSolution.md':
//               this.contents.setSolution(new RepoContent(content));
//               break;
//             case 'Design.md':
//               this.contents.setDesign(new RepoContent(content));
//               break;
//             case 'Development.md':
//               this.contents.setDevelopment(new RepoContent(content));
//               break;
//             case 'Delivery.md':
//               this.contents.setDelivery(new RepoContent(content));
//               break;
//             case 'TheProblem.md':
//               this.contents.setProblem(new RepoContent(content));
//               break;
//             case 'Details.md':
//               this.contents.setDetails(new RepoContent(content));
//               break;
//             case 'Story.md':
//               this.contents.setStory(new RepoContent(content));
//               break;
//           }
//         }
//       });
//     }
//   }

//   setContributors(contributors: Contributors) {
//     this.contributors = contributors;
//   }

//   setIssues(issues: Issues) {
//     this.issues = issues;
//   }

//   setCommits(commits: Commits) {
//     this.commits = commits;
//   }

//   toRepoObject(): RepoObject {
//     return {
//       id: this.id,
//       name: this.name,
//       privacy: this.privacy,
//       size: this.size,
//       owner: this.owner ? this.owner.toOwnerObject() : null,
//       created_at: this.createdAt,
//       updated_at: this.updatedAt,
//       homepage: this.homepage,
//       description: this.description,
//       api_url: this.apiURL,
//       repo_url: this.repoURL,
//       skills: this.skills ? this.skills.toProjectSkillsObject() : null,
//       contents: this.contents ? this.contents.toRepoContentsObject() : null,
//       contributors_url: this.contributorsURL,
//       contributors: this.contributors
//         ? this.contributors.toContributorsObject()
//         : null,
//       issues: this.issues ? this.issues.toIssuesObject() : null,
//       commits: this.commits ? this.commits.toCommitsObject() : null
//     };
//   }
// }
