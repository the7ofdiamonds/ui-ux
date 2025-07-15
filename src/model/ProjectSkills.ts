import { ProjectSkill, ProjectSkillObject } from '@/model/ProjectSkill';
import {
  Framework,
  Language,
  ProjectType,
  Service,
  Skill,
  Technology,
} from '@/model/Skill';
import { ISKills, getSkillsFrom } from '@/model/ISkills';

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

export class ProjectSkills
  implements ISKills<ProjectSkill, ProjectSkillObject>
{
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

  fromGitHubGraphQL(languages: Array<LanguageGQL>) {
    if (Array.isArray(languages) && languages.length > 0) {
      languages.forEach((language) => {
        const name = language.node.name;
        const usage = language.size;

        if (name === 'Dockerfile') {
          const dockerFile = new ProjectSkill();
          dockerFile.setID('docker');
          dockerFile.setTitle('Docker');
          dockerFile.setUsage(usage);

          this.list.push(dockerFile);
        }

        if (name === 'SCSS') {
          const scss = new ProjectSkill();
          scss.setID('sass');
          scss.setTitle('Sass');
          scss.setUsage(usage);

          this.list.push(scss);
        }

        if (name === 'hack') {
          const hack = new ProjectSkill();
          hack.setID('hack');
          hack.setTitle('Hack');
          hack.setUsage(usage);

          this.list.push(hack);
        }

        if (name !== 'hack' && name !== 'SCSS' && name !== 'Dockerfile') {
          const lang = new ProjectSkill();
          lang.setID(name.toLowerCase());
          lang.setTitle(name.toUpperCase());
          lang.setUsage(usage);

          this.list.push(lang);
        }
      });
    }
  }

  languagesFromGithub(data: Array<Record<string, any>>) {
    if (Array.isArray(data) && data.length > 0) {
      data.forEach(({ language, usage }) => {
        const projectSkill = new ProjectSkill();
        projectSkill.setUsage(usage);

        if (language === 'Dockerfile') {
          projectSkill.setID('docker');
          projectSkill.setType('technology');
          projectSkill.setTitle('Docker');
        }

        if (language === 'SCSS') {
          projectSkill.setID('sass');
          projectSkill.setType('technology');
          projectSkill.setTitle('Sass');
        }

        if (language === 'hack') {
          projectSkill.setID('hack');
          projectSkill.setType('language');
          projectSkill.setTitle('Hack');
        }

        if (
          language !== 'hack' &&
          language !== 'SCSS' &&
          language !== 'Dockerfile'
        ) {
          projectSkill.setID(language.toLowerCase());
          projectSkill.setTitle(language.toUpperCase());
        }

        this.list.push(projectSkill);
      });
    }
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
          ? this.list.map((projectSkill) => projectSkill.toProjectSkillObject())
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
