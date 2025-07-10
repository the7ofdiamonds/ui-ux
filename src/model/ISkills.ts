import { ProjectType, Language, Framework, Technology, Service } from './Skill';

export interface ISKills<S, T> {
  list: Array<S>;
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

export const getSkillsFrom = <
  T extends { path?: string | null; type?: string | null },
  U extends { path: string }
>(
  data: Array<T>,
  SkillClass: new (data: T) => U
): Set<U> => {
  const instance = new SkillClass({} as T);
  const matchPath = instance.path;

  const set = new Set<U>();

  data.forEach((item) => {
    if (item.path === matchPath || item.type === matchPath) {
      set.add(new SkillClass(item));
    }
  });

  return set;
};
