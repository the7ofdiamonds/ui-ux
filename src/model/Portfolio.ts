import type { ProjectObject } from '../model/Project';
import { Project } from '../model/Project';
import { Repo } from '../model/Repo';
import { Repos } from '../model/Repos';
import type { ProjectQuery } from './ProjectQuery';

export type PortfolioObject = {
  projects: Array<ProjectObject> | null;
};

export class Portfolio {
  projects: Set<Project>;
  size: number;

  constructor(data?: PortfolioObject) {
    this.projects =
      data?.projects && data.projects.length > 0
        ? new Set(data.projects.map((project) => new Project(project)))
        : new Set();
    this.size = this.getCount();
  }

  setProjects(projects: Set<Project>) {
    this.projects = projects;
  }

  setSize(size: number) {
    this.size = size;
  }

  getProjects(repos: Array<Repo>) {
    let projects: Set<Project> = new Set();

    repos.forEach((repo) => {
      const project = new Project();
      project.fromRepo(repo);
      projects.add(project);
    });

    return projects;
  }

  getCount() {
    return this.projects.size;
  }

  filterProjects(taxonomy: string, term: string): Set<Project> {
    try {
      let updatedProjects: Set<Project> = new Set();

      if (!taxonomy || !term) {
        console.error({ "taxonomy": taxonomy, "term": term })
        console.error("Either the taxonomy or term is null")
        return updatedProjects;
      }

      if (this.projects.size === 0) throw new Error("No projects to search.");

      for (const project of Array.from(this.projects)) {
        const skills = project?.process?.development?.skills;

        if (!skills) continue;

        if (
          taxonomy === 'project-type' &&
          skills?.types &&
          skills.types.size > 0
        ) {
          skills.types.forEach((type) => {
            if (type.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy == 'language' &&
          skills?.languages &&
          skills.languages.size > 0
        ) {
          skills.languages.forEach((language) => {
            if (language.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'framework' &&
          skills?.frameworks &&
          skills.frameworks.size > 0
        ) {
          skills.frameworks.forEach((framework) => {
            if (framework.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'technology' &&
          skills?.technologies &&
          skills.technologies.size > 0
        ) {
          skills.technologies.forEach(
            (technology) => {
              if (technology.id === term) {
                updatedProjects.add(project);
              }
            }
          );
        }

        if (
          taxonomy === 'software' &&
          skills?.softwareApplications &&
          skills.softwareApplications.size > 0
        ) {
          skills.softwareApplications.forEach((software) => {
            if (software.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'database' &&
          skills?.databases &&
          skills.databases.size > 0
        ) {
          skills.databases.forEach((database) => {
            if (database.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'builder' &&
          skills?.buildTools &&
          skills.buildTools.size > 0
        ) {
          skills.buildTools.forEach((builder) => {
            if (builder.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'server' &&
          skills?.servers &&
          skills.servers.size > 0
        ) {
          skills.servers.forEach((server) => {
            if (server.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'cicd' &&
          skills?.cicdTools &&
          skills.cicdTools.size > 0
        ) {
          skills.cicdTools.forEach((cicdTool) => {
            if (cicdTool.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'platform' &&
          skills?.platforms &&
          skills.platforms.size > 0
        ) {
          skills.platforms.forEach((platform) => {
            if (platform.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'cloud' &&
          skills?.cloudProviders &&
          skills.cloudProviders.size > 0
        ) {
          skills.cloudProviders.forEach((cloud) => {
            if (cloud.id === term) {
              updatedProjects.add(project);
            }
          });
        }
      };

      return updatedProjects;
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  }

  filterProjectByID(id: string): Project | null {
    let filteredProject = null;

    this.projects.forEach((project) => {
      if (project.id == id) {
        console.log(project.id)
        filteredProject = project;
      }
    });

    return filteredProject;
  }

  filterProject(query: ProjectQuery): Project | null {
    let filteredProject = null;

    this.projects.forEach((project) => {
      if (project.query?.owner === query.owner && project.query?.repo === query.repo) {
        filteredProject = project;
      }
    });

    return filteredProject;
  }

  filterProjectsByLogin(login: string): Set<Project> {
    let updatedProjects: Set<Project> = new Set();

    if (login) {
      Array.from(this.projects).forEach((project: Project) => {
        if (project?.owner?.login === login) {
          updatedProjects.add(project);
        }
      });
    }

    return updatedProjects;
  }

  filterProjectsByPath(path: string): Set<Project> | Project {
    let updatedProjects: Set<Project> = new Set();

    if (path) {
      Array.from(this.projects).forEach((project: Project) => {
        if (`/${project?.path}` === path) {
          updatedProjects.add(project);
        }
      });

      if (updatedProjects.size === 1) {
        return Array.from(updatedProjects)[0];
      } else {
        console.warn(`Multiple projects found for path: ${path}. Returning all matching projects.`);
        return updatedProjects;
      }
    }

    return updatedProjects;
  }

  filterProjectsByQuery(projectQuery: ProjectQuery): Project | null {
    return this.filterProject(projectQuery);
  }

  addProject(project: Project) {
    if (!(project instanceof Project) || !project?.query) return;
    const existing = this.filterProject(project.query);

    if (existing) {
      existing.update(project);
      this.projects.add(existing);
    } else {
      this.projects.add(project);
    }
  }

  addProjectObject(project: ProjectObject) {
    this.addProject(new Project(project));
  }

  addProjectObjects(projects: Array<ProjectObject>) {
    projects.forEach((project) => this.addProjectObject(project))
  }

  addProjects(projects: Set<Project>) {
    projects.forEach((project) => this.addProject(project))
  }

  fromRepos(repos: Repos) {
    if (
      repos &&
      repos.collection &&
      Array.isArray(repos.collection) &&
      repos.collection.length > 0
    ) {
      const projects = this.getProjects(repos.collection);
      this.setProjects(projects);
      this.setSize(projects.size);
    }
  }

  toPortfolioObject(): PortfolioObject {
    return {
      projects: this.projects
        ? Array.from(this.projects).map((project) => project.toProjectObject())
        : null,
    };
  }
}
