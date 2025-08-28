import { Project, ProjectObject } from '@/model/Project';
import { Repo } from '@/model/Repo';
import { Repos } from '@/model/Repos';

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
    let updatedProjects: Set<Project> = new Set();

    if (taxonomy && term) {
      Array.from(this.projects).forEach((project: Project) => {
        if (
          taxonomy === 'project-type' &&
          project?.process?.development?.skills?.types
        ) {
          project.process.development.skills.types.forEach((type) => {
            if (type.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy == 'language' &&
          project?.process?.development?.skills?.languages
        ) {
          project.process.development.skills.languages.forEach((language) => {
            if (language.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'framework' &&
          project?.process?.development?.skills?.frameworks
        ) {
          project.process.development.skills.frameworks.forEach((framework) => {
            if (framework.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'technology' &&
          project?.process?.development?.skills?.technologies
        ) {
          project.process.development.skills.technologies.forEach(
            (technology) => {
              if (technology.id === term) {
                updatedProjects.add(project);
              }
            }
          );
        }

        if (
          taxonomy === 'software' &&
          project?.process?.development?.skills?.softwareApplications
        ) {
          project.process.development.skills.softwareApplications.forEach((software) => {
            if (software.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'database' &&
          project?.process?.development?.skills?.databases
        ) {
          project.process.development.skills.databases.forEach((database) => {
            if (database.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'builder' &&
          project?.process?.development?.skills?.buildTools
        ) {
          project.process.development.skills.buildTools.forEach((builder) => {
            if (builder.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'server' &&
          project?.process?.development?.skills?.servers
        ) {
          project.process.development.skills.servers.forEach((server) => {
            if (server.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'cicd' &&
          project?.process?.development?.skills?.cicdTools
        ) {
          project.process.development.skills.cicdTools.forEach((cicdTool) => {
            if (cicdTool.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'platform' &&
          project?.process?.development?.skills?.platforms
        ) {
          project.process.development.skills.platforms.forEach((platform) => {
            if (platform.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'cloud' &&
          project?.process?.development?.skills?.cloudProviders
        ) {
          project.process.development.skills.cloudProviders.forEach((cloud) => {
            if (cloud.id === term) {
              updatedProjects.add(project);
            }
          });
        }
      });
    }

    return updatedProjects;
  }

  filterProject(name: string): Project | null {
    let filteredProject = null;

    this.projects.forEach((project) => {
      if (project.name == name) {
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
