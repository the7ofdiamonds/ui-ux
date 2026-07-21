import type {
  ProjectSolutionDataObject,
  ProjectSolutionObject
} from './ProjectSolution';
import {
  ProjectSolution
} from './ProjectSolution';
import type {
  ProjectProcessDataObject,
  ProjectProcessObject
} from './ProjectProcess';
import {
  ProjectProcess
} from './ProjectProcess';
import type {
  ProjectProblemDataObject,
  ProjectProblemObject
} from './ProjectProblem';
import {
  ProjectProblem
} from './ProjectProblem';
import type {
  ProjectDetailsDataObject,
  ProjectDetailsObject
} from './ProjectDetails';
import {
  ProjectDetails
} from './ProjectDetails';
import { Repo } from './Repo';
import type { OwnerObject } from './Owner';
import { Owner } from './Owner';
import { ProjectQuery, type ProjectQueryObject } from './ProjectQuery';

export type ProjectObject = {
  id: string | number | null;
  name: string | null;
  title: string | null;
  subtitle: string | null;
  promotional_text: string | null;
  description: string | null;
  solution: ProjectSolutionObject | null;
  process: ProjectProcessObject | null;
  problem: ProjectProblemObject | null;
  owner: Partial<OwnerObject> | null;
  details: ProjectDetailsObject | null;
  query: ProjectQueryObject | null;
  path: string | null;
};

export type ProjectDataObject = {
  id: string | number | null;
  title: string | null;
  subtitle: string | null;
  promotional_text: string | null;
  solution: ProjectSolutionDataObject | null;
  process: ProjectProcessDataObject | null;
  problem: ProjectProblemDataObject | null;
  owner: OwnerObject | null;
  details: ProjectDetailsDataObject | null;
};

export class Project {
  id: string | number | null;
  name: string | null;
  title: string | null;
  subtitle: string | null;
  promotionalText: string | null;
  description: string | null;
  solution: ProjectSolution | null;
  process: ProjectProcess | null;
  problem: ProjectProblem | null;
  owner: Owner | null;
  details: ProjectDetails | null;
  query: ProjectQuery | null;
  path: string | null;

  constructor(data?: Partial<ProjectObject>) {
    try {
      this.id = data?.id ? data.id : null;
      this.name = data?.name ? data.name : null;
      this.title = data?.title
        ? data.title
        : data?.name
          ? this.getTitle(data.name)
          : null;
      this.subtitle = data?.subtitle ?? null;
      this.promotionalText = data?.promotional_text ?? null;
      this.description = data?.description ?? null;
      this.solution = data?.solution
        ? new ProjectSolution(data.solution)
        : null;
      this.process = data?.process ? new ProjectProcess(data.process) : null;
      this.owner = data?.owner ? new Owner(data.owner) : new Owner();
      this.details = data?.details ? new ProjectDetails(data.details) : null;
      this.problem = data?.problem ? new ProjectProblem(data?.problem) : null;
      this.query = data?.query ? new ProjectQuery(data?.query) : null;
      this.path = data?.path ?? null;
    } catch (error) {
      let err = error as Error;
      throw new Error(err.message);
    }
  }

  setID(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  }

  setTitle(title: string) {
    this.title = this.getTitle(title);
  }

  setSubtitle(subtitle: string) {
    this.subtitle = subtitle;
  }

  setPromotionalText(promotionalText: string) {
    this.promotionalText = promotionalText;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setSolution(solution: ProjectSolution) {
    this.solution = solution;
  }

  setProcess(process: ProjectProcess) {
    this.process = process;
  }

  setProblem(problem: ProjectProblem) {
    this.problem = problem;
  }

  setOwner(owner: Owner) {
    this.owner = owner;
  }

  setDetails(details: ProjectDetails) {
    this.details = details;
  }

  setQuery(query: ProjectQuery) {
    this.query = query;
  }

  setPath(path: string) {
    this.path = path;
  }

  getTitle(id: string | null): string {
    return id
      ? id
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
      : 'Untitled Project';
  }

  update(project: Project) {
    Object.assign(this, project);
  }

  fromRepo(repo: Repo) {
    this.id = repo.id;
    this.name = repo.name;
    this.title = repo.name
      ? this.getTitle(repo.name)
      : null;
    this.description = repo.description;

    if (repo.owner) {
      this.setOwner(repo.owner);
    }

    if (
      repo.contents?.solution?.downloadURL ||
      repo?.homepage ||
      repo?.issues
    ) {
      const solution = new ProjectSolution();
      solution.fromRepo(repo);
      this.setSolution(solution);
    }

    if (
      repo.createdAt ||
      repo.updatedAt ||
      repo.contents?.design?.downloadURL ||
      repo.contents?.development?.downloadURL ||
      repo.contents?.delivery?.downloadURL ||
      repo.issues ||
      repo.skills ||
      repo.repoURL ||
      repo.commits
    ) {
      const process = new ProjectProcess();
      process.fromRepo(repo);
      this.setProcess(process);
    }

    if (repo.contents?.problem?.downloadURL) {
      const problem = new ProjectProblem();
      problem.fromRepo(repo);
      this.setProblem(problem);
    }

    if (
      repo.contents?.details?.downloadURL ||
      repo.contents?.story?.downloadURL ||
      repo.size ||
      repo.contributors
    ) {
      const details = new ProjectDetails();
      details.fromRepo(repo);
      this.setDetails(details);
    }

    if (repo?.owner) {
      const query = new ProjectQuery();
      query.fromRepo(repo);
      this.query = query;
      this.path = repo?.path ? `portfolio/${repo.path}` : null;
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data?.title) {
      this.title = data.title;
    }

    if (data?.solution) {
      this.solution ? this.solution : (this.solution = new ProjectSolution());
      this.solution.fromDocumentData(data);
    }

    if (data?.process) {
      this.process ? this.process : (this.process = new ProjectProcess());
      this.process.fromDocumentData(data);
    }

    if (data?.problem) {
      this.problem ? this.problem : (this.problem = new ProjectProblem());
      this.problem.fromDocumentData(data);
    }

    if (data?.details) {
      this.details ? this.details : (this.details = new ProjectDetails());
      this.details.fromDocumentData(data);
    }
  }

  toProjectObject(): ProjectObject {
    return {
      id: this.id,
      name: this.name,
      title: this.title,
      subtitle: this.subtitle,
      promotional_text: this.promotionalText,
      description: this.description,
      solution: this.solution ? this.solution.toProjectSolutionObject() : null,
      process: this.process ? this.process.toProjectProcessObject() : null,
      problem: this.problem ? this.problem.toProjectProblemObject() : null,
      details: this.details ? this.details.toDetailsObject() : null,
      owner: this.owner ? this.owner.toOwnerObject() : null,
      query: this.query ? this.query.toProjectQueryObject() : null,
      path: this.path,
    };
  }

  toProjectDataObject(): ProjectDataObject {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      promotional_text: this.promotionalText,
      solution: this.solution
        ? this.solution.toProjectSolutionDataObject()
        : null,
      process: this.process ? this.process.toProjectProcessDataObject() : null,
      problem: this.problem ? this.problem.toProjectProblemDataObject() : null,
      details: this.details ? this.details.toDetailsDataObject() : null,
      owner: this.owner ? this.owner.toOwnerObject() : null,
    };
  }
}
