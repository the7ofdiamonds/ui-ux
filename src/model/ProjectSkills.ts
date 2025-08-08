import { ProjectSkill, ProjectSkillObject } from '@/model/ProjectSkill';
import { Service } from './Service';
import {
  Framework,
  Language,
  ProjectType,
  Skill,
  Technology,
} from '@/model/Skill';
import { ISKills } from '@/model/Skills';
import { getSkillsFrom } from '@/model/ISkills';

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
  list: Array<string> | null;
};

export class ProjectSkills implements ISKills<ProjectSkillObject> {
  list: Array<ProjectSkill> = [];
  types: Set<ProjectType> = new Set();
  languages: Set<Language> = new Set();
  frameworks: Set<Framework> = new Set();
  technologies: Set<Technology> = new Set();
  services: Set<Service> = new Set();
  count: number = 0;

  constructor(data?: ProjectSkillsObject) {
    if (data && data.list && data.list.length > 0) {
      this.list = data.list.map(
        (projectSkill) => new ProjectSkill(projectSkill)
      );
      this.count = this.list.length;

      this.types = this.getProjectTypes(data.list);
      this.languages = this.getLanguages(data.list);
      this.frameworks = this.getFrameworks(data.list);
      this.technologies = this.getTechnologies(data.list);
      this.services = this.getServices(data.list);
    }
  }

  setProjectTypes(types: Set<ProjectType>) {
    this.types = types;
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

  setServices(services: Set<Service>) {
    this.services = services;
  }

  getProjectTypes(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<ProjectSkillObject, ProjectType>(data, ProjectType);
  }

  getLanguages(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<ProjectSkillObject, Language>(data, Language);
  }

  getFrameworks(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<ProjectSkillObject, Framework>(data, Framework);
  }

  getTechnologies(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<ProjectSkillObject, Technology>(data, Technology);
  }

  getServices(data: Array<ProjectSkillObject>) {
    return getSkillsFrom<ProjectSkillObject, Service>(data, Service);
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
        skill.setType('technology');
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

  fromDocumentData(data?: ProjectSkillsDataObject) {
    if (data?.list && data.list.length > 0) {
      data.list.forEach((projectSkillObject) => {
        const projectSkill = new ProjectSkill();
        projectSkill.setID(projectSkillObject);
        this.list.push(projectSkill);
      });
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
      list:
        this.list && this.list.length > 0
          ? this.list
              .map((projectSkill) => projectSkill.id)
              .filter((id): id is string => typeof id === 'string')
          : null,
    };
  }
}

export const isProjectSkillsObject = (val: any): val is ProjectSkillsObject => {
  return val && typeof val === 'object' && Array.isArray(val.list);
};
