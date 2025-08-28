import { useNavigate } from 'react-router-dom';
import { SkillObject, Skill } from '@/model/Skill';
import {
  ProjectType,
  Software,
  Database,
  Framework,
  Language,
  Technology,
  Builder,
  Server,
  CICD,
  Platform,
  Cloud,
} from './Skill';
import { ProjectSkill } from './ProjectSkill';
import { ProjectSkills } from './ProjectSkills';
import { getSkillsFrom, getSkillsOfType } from './ISkills';
import { Taxonomy } from './Taxonomy';

export interface ISKills<T> {
  list: Array<ProjectSkill | Skill>;
  types: Set<ProjectType>;
  softwareApplications: Set<Software>;
  databases: Set<Database>;
  languages: Set<Language>;
  frameworks: Set<Framework>;
  technologies: Set<Technology>;
  buildTools: Set<Builder>;
  servers: Set<Server>;
  cicdTools: Set<CICD>;
  platforms: Set<Platform>;
  cloudProviders: Set<Cloud>;
  count: number;
  getProjectTypes: (data: Array<T>) => Set<ProjectType>;
  getSoftwareApplications: (data: Array<T>) => Set<Software>;
  getDatabases: (data: Array<T>) => Set<Database>;
  getLanguages: (data: Array<T>) => Set<Language>;
  getFrameworks: (data: Array<T>) => Set<Framework>;
  getTechnologies: (data: Array<T>) => Set<Technology>;
  getBuildTools: (data: Array<T>) => Set<Builder>;
  getServers: (data: Array<T>) => Set<Server>;
  getCICDTools: (data: Array<T>) => Set<CICD>;
  getPlatforms: (data: Array<T>) => Set<Platform>;
  getCloudProviders: (data: Array<T>) => Set<Cloud>;
}

export type SkillsObject = {
  list: Array<SkillObject> | null;
};

export type SkillsDataObject = {
  list: Array<string> | null;
};

export class Skills implements ISKills<SkillObject> {
  list: Array<Skill> = [];
  types: Set<ProjectType> = new Set();
  softwareApplications: Set<Software> = new Set();
  databases: Set<Database> = new Set();
  languages: Set<Language> = new Set();
  frameworks: Set<Framework> = new Set();
  technologies: Set<Technology> = new Set();
  buildTools: Set<Builder> = new Set();
  servers: Set<Server> = new Set();
  cicdTools: Set<CICD> = new Set();
  platforms: Set<Platform> = new Set();
  cloudProviders: Set<Cloud> = new Set();
  count: number = 0;

  constructor(data?: SkillsObject) {
    this.list =
      data && data.list && data.list.length > 0
        ? data.list.map((skill) => {
            return new Skill(skill);
          })
        : [];
    this.count = this.list.length;

    if (data && data.list && data.list.length > 0) {
      this.types = this.getProjectTypes(data.list);
      this.softwareApplications = this.getSoftwareApplications(data.list);
      this.databases = this.getDatabases(data.list);
      this.languages = this.getLanguages(data.list);
      this.frameworks = this.getFrameworks(data.list);
      this.technologies = this.getTechnologies(data.list);
      this.buildTools = this.getBuildTools(data.list);
      this.servers = this.getServers(data.list);
      this.cicdTools = this.getCICDTools(data.list);
      this.platforms = this.getPlatforms(data.list);
      this.cloudProviders = this.getCloudProviders(data.list);
    }

    this.types = this.getProjectTypesFromList();
    this.softwareApplications = this.getSoftwareApplicationsFromList();
    this.databases = this.getDatabaseFromList();
    this.languages = this.getLanguagesFromList();
    this.frameworks = this.getFrameworksFromList();
    this.technologies = this.getTechnologiesFromList();
    this.buildTools = this.getBuildToolsFromList();
    this.servers = this.getServersFromList();
    this.cicdTools = this.getCICDFromList();
    this.platforms = this.getPlatformFromList();
    this.cloudProviders = this.getCloudFromList();
  }

  getProjectTypes(data: Array<SkillObject>) {
    return getSkillsFrom<ProjectType>(data, ProjectType);
  }

  getSoftwareApplications(data: Array<SkillObject>) {
    return getSkillsFrom<Software>(data, Software);
  }

  getDatabases(data: Array<SkillObject>) {
    return getSkillsFrom<Database>(data, Database);
  }

  getLanguages(data: Array<SkillObject>) {
    return getSkillsFrom<Language>(data, Language);
  }

  getFrameworks(data: Array<SkillObject>) {
    return getSkillsFrom<Framework>(data, Framework);
  }

  getTechnologies(data: Array<SkillObject>) {
    return getSkillsFrom<Technology>(data, Technology);
  }

  getBuildTools(data: Array<SkillObject>) {
    return getSkillsFrom<Builder>(data, Builder);
  }

  getServers(data: Array<SkillObject>) {
    return getSkillsFrom<Server>(data, Server);
  }

  getCICDTools(data: Array<SkillObject>) {
    return getSkillsFrom<CICD>(data, CICD);
  }

  getPlatforms(data: Array<SkillObject>) {
    return getSkillsFrom<Platform>(data, Platform);
  }

  getCloudProviders(data: Array<SkillObject>) {
    return getSkillsFrom<Cloud>(data, Cloud);
  }

  getProjectTypesFromList() {
    return getSkillsOfType<ProjectType, SkillObject>(this.list, ProjectType);
  }

  getSoftwareApplicationsFromList() {
    return getSkillsOfType<Software, SkillObject>(this.list, Software);
  }

  getDatabaseFromList() {
    return getSkillsOfType<Database, SkillObject>(this.list, Database);
  }

  getLanguagesFromList() {
    return getSkillsOfType<Language, SkillObject>(this.list, Language);
  }

  getFrameworksFromList() {
    return getSkillsOfType<Framework, SkillObject>(this.list, Framework);
  }

  getTechnologiesFromList() {
    return getSkillsOfType<Technology, SkillObject>(this.list, Technology);
  }

  getBuildToolsFromList() {
    return getSkillsOfType<Builder, SkillObject>(this.list, Builder);
  }

  getServersFromList() {
    return getSkillsOfType<Server, SkillObject>(this.list, Server);
  }

  getCICDFromList() {
    return getSkillsOfType<CICD, SkillObject>(this.list, CICD);
  }

  getPlatformFromList() {
    return getSkillsOfType<Platform, SkillObject>(this.list, Platform);
  }

  getCloudFromList() {
    return getSkillsOfType<Cloud, SkillObject>(this.list, Cloud);
  }

  existsInSet(skills: Set<Skill>, skill: Skill): boolean {
    const map = new Map(Array.from(skills).map((skill) => [skill.id, skill]));

    return map.has(skill.id);
  }

  filter(term: string): Skill {
    return this.list.find((skill) => skill.id === term) ?? new Skill();
  }

  fromProjectSkills(projectSkills: ProjectSkills) {
    if (projectSkills.list && projectSkills.list.length > 0) {
      const skills = new Skills();

      const projectTypes = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'project_type'
      );

      if (projectTypes.length > 0) {
        projectTypes.forEach((type) => {
          Array.from(this.types).forEach((skill) => {
            if (skill.id === type.id) {
              skills.types.add(skill);
            }
          });
        });
      }

      const softwareApplications = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'software'
      );

      if (softwareApplications.length > 0) {
        softwareApplications.forEach((software) => {
          Array.from(this.softwareApplications).forEach((skill) => {
            if (skill.id === software.id) {
              skills.softwareApplications.add(skill);
            }
          });
        });
      }
            console.log(projectSkills)

      const databases = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'database'
      );

      if (databases.length > 0) {
        databases.forEach((database) => {
          Array.from(this.databases).forEach((skill) => {
            if (skill.id === database.id) {
              skills.databases.add(skill);
            }
          });
        });
      }

      const langs = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'language'
      );

      if (langs.length > 0) {
        langs.forEach((language) => {
          Array.from(this.languages).forEach((lang) => {
            if (lang.id === language.id) {
              skills.languages.add(lang);
            }
          });
        });
      }

      const frameworks = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'framework'
      );

      if (frameworks.length > 0) {
        frameworks.forEach((framework) => {
          Array.from(this.frameworks).forEach((skill) => {
            if (skill.id === framework.id) {
              skills.frameworks.add(skill);
            }
          });
        });
      }

      const technologies = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'technology'
      );

      if (technologies.length > 0) {
        technologies.forEach((technology) => {
          Array.from(this.technologies).forEach((skill) => {
            if (skill.id === technology.id) {
              skills.technologies.add(skill);
            }
          });
        });
      }

      const buildTools = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'builder'
      );

      if (buildTools.length > 0) {
        buildTools.forEach((builder) => {
          Array.from(this.buildTools).forEach((skill) => {
            if (skill.id === builder.id) {
              skills.buildTools.add(skill);
            }
          });
        });
      }

      const servers = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'server'
      );

      if (servers.length > 0) {
        servers.forEach((server) => {
          Array.from(this.servers).forEach((skill) => {
            if (skill.id === server.id) {
              skills.servers.add(skill);
            }
          });
        });
      }

      const cicdTools = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'cicd'
      );

      if (cicdTools.length > 0) {
        cicdTools.forEach((tool) => {
          Array.from(this.cicdTools).forEach((skill) => {
            if (skill.id === tool.id) {
              skills.cicdTools.add(skill);
            }
          });
        });
      }

      const platforms = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'platform'
      );

      if (platforms.length > 0) {
        platforms.forEach((platform) => {
          Array.from(this.platforms).forEach((skill) => {
            if (skill.id === platform.id) {
              skills.platforms.add(skill);
            }
          });
        });
      }

      const cloudProviders = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'cloud'
      );

      if (cloudProviders.length > 0) {
        cloudProviders.forEach((provider) => {
          Array.from(this.cloudProviders).forEach((skill) => {
            if (skill.id === provider.id) {
              skills.cloudProviders.add(skill);
            }
          });
        });
      }

      return skills;
    }

    return null;
  }

  toSkillsObject(): SkillsObject {
    return {
      list:
        this.list && this.list.length > 0
          ? this.list.map((skill) => skill.toSkillObject())
          : null,
    };
  }

  toSkillsDataObject(): SkillsDataObject {
    return {
      list:
        this.list && this.list.length > 0
          ? this.list
              .map((projectSkill) => projectSkill.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
    };
  }
}

export const isSkillsObject = (val: any): val is SkillsObject => {
  return val && typeof val === 'object' && Array.isArray(val.list);
};

export const handleSkills = () => {
  const skillsElement = document.getElementById('top');

  if (skillsElement) {
    skillsElement.scrollIntoView({ behavior: 'smooth' });
  }
};

export const useHandleSkillClick = () => {
  const navigate = useNavigate();

  return (skill: Taxonomy) => {
    handleSkills();
    navigate(`/taxonomy${skill.path}`);
  };
};
