import { SkillObject, Skill } from '@/model/Skill';
import { Framework, Language, ProjectType, Service, Technology } from './Skill';
import { ProjectSkills } from './ProjectSkills';
import { ISKills, getSkillsFrom } from './ISkills';

export type SkillsObject = {
  list: Array<SkillObject> | null;
};

export class Skills implements ISKills<Skill, SkillObject> {
  list: Array<Skill> = [];
  types: Set<ProjectType> = new Set();
  languages: Set<Language> = new Set();
  frameworks: Set<Framework> = new Set();
  technologies: Set<Technology> = new Set();
  services: Set<Service> = new Set();
  count: number = 0;

  constructor(data?: SkillsObject) {
    if (data && data.list && data.list.length > 0) {
      this.list = data.list.map((skill) => {
        return new Skill(skill);
      });
      this.count = this.list.length;

      this.types = this.getProjectTypes(data.list);
      this.languages = this.getLanguages(data.list);
      this.frameworks = this.getFrameworks(data.list);
      this.technologies = this.getTechnologies(data.list);
      this.services = this.getServices(data.list);
    }
  }

  getProjectTypes(data: Array<SkillObject>) {
    return getSkillsFrom<SkillObject, ProjectType>(data, ProjectType);
  }

  getLanguages(data: Array<SkillObject>) {
    return getSkillsFrom<SkillObject, Language>(data, Language);
  }

  getFrameworks(data: Array<SkillObject>) {
    return getSkillsFrom<SkillObject, Framework>(data, Framework);
  }

  getTechnologies(data: Array<SkillObject>) {
    return getSkillsFrom<SkillObject, Technology>(data, Technology);
  }

  getServices(data: Array<SkillObject>) {
    return getSkillsFrom<SkillObject, Service>(data, Service);
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
        this.technologies = this.technologies.intersection(
          new Set(technologies)
        );
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
