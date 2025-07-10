import { SkillObject, Skill } from '@/model/Skill';

export type SkillsObject = {
  list: Array<SkillObject> | null;
};

import { Framework, Language, ProjectType, Service, Technology } from './Skill';
import { ProjectSkills } from './ProjectSkills';

export class Skills {
  list: Array<Skill>;
  types: Set<ProjectType> = new Set();
  languages: Set<Language> = new Set();
  frameworks: Set<Framework> = new Set();
  technologies: Set<Technology> = new Set();
  services: Set<Service> = new Set();
  count: number;

  constructor(data?: SkillsObject) {
    this.list = data?.list
      ? data.list.map((skill) => {
          return new Skill(skill);
        })
      : [];

    if (data && data.list && data.list.length > 0) {
      this.types = this.getProjectTypes(data.list);
      this.languages = this.getLanguages(data.list);
      this.frameworks = this.getFrameworks(data.list);
      this.technologies = this.getTechnologies(data.list);
      this.services = this.getServices(data.list);
    }

    this.count = this.list.length;
  }

  getProjectTypes(data: Array<SkillObject>) {
    const projectType = new ProjectType();

    let types: Set<ProjectType> = new Set();

    data.forEach((skillObject) => {
      if (skillObject.path === projectType.path) {
        types.add(new ProjectType(skillObject));
      }
    });

    return types;
  }

  getLanguages(data: Array<SkillObject>) {
    const language = new Language();

    let languages: Set<Language> = new Set();

    data.forEach((skillObject) => {
      if (skillObject.path === language.path) {
        languages.add(new Language(skillObject));
      }
    });

    return languages;
  }

  getFrameworks(data: Array<SkillObject>) {
    const framework = new Framework();

    let frameworks: Set<Framework> = new Set();

    data.forEach((skillObject) => {
      if (skillObject.path === framework.path) {
        frameworks.add(new Framework(skillObject));
      }
    });

    return frameworks;
  }

  getTechnologies(data: Array<SkillObject>) {
    const technology = new Technology();

    let technologies: Set<Technology> = new Set();

    data.forEach((skillObject) => {
      if (skillObject.path === technology.path) {
        technologies.add(new Technology(skillObject));
      }
    });

    return technologies;
  }

  getServices(data: Array<SkillObject>) {
    const service = new Service();

    let services: Set<Service> = new Set();

    data.forEach((skillObject) => {
      if (skillObject.path === service.path) {
        services.add(new Service(skillObject));
      }
    });

    return services;
  }

  existsInSet(skills: Set<Skill>, skill: Skill) {
    const map = new Map(Array.from(skills).map((skill) => [skill.id, skill]));

    return map.has(skill.id);
  }

  filter(term: string): Skill {
    return this.list.find((skill) => skill.id === term) ?? new Skill();
  }

  fromProjectSkills(projectSkills: ProjectSkills) {
    if (projectSkills.list && projectSkills.list.length > 0) {
      const projectTypes = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'project_type'
      );

      if (projectTypes.length > 0) {
        this.types = this.types.intersection(new Set(projectTypes));
      }

      const languages = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'language'
      );

      if (languages.length > 0) {
        this.languages = this.languages.intersection(new Set(languages));
      }

      const frameworks = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'framework'
      );

      if (frameworks.length > 0) {
        this.frameworks = this.frameworks.intersection(new Set(frameworks));
      }

      const technologies = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'technology'
      );

      if (technologies.length > 0) {
        this.technologies = this.technologies.intersection(new Set(technologies));
      }

      const services = projectSkills.list.filter(
        (projectSkill) => projectSkill.type === 'services'
      );

      if (services.length > 0) {
        this.services = this.services.intersection(new Set(services));
      }
    }
  }

  toSkillsObject(): SkillsObject {
    return {
      list:
        this.list && this.list.length > 0
          ? this.list.map((skill) => skill.toSkillObject())
          : null,
    };
  }
}
