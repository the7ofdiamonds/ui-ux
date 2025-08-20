import { Service } from './Service';
import { SkillObject, Skill } from '@/model/Skill';
import { Framework, Language, ProjectType, Technology } from './Skill';
import { ProjectSkill } from './ProjectSkill';
import { ProjectSkills } from './ProjectSkills';
import { getSkillsFrom, getSkillsOfType } from './ISkills';
import { Taxonomy } from './Taxonomy';

export interface ISKills<T> {
  list: Array<ProjectSkill | Skill>;
  types: Set<ProjectType>;
  languages: Set<Language>;
  frameworks: Set<Framework>;
  technologies: Set<Technology>;
  services: Set<Service>;
  count: number;
  getProjectTypes: (data: Array<T>) => Set<ProjectType>;
  getLanguages: (data: Array<T>) => Set<Language>;
  getFrameworks: (data: Array<T>) => Set<Framework>;
  getTechnologies: (data: Array<T>) => Set<Technology>;
  getServices: (data: Array<T>) => Set<Service>;
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
  languages: Set<Language> = new Set();
  frameworks: Set<Framework> = new Set();
  technologies: Set<Technology> = new Set();
  services: Set<Service> = new Set();
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
      this.languages = this.getLanguages(data.list);
      this.frameworks = this.getFrameworks(data.list);
      this.technologies = this.getTechnologies(data.list);
      this.services = this.getServices(data.list);
    }

    this.types = this.getProjectTypesFromList();
    this.languages = this.getLanguagesFromList();
    this.frameworks = this.getFrameworksFromList();
    this.technologies = this.getTechnologiesFromList();
    this.services = this.getServicesFromList();
  }

  getProjectTypes(data: Array<SkillObject>) {
    return getSkillsFrom<ProjectType>(data, ProjectType);
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

  getServices(data: Array<SkillObject>) {
    return getSkillsFrom<Service>(data, Service);
  }

  getProjectTypesFromList() {
    return getSkillsOfType<ProjectType, SkillObject>(this.list, ProjectType);
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

  getServicesFromList() {
    return getSkillsOfType<Service, SkillObject>(this.list, Service);
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

      const services = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'service'
      );

      if (services.length > 0) {
        services.forEach((service) => {
          Array.from(this.services).forEach((skill) => {
            if (skill.id === service.id) {
              skills.services.add(skill);
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

export const handleSkillClick = (skill: Taxonomy) => {
  handleSkills();
  console.log(skill)
  window.location.href = `/taxonomy${skill.path}`;
};
