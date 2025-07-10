import { ProjectSkill, ProjectSkillObject } from '@/model/ProjectSkill';

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

export class ProjectSkills {
  list: Array<ProjectSkill>;
  count: number;

  constructor(data?: ProjectSkillsObject | Partial<ProjectSkillsObject>) {
    this.list = data?.list
      ? data.list.map((projectSkill) => new ProjectSkill(projectSkill))
      : [];
    this.count = this.list ? this.list.length : 0;
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
