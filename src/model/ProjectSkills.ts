import { ProjectSkill, ProjectSkillObject } from '@/model/ProjectSkill';
import { Service } from './Service';
import {
  Builder,
  CICD,
  Cloud,
  Database,
  Framework,
  Language,
  Platform,
  ProjectType,
  Server,
  Skill,
  Software,
  Technology,
} from '@/model/Skill';
import { ISKills } from '@/model/Skills';
import { getSkillsFrom } from '@/model/ISkills';
import { ProjectDataObject } from './Project';

export type LanguageGQL = {
  size: number;
  node: {
    name: string;
    color: string;
  };
};

export type ProjectSkillsObject = {
  list: Array<ProjectSkillObject> | null;
};

export type ProjectSkillsDataObject = {
  types: Array<string> | null;
  software_applications: Array<string> | null;
  databases: Array<string> | null;
  languages: Array<string> | null;
  frameworks: Array<string> | null;
  technologies: Array<string> | null;
  build_tools: Array<string> | null;
  servers: Array<string> | null;
  cicd_tools: Array<string> | null;
  platforms: Array<string> | null;
  cloud_providers: Array<string> | null;
};

export class ProjectSkills implements ISKills<ProjectSkillObject> {
  list: Array<ProjectSkill> = [];
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

  constructor(data?: ProjectSkillsObject) {
    if (data && data.list && data.list.length > 0) {
      this.list = data.list.map(
        (projectSkill) => new ProjectSkill(projectSkill)
      );
      this.count = this.list.length;

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
  }

  setProjectTypes(types: Set<ProjectType>) {
    this.types = types;
  }

  setSoftwareApplications(softwareApplications: Set<Software>) {
    this.softwareApplications = softwareApplications;
  }

  setDatabases(databases: Set<Database>) {
    this.databases = databases;
  }

  setLanguages(languages: Set<Language>) {
    this.languages = languages;
  }

  setFrameworks(frameworks: Set<Framework>) {
    this.frameworks = frameworks;
  }

  setTechnologies(technologies: Set<Technology>) {
    this.technologies = technologies;
  }

  setBuildTools(buildTools: Set<Builder>) {
    this.buildTools = buildTools;
  }

  setServer(servers: Set<Server>) {
    this.servers = servers;
  }

  setCICDTools(cicdTools: Set<CICD>) {
    this.cicdTools = cicdTools;
  }

  setPlatforms(platforms: Set<Platform>) {
    this.platforms = platforms;
  }

  setCloud(cloudProviders: Set<Cloud>) {
    this.cloudProviders = cloudProviders;
  }

  getProjectTypes(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<ProjectType>(data, ProjectType);
  }

  getSoftwareApplications(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<Software>(data, Software);
  }

  getDatabases(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<Database>(data, Database);
  }

  getLanguages(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<Language>(data, Language);
  }

  getFrameworks(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<Framework>(data, Framework);
  }

  getTechnologies(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<Technology>(data, Technology);
  }

  getBuildTools(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<Builder>(data, Builder);
  }

  getServers(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<Server>(data, Server);
  }

  getCICDTools(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<CICD>(data, CICD);
  }

  getPlatforms(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<Platform>(data, Platform);
  }

  getCloudProviders(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<Cloud>(data, Cloud);
  }

  existsInSet(skills: Set<Skill>, skill: Skill): boolean {
    const map = new Map(Array.from(skills).map((skill) => [skill.id, skill]));

    return map.has(skill.id);
  }

  getProjectSkill(language: string, usage: number): ProjectSkill {
    let skill: ProjectSkill | null = null;

    switch (language) {
      case 'Dockerfile':
        skill = new ProjectSkill();
        skill.setID('docker');
        skill.setType('platform');
        skill.setTitle('Docker');
        break;

      case 'SCSS':
        skill = new ProjectSkill();
        skill.setID('sass');
        skill.setType('language');
        skill.setTitle('Sass');
        break;

      case 'hack':
        skill = new ProjectSkill();
        skill.setID('hack');
        skill.setType('language');
        skill.setTitle('Hack');
        break;

      default:
        skill = new ProjectSkill();
        skill.setID(language.toLowerCase());
        skill.setType('language');
        skill.setTitle(language.toUpperCase());
    }

    if (skill) {
      skill.setUsage(usage);
    }

    return skill;
  }

  fromGitHubGraphQL(languages: Array<LanguageGQL>) {
    if (Array.isArray(languages) && languages.length > 0) {
      languages.forEach((language) => {
        const name = language.node.name;
        const usage = language.size;
        const skill = this.getProjectSkill(name, usage);

        if (skill) {
          this.list.push(skill);
        }
      });
    }
  }

  languagesFromGithub(data: Array<Record<string, any>>) {
    if (!Array.isArray(data) || data.length === 0) return;

    data.forEach(({ language, usage }) => {
      const skill: ProjectSkill | null = this.getProjectSkill(language, usage);

      if (skill) {
        this.list.push(skill);
      }
    });
  }

  fromDocumentData(data?: ProjectDataObject) {
    if (data?.process?.development?.skills) {
      if (data.process?.development?.skills?.types) {
        data.process.development.skills.types.forEach((skillID) => {
          const projectType = new ProjectType();
          projectType.setID(skillID);
          this.types.add(projectType);
          const projectSkill = new ProjectSkill();
          projectSkill.setID(skillID);
          projectSkill.setType(projectType.type);
          this.list.push(projectSkill);
        });
      }

      if (data.process?.development?.skills?.software_applications) {
        data.process.development.skills.software_applications.forEach(
          (skillID) => {
            const software = new Software();
            software.setID(skillID);
            this.softwareApplications.add(software);
            const projectSkill = new ProjectSkill();
            projectSkill.setID(skillID);
            projectSkill.setType(software.type);
            this.list.push(projectSkill);
          }
        );
      }

      if (data.process?.development?.skills?.databases) {
        data.process.development.skills.databases.forEach((skillID) => {
          const database = new Database();
          database.setID(skillID);
          this.databases.add(database);
          const projectSkill = new ProjectSkill();
          projectSkill.setID(skillID);
          projectSkill.setType(database.type);
          this.list.push(projectSkill);
        });
      }

      if (data.process?.development?.skills?.languages) {
        data.process.development.skills.languages.forEach((skillID) => {
          const language = new Language();
          language.setID(skillID);
          this.languages.add(language);
          const projectSkill = new ProjectSkill();
          projectSkill.setID(skillID);
          projectSkill.setType(language.type);
          this.list.push(projectSkill);
        });
      }

      if (data.process?.development?.skills?.frameworks) {
        data.process.development.skills.frameworks.forEach((skillID) => {
          const framework = new Framework();
          framework.setID(skillID);
          this.frameworks.add(framework);
          const projectSkill = new ProjectSkill();
          projectSkill.setID(skillID);
          projectSkill.setType(framework.type);
          this.list.push(projectSkill);
        });
      }

      if (data.process?.development?.skills?.technologies) {
        data.process.development.skills.technologies.forEach((skillID) => {
          const technology = new Technology();
          technology.setID(skillID);
          this.technologies.add(technology);
          const projectSkill = new ProjectSkill();
          projectSkill.setID(skillID);
          projectSkill.setType(technology.type);
          this.list.push(projectSkill);
        });
      }

      if (data.process?.development?.skills?.build_tools) {
        data.process.development.skills.build_tools.forEach((skillID) => {
          const builder = new Builder();
          builder.setID(skillID);
          this.buildTools.add(builder);
          const projectSkill = new ProjectSkill();
          projectSkill.setID(skillID);
          projectSkill.setType(builder.type);
          this.list.push(projectSkill);
        });
      }

      if (data.process?.development?.skills?.servers) {
        data.process.development.skills.servers.forEach((skillID) => {
          const server = new Server();
          server.setID(skillID);
          this.servers.add(server);
          const projectSkill = new ProjectSkill();
          projectSkill.setID(skillID);
          projectSkill.setType(server.type);
          this.list.push(projectSkill);
        });
      }

      if (data.process?.development?.skills?.cicd_tools) {
        data.process.development.skills.cicd_tools.forEach((skillID) => {
          const cicd = new CICD();
          cicd.setID(skillID);
          this.cicdTools.add(cicd);
          const projectSkill = new ProjectSkill();
          projectSkill.setID(skillID);
          projectSkill.setType(cicd.type);
          this.list.push(projectSkill);
        });
      }

      if (data.process?.development?.skills?.platforms) {
        data.process.development.skills.platforms.forEach((skillID) => {
          const platform = new Platform();
          platform.setID(skillID);
          this.platforms.add(platform);
          const projectSkill = new ProjectSkill();
          projectSkill.setID(skillID);
          projectSkill.setType(platform.type);
          this.list.push(projectSkill);
        });
      }

      if (data.process?.development?.skills?.cloud_providers) {
        data.process.development.skills.cloud_providers.forEach((skillID) => {
          const cloud = new Cloud();
          cloud.setID(skillID);
          this.cloudProviders.add(cloud);
          const projectSkill = new ProjectSkill();
          projectSkill.setID(skillID);
          projectSkill.setType(cloud.type);
          this.list.push(projectSkill);
        });
      }
    }
  }

  toProjectSkillsObject(): ProjectSkillsObject {
    return {
      list:
        this.list && this.list.length > 0
          ? this.list
              .filter((projectSkill) => projectSkill instanceof ProjectSkill)
              .map((projectSkill) => projectSkill.toProjectSkillObject())
          : null,
    };
  }

  toProjectSkillsDataObject(): ProjectSkillsDataObject {
    return {
      types:
        this.types && this.types.size > 0
          ? Array.from(this.types)
              .map((type) => type.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
      software_applications:
        this.softwareApplications && this.softwareApplications.size > 0
          ? Array.from(this.softwareApplications)
              .map((software) => software.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
      databases:
        this.databases && this.databases.size > 0
          ? Array.from(this.databases)
              .map((database) => database.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
      languages:
        this.languages && this.languages.size > 0
          ? Array.from(this.languages)
              .map((language) => language.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
      frameworks:
        this.frameworks && this.frameworks.size > 0
          ? Array.from(this.frameworks)
              .map((framework) => framework.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
      technologies:
        this.technologies && this.technologies.size > 0
          ? Array.from(this.technologies)
              .map((technology) => technology.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
      build_tools:
        this.buildTools && this.buildTools.size > 0
          ? Array.from(this.buildTools)
              .map((builder) => builder.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
      servers:
        this.servers && this.servers.size > 0
          ? Array.from(this.servers)
              .map((server) => server.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
      cicd_tools:
        this.cicdTools && this.cicdTools.size > 0
          ? Array.from(this.cicdTools)
              .map((cicd) => cicd.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
      platforms:
        this.platforms && this.platforms.size > 0
          ? Array.from(this.platforms)
              .map((platform) => platform.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
      cloud_providers:
        this.cloudProviders && this.cloudProviders.size > 0
          ? Array.from(this.cloudProviders)
              .map((provider) => provider.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
    };
  }
}

export const isProjectSkillsObject = (val: any): val is ProjectSkillsObject => {
  return val && typeof val === 'object' && Array.isArray(val.list);
};
